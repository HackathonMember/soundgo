// App.js

import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Button,
  Text, // ここにTextを追加
  Alert,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  Animated,
} from "react-native";
import { Audio } from "expo-av";
import * as FileSystem from "expo-file-system";
import FFT from "fft.js";
import base64js from "base64-js"; // base64-jsをインポート
import { FontAwesome } from "@expo/vector-icons";

const RecorderWithAnimation = () => {
  // 録音状態の管理
  const [recording, setRecording] = useState(null);
  const [recordedURI, setRecordedURI] = useState("");
  const [isRecording, setIsRecording] = useState(false);

  // 再生状態の管理
  const [sound, setSound] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);

  // 周波数データの管理
  const [frequencies, setFrequencies] = useState(null);

  // アニメーション用の参照
  const scaleAnim = useRef(new Animated.Value(1)).current;

  // 録音ボタンのアニメーション設定
  useEffect(() => {
    if (isRecording) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(scaleAnim, {
            toValue: 1.2,
            duration: 500,
            useNativeDriver: true,
          }),
          Animated.timing(scaleAnim, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true,
          }),
        ])
      ).start();
    } else {
      scaleAnim.setValue(1);
    }
  }, [isRecording]);

  // マイクの権限をリクエスト
  useEffect(() => {
    (async () => {
      const { status } = await Audio.requestPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("マイクの使用許可が必要です。");
      }
    })();

    // コンポーネントのアンマウント時にサウンドを解放
    return () => {
      if (sound) {
        sound.unloadAsync();
      }
    };
  }, [sound]);

  // 録音開始
  const startRecording = async () => {
    try {
      console.log("録音を開始します");
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });

      // カスタム録音オプションの定義（数値を直接指定）
      const recordingOptions = {
        android: {
          extension: ".m4a",
          outputFormat: 4, // MPEG_4
          audioEncoder: 3, // AAC
          sampleRate: 44100,
          numberOfChannels: 2,
          bitRate: 128000,
        },
        ios: {
          extension: ".m4a",
          audioQuality: 3, // High
          sampleRate: 44100,
          numberOfChannels: 2,
          bitRate: 128000,
          linearPCMBitDepth: 16,
          linearPCMIsBigEndian: false,
          linearPCMIsFloat: false,
        },
        web: {
          mimeType: "audio/mp4",
          bitsPerSecond: 128000,
        },
      };

      const { recording: newRecording } = await Audio.Recording.createAsync(
        recordingOptions
      );
      setRecording(newRecording);
      setIsRecording(true);
      setFrequencies(null); // 新しい録音開始時に周波数データをリセット
      console.log("録音中...");
    } catch (err) {
      console.error("録音エラー:", err);
      Alert.alert("録音エラー", err.message);
    }
  };

  // 録音停止
  const stopRecording = async () => {
    if (!recording) {
      Alert.alert("エラー", "録音が開始されていません。");
      return;
    }

    console.log("録音を停止します");
    setRecording(null);
    setIsRecording(false);
    try {
      await recording.stopAndUnloadAsync();
      const uri = recording.getURI();
      console.log("録音ファイルのURI:", uri);
      if (uri) {
        setRecordedURI(uri);
        Alert.alert(
          "録音完了",
          "録音が完了しました。保存ボタンを押してください。"
        );

        // 周波数解析の実行
        const freqData = await getAudioFrequency(uri);
        if (freqData) {
          setFrequencies(freqData);
          console.log("周波数データ:", freqData);
          // ここで周波数データをUIに表示するなどの処理を追加できます
        } else {
          Alert.alert("解析エラー", "周波数解析に失敗しました。");
        }
      } else {
        Alert.alert("エラー", "録音ファイルのURIが取得できませんでした。");
      }
    } catch (error) {
      console.error("停止エラー:", error);
      Alert.alert("停止エラー", error.message);
    }
  };

  // 録音ファイルを保存
  const saveRecording = async () => {
    if (recordedURI) {
      const fileName = recordedURI.split("/").pop();
      if (!fileName) {
        Alert.alert("エラー", "ファイル名の取得に失敗しました。");
        return;
      }
      const newPath = FileSystem.documentDirectory + fileName;
      try {
        await FileSystem.moveAsync({
          from: recordedURI,
          to: newPath,
        });
        Alert.alert("保存完了", "録音を保存しました: " + newPath);
        setRecordedURI(newPath);
      } catch (error) {
        console.error("保存エラー:", error);
        Alert.alert("保存エラー", error.message);
      }
    } else {
      Alert.alert("エラー", "録音ファイルが存在しません。");
    }
  };

  // 再生ステータスの更新
  const onPlaybackStatusUpdate = (status) => {
    // AVPlaybackStatusErrorの場合
    if ("error" in status) {
      console.error(`Playback Error: ${status.error}`);
      Alert.alert("再生エラー", `Playback Error: ${status.error}`);
      return;
    }

    // AVPlaybackStatusSuccessの場合
    const successStatus = status;
    if (successStatus.didJustFinish && !successStatus.isLooping) {
      setIsPlaying(false);
      if (sound) {
        sound.unloadAsync();
        setSound(null);
      }
    }
  };

  // 録音ファイルを再生
  const playSound = async () => {
    if (recordedURI) {
      try {
        console.log("再生を開始します");
        const { sound: playbackSound } = await Audio.Sound.createAsync(
          { uri: recordedURI },
          { shouldPlay: true },
          onPlaybackStatusUpdate
        );
        setSound(playbackSound);
        setIsPlaying(true);
      } catch (error) {
        console.error("再生エラー:", error);
        Alert.alert("再生エラー", error.message);
      }
    } else {
      Alert.alert("エラー", "再生する録音ファイルが存在しません。");
    }
  };

  // 再生停止
  const stopSound = async () => {
    if (sound) {
      try {
        await sound.stopAsync();
        await sound.unloadAsync();
        setSound(null);
        setIsPlaying(false);
      } catch (error) {
        console.error("停止エラー:", error);
        Alert.alert("停止エラー", error.message);
      }
    }
  };

  // 周波数解析用の関数
  const extractPCMData = (binaryData) => {
    const pcmStart = 44; // WAVヘッダーのサイズ
    const pcm = [];
    for (let i = pcmStart; i < binaryData.length; i += 2) {
      // Little Endianで16ビットPCMデータを読み取る
      const sample = binaryData[i] | (binaryData[i + 1] << 8);
      // 符号付き整数に変換
      const signedSample = sample > 32767 ? sample - 65536 : sample;
      pcm.push(signedSample);
    }
    return pcm;
  };

  const getAudioFrequency = async (filePath) => {
    try {
      // 音声ファイルをBase64として読み取る
      const fileData = await FileSystem.readAsStringAsync(filePath, {
        encoding: FileSystem.EncodingType.Base64,
      });

      // Base64文字列をUint8Arrayにデコード
      const binaryData = base64js.toByteArray(fileData); // Uint8Array

      // PCMデータの抽出
      const pcmData = extractPCMData(binaryData);

      // FFTの準備
      const fftSize = 1024; // FFTのサイズ（2のべき乗）
      const fft = new FFT(fftSize);
      const input = fft.createComplexArray();
      const output = fft.createComplexArray();

      // PCMデータをFFTサイズに調整
      const trimmedPCM = pcmData.slice(0, fftSize);
      for (let i = 0; i < fftSize; i++) {
        input[2 * i] = trimmedPCM[i];
        input[2 * i + 1] = 0;
      }

      // FFT実行
      fft.transform(output, input);

      // 周波数成分の取得（マグニチュード）
      const frequencies = [];
      for (let i = 0; i < fftSize / 2; i++) {
        const re = output[2 * i];
        const im = output[2 * i + 1];
        const magnitude = Math.sqrt(re * re + im * im);
        frequencies.push(magnitude);
      }

      return frequencies;
    } catch (error) {
      console.error("Error processing audio:", error);
      return null;
    }
  };

  return (
    <View style={styles.container}>
      {/* 録音中に背景GIFを表示 */}
      {isRecording && (
        <ImageBackground
          source={require("../../assets/EGH_1.gif")} // 正しい相対パスを指定
          style={styles.backgroundGif}
          resizeMode="cover"
        >
          {/* 録音ボタンを中央下に配置 */}
          <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
            <TouchableOpacity
              style={[
                styles.recordButton,
                { backgroundColor: isRecording ? "red" : "gray" },
              ]}
              onPress={isRecording ? stopRecording : startRecording}
            >
              <FontAwesome
                name={isRecording ? "stop" : "microphone"}
                size={30}
                color="#fff"
              />
            </TouchableOpacity>
          </Animated.View>
        </ImageBackground>
      )}

      {/* 録音前のボタン */}
      {!isRecording && (
        <TouchableOpacity
          style={[
            styles.recordButton,
            { backgroundColor: isRecording ? "red" : "gray" },
          ]}
          onPress={isRecording ? stopRecording : startRecording}
        >
          <FontAwesome
            name={isRecording ? "stop" : "microphone"}
            size={30}
            color="#fff"
          />
        </TouchableOpacity>
      )}

      {/* 録音後の再生・保存ボタン */}
      {recordedURI && !isRecording && (
        <View style={styles.actionButtons}>
          <TouchableOpacity style={styles.actionButton} onPress={saveRecording}>
            <FontAwesome name="save" size={20} color="#fff" />
            <Text style={styles.actionButtonText}>保存</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={isPlaying ? stopSound : playSound}
          >
            <FontAwesome
              name={isPlaying ? "stop" : "play"}
              size={20}
              color="#fff"
            />
            <Text style={styles.actionButtonText}>
              {isPlaying ? "停止" : "再生"}
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default RecorderWithAnimation;

// スタイル定義
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  backgroundGif: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  recordButton: {
    width: 95,
    height: 95,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 55,
    elevation: 5, // Androidのシャドウ
    shadowColor: "#000", // iOSのシャドウ
    shadowOffset: { width: 0, height: 2 }, // iOSのシャドウ
    shadowOpacity: 0.25, // iOSのシャドウ
    shadowRadius: 3.84, // iOSのシャドウ
  },
  actionButtons: {
    flexDirection: "row",
    marginBottom: 30,
  },
  actionButton: {
    backgroundColor: "#1e90ff",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    marginHorizontal: 10,
    flexDirection: "row",
    alignItems: "center",
    elevation: 3, // Androidのシャドウ
    shadowColor: "#000", // iOSのシャドウ
    shadowOffset: { width: 0, height: 2 }, // iOSのシャドウ
    shadowOpacity: 0.25, // iOSのシャドウ
    shadowRadius: 3.84, // iOSのシャドウ
  },
  actionButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 5,
  },
});

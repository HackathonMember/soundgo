import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Alert as RNAlert,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Text,
  ActivityIndicator,
} from "react-native";

const RegistrationScreen = ({ navigation, route }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    setError("");
    setIsLoading(true);

    // ホーム画面遷移確認のために一時的に追加
    navigation.navigate("Home");

    // 基本的なバリデーション
    if (!name || !email || !password || !confirmPassword) {
      setError("すべての項目を入力してください。");
      setIsLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      setError("パスワードが一致しません。");
      setIsLoading(false);
      return;
    }

    // パスワードの強度チェック（例：8文字以上）
    if (password.length < 8) {
      setError("パスワードは8文字以上である必要があります。");
      setIsLoading(false);
      return;
    }

    // 実際の登録処理をここに実装します
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000)); // 登録処理のシミュレーション
      setIsLoading(false);
      // 登録成功後の処理（例：ログインページへのナビゲーション）
      RNAlert.alert("登録成功", "アカウントが正常に作成されました。", [
        { text: "OK", onPress: () => console.log("OK Pressed") },
      ]);
    } catch (err) {
      setError("登録に失敗しました。再度お試しください。");
      setIsLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>アカウント登録</Text>
        <Text style={styles.description}>
          新しいアカウントを作成してください。
        </Text>
        <View style={styles.form}>
          <TextInput
            style={styles.input}
            placeholder="山田 太郎"
            value={name}
            onChangeText={(text) => setName(text)}
            placeholderTextColor="#666"
          />
          <TextInput
            style={styles.input}
            placeholder="you@example.com"
            value={email}
            onChangeText={(text) => setEmail(text)}
            keyboardType="email-address"
            autoCapitalize="none"
            placeholderTextColor="#666"
          />
          <TextInput
            style={styles.input}
            placeholder="パスワード"
            value={password}
            onChangeText={(text) => setPassword(text)}
            secureTextEntry
            placeholderTextColor="#666"
          />
          <TextInput
            style={styles.input}
            placeholder="パスワード（確認）"
            value={confirmPassword}
            onChangeText={(text) => setConfirmPassword(text)}
            secureTextEntry
            placeholderTextColor="#666"
          />
          {error ? (
            <View style={styles.errorContainer}>
              <Text style={styles.errorText}>⚠️ {error}</Text>
            </View>
          ) : null}
          <TouchableOpacity
            style={[
              styles.button,
              isLoading ? styles.buttonDisabled : styles.buttonEnabled,
            ]}
            onPress={handleSubmit}
            disabled={isLoading}
          >
            {isLoading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.buttonText}>登録</Text>
            )}
          </TouchableOpacity>
        </View>
        <View style={styles.footer}>
          <Text style={styles.footerText}>
            すでにアカウントをお持ちですか？{" "}
            <TouchableOpacity onPress={() => console.log("ログイン画面へ移動")}>
              <Text style={styles.loginLink}>ログイン</Text>
            </TouchableOpacity>
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

export default RegistrationScreen;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "center",
    padding: 16,
    backgroundColor: "#f2f2f2",
  },
  card: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 8,
    elevation: 3, // Androidのシャドウ
    shadowColor: "#000", // iOSのシャドウ
    shadowOffset: { width: 0, height: 2 }, // iOSのシャドウ
    shadowOpacity: 0.25, // iOSのシャドウ
    shadowRadius: 3.84, // iOSのシャドウ
  },
  title: {
    fontSize: 24,
    marginBottom: 8,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
  },
  description: {
    marginBottom: 16,
    color: "gray",
    textAlign: "center",
  },
  form: {
    width: "100%",
  },
  input: {
    height: 50,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 6,
    paddingHorizontal: 12,
    marginBottom: 12,
    fontSize: 16,
    color: "#000",
  },
  errorContainer: {
    marginBottom: 8,
    backgroundColor: "#fdecea",
    padding: 10,
    borderRadius: 4,
  },
  errorText: {
    color: "#b71c1c",
  },
  button: {
    height: 50,
    borderRadius: 6,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 8,
  },
  buttonEnabled: {
    backgroundColor: "#1e88e5",
  },
  buttonDisabled: {
    backgroundColor: "#a0a0a0",
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
  footer: {
    justifyContent: "center",
    marginTop: 16,
  },
  footerText: {
    textAlign: "center",
    color: "gray",
    fontSize: 14,
  },
  loginLink: {
    color: "#1e88e5",
    textDecorationLine: "underline",
  },
});

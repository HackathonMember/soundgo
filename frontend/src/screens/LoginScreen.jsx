import React, { useState } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Text,
  ActivityIndicator,
  Alert as RNAlert,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    setError("");
    setIsLoading(true);

    // 注意書き画面遷移確認のために一時的に追加
    navigation.navigate("Caution");

    // 基本的なバリデーション
    if (!email || !password) {
      setError("メールアドレスとパスワードを入力してください。");
      setIsLoading(false);
      return;
    }

    // 実際のログイン処理をここに実装します
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000)); // ログイン処理のシミュレーション
      setIsLoading(false);
      RNAlert.alert("ログイン成功", "正常にログインしました。", [
        { text: "OK", onPress: () => console.log("OK Pressed") },
      ]);
    } catch (err) {
      setError("ログインに失敗しました。再度お試しください。");
      setIsLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* 戻るボタン */}
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.navigate("LoginOrRegister")}
      >
        <FontAwesome name="arrow-left" size={24} color="#333" />
      </TouchableOpacity>
      <View style={styles.card}>
        <Text style={styles.title}>ログイン</Text>
        <Text style={styles.description}>
          アカウントにログインしてください。
        </Text>
        <View style={styles.form}>
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
            onPress={handleLogin}
            disabled={isLoading}
          >
            {isLoading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.buttonText}>ログイン</Text>
            )}
          </TouchableOpacity>
        </View>
        <View style={styles.footer}>
          <Text style={styles.footerText}>
            アカウントをお持ちでないですか？{" "}
            <TouchableOpacity
              onPress={() => navigation.navigate("Registration")}
            >
              <Text style={styles.registerLink}>新規登録</Text>
            </TouchableOpacity>
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "center",
    padding: 16,
    backgroundColor: "#f2f2f2",
  },
  backButton: {
    position: "absolute",
    top: 40,
    left: 16,
    zIndex: 1,
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
    marginTop: 50, // 戻るボタンと重ならないようにマージンを追加
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
  registerLink: {
    color: "#1e88e5",
    textDecorationLine: "underline",
  },
});

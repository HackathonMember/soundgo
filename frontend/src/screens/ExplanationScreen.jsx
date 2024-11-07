import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

const ExplanationScreen = ({ navigation }) => {
  const handleNext = () => {
    navigation.navigate("Caution");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>説明ページ</Text>
      <Text style={styles.content}>
        ここにアプリの説明を記載します。ユーザーに必要な情報を提供してください。
      </Text>
      <TouchableOpacity style={styles.button} onPress={handleNext}>
        <Text style={styles.buttonText}>次へ</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ExplanationScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fffacd",
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 28,
    marginBottom: 20,
    fontWeight: "bold",
  },
  content: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 40,
  },
  button: {
    width: "60%",
    padding: 15,
    backgroundColor: "#ffa500",
    borderRadius: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
  },
});

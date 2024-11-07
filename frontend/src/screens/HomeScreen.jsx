import React from "react";
import { StyleSheet, View, Text, SafeAreaView } from "react-native";
import ProfileScreen from "./ProfileScreen";

const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <ProfileScreen />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#eee",
  },
  safeArea: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
  },
});

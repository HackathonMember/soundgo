import React from "react";
import { StyleSheet, View, Text, SafeAreaView } from "react-native";

const Activity = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.welcomeText}>number of sounds collected</Text>
      <Text style={styles.welcomeText}>the Day I started</Text>
      <Text style={styles.welcomeText}>the Day!</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#eee",
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#6cdeeb",
  },
});

export default Activity;

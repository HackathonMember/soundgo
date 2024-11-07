import React from "react";
import { StyleSheet, View, Text, SafeAreaView } from "react-native";
import Activity from "../components/Activity";
import Profile from "../components/Profile";

const ProfileScreen = () => {
  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        {/* <Profile /> */}
        <Activity />
      </SafeAreaView>
    </View>
  );
};

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

export default ProfileScreen;

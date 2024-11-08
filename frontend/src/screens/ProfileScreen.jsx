import React from "react";
import {
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import Activity from "../components/Activity";
import Profile from "../components/Profile";
import { useNavigation } from "@react-navigation/native";

const ProfileScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        {/* <Profile /> */}
        <Activity />

        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <FontAwesome name="arrow-left" size={24} color="#333" />
        </TouchableOpacity>
      </SafeAreaView>
    </View>
  );
};

export default ProfileScreen;

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
  backButton: {
    position: "absolute",
    top: 40,
    left: 16,
    padding: 8,
  },
});

import React from "react";
import { StyleSheet, View, TouchableOpacity } from "react-native";
import AudioRecorder from "../components/AudioRecorder";
import { FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const RecordScreen = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <AudioRecorder />
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <FontAwesome name="arrow-left" size={24} color="#333" />
      </TouchableOpacity>
    </View>
  );
};

export default RecordScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backButton: {
    position: "absolute",
    top: 40,
    left: 16,
    padding: 8,
  },
});

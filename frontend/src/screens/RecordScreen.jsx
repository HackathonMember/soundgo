import React from "react";
import { StyleSheet, View } from "react-native";
import AudioRecorder from "../components/AudioRecorder";

const RecordScreen = () => {
  return (
    <View style={styles.container}>
      <AudioRecorder />
    </View>
  );
};

export default RecordScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

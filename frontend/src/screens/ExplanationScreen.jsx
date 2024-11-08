import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import Svg, { Path } from "react-native-svg";

const ExplanationScreen = ({ navigation }) => {
  const explanations = [
    "Nice to meet you.\nI am Nekon.\n\nI want to travel around Japan with you and hear all kinds of sounds.",
    "Together, we'll explore famous spots, hidden gems,\n\n and unique places across the country.",
    "Let's capture each sound \n\n we find along the way \n\n and create wonderful memories!",
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePress = () => {
    if (currentIndex < explanations.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      navigation.navigate("Caution");
    }
  };

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={handlePress}
      activeOpacity={1}
    >
      <View style={styles.speechBubbleContainer}>
        <Svg
          width={width * 0.8}
          height={height * 0.35}
          viewBox="0 0 200 120"
          style={styles.speechBubble}
        >
          <Path
            d="M10 10 h 180 a 10 10 0 0 1 10 10 v 70 a 10 10 0 0 1 -10 10 h -60 l -10 20 l -10 -20 h -100 a 10 10 0 0 1 -10 -10 v -70 a 10 10 0 0 1 10 -10 z"
            fill="#ffffff"
            stroke="#ddd"
            strokeWidth="1"
          />
        </Svg>
        <View style={styles.textContainer}>
          <Text style={styles.speechText}>{explanations[currentIndex]}</Text>
        </View>
      </View>
      <Image
        source={require("../../assets/cat1.png")}
        style={styles.characterImage}
        resizeMode="contain"
      />
    </TouchableOpacity>
  );
};

export default ExplanationScreen;

const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f0f0",
    alignItems: "center",
    justifyContent: "center",
  },
  speechBubbleContainer: {
    position: "absolute",
    top: "20%",
    alignItems: "center",
  },
  speechBubble: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 3,
  },
  textContainer: {
    position: "absolute",
    top: 90,
    left: 10,
    right: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  speechText: {
    fontSize: 16,
    color: "#333",
    textAlign: "center",
  },
  characterImage: {
    width: 400,
    height: 400,
    position: "absolute",
    bottom: "10%",
  },
});

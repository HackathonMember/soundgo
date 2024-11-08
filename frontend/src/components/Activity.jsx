import React, { useState } from "react";
import { StyleSheet, View, Text, SafeAreaView, Image, TouchableOpacity } from "react-native";

const catData = [
  { image: require("../../assets/cat1.png"), name: "Nekon" },
  { image: require("../../assets/cat2.png"), name: "Ace" },
  { image: require("../../assets/cat3.png"), name: "Tama" },
  { image: require("../../assets/cat4.png"), name: "Sora" },
  { image: require("../../assets/cat5.png"), name: "Mint" },
];

const Activity = () => {
  const [currentCatIndex, setCurrentCatIndex] = useState(0);

  const handleNextCat = () => {
    setCurrentCatIndex((prevIndex) => (prevIndex + 1) % catData.length);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* 画像 */}
        <Image source={catData[currentCatIndex].image} style={styles.image} />

        <View style={{ height: 32 }} />

        {/* 矢印ボタン */}
        <TouchableOpacity onPress={handleNextCat}>
          <Text style={styles.buttonText}>Next Cat ➡️</Text>
        </TouchableOpacity>

        <View style={{ height: 32 }} />

        {/* プロファイル */}
        <Text style={styles.profileText}>profile</Text>
        <Text style={styles.profileText}>
          Name                     {catData[currentCatIndex].name}
        </Text>

        <View style={{ height: 32 }} />

        <Text style={styles.activityText}>activity</Text>
        <Text style={styles.activityText}>number of sounds collected          7</Text>
        <Text style={styles.activityText}>the Day I started                         10/02</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  image: {
    width: 200,
    height: 200,
  },
  buttonText: {
    fontSize: 16,
    fontFamily: "Hiragino Mincho ProN",
    color: "#287aa1",
    textDecorationLine: "underline",
  },
  profileText: {
    fontSize: 12,
    fontFamily: "Hiragino Mincho ProN",
    color: "#287aa1",
    margin: 12,
  },
  activityText: {
    fontSize: 12,
    fontFamily: "Hiragino Mincho ProN",
    color: "#287aa1",
    margin: 12,
  },
});

export default Activity;

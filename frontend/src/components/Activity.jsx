import React from "react";
import { StyleSheet, View, Text, SafeAreaView, Image } from "react-native";

const sampleImage = require("../../assets/cat1.png");

const Activity = () => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>

        <Image source={sampleImage} style={styles.image} />

        <View style={{ height: 32 }} />

        <Text style={styles.profileText}>profile</Text>
        <Text style={styles.profileText}>Name                     Nekon</Text>

        <View style={{ height: 32 }} />

        <Text style={styles.activityText}>activity</Text>
        <Text style={styles.activityText}>number of sounds collected          7</Text>
        <Text style={styles.activityText}>the Day I started                         10/02</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  image: {
    width: 200,  // 画像の幅（適宜調整）
    height: 200, // 画像の高さ（適宜調整）
  },
  profileText: {
    fontSize:12,
    fontFamily:"Hiragino Mincho ProN",
    color: "#287aa1",
    margin:12,
  },
  activityText: {
    fontSize:12,
    fontFamily:"Hiragino Mincho ProN",
    color: "#287aa1",
    margin: 12,
  },
});

export default Activity;
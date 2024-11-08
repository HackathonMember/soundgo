import React, { useEffect } from "react";
import { View, StyleSheet, Image } from "react-native";

const CautionScreen = ({ navigation }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.navigate("Map");
    }, 2000);

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/caution.jpg")}
        style={styles.image}
        resizeMode="cover"
      />
    </View>
  );
};

export default CautionScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    width: "100%",
    height: "100%",
  },
});

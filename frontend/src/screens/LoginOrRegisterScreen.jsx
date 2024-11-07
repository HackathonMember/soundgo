import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  Platform,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";

const LoginOrRegisterScreen = ({ navigation }) => {
  return (
    <ImageBackground
      source={require("../../assets/login_background.jpg")}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("Login")}
          accessibilityLabel="LoginButton"
        >
          <FontAwesome
            name="sign-in"
            size={20}
            color="#000"
            style={{ marginRight: 10 }}
          />
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("Registration")}
          accessibilityLabel="NewRegistrationButton"
        >
          <FontAwesome
            name="user-plus"
            size={20}
            color="#000"
            style={{ marginRight: 10 }}
          />
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

export default LoginOrRegisterScreen;

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonContainer: {
    position: "absolute",
    bottom: 150,
    width: "100%",
    alignItems: "center",
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "45%",
    padding: 15,
    backgroundColor: "white",
    borderColor: "black",
    borderWidth: 0.4,
    borderRadius: 50,
    marginVertical: 10,
  },
  buttonText: {
    color: "black",
    fontSize: 14,
    textAlign: "center",
    fontFamily: Platform.OS === "ios" ? "Times New Roman" : "serif",
  },
});

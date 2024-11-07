import React from "react";
import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import {
  createStackNavigator,
  TransitionPresets,
} from "@react-navigation/stack";

import LoginOrRegisterScreen from "./src/screens/LoginOrRegisterScreen";
import LoginScreen from "./src/screens/LoginScreen";
import RegistrationScreen from "./src/screens/RegistrationScreen";
import ExplanationScreen from "./src/screens/ExplanationScreen";
import CautionScreen from "./src/screens/CautionScreen";
import MapScreen from "./src/screens/MapScreen";
import ProfileScreen from "./src/screens/ProfileScreen";
import RecordScreen from "./src/screens/RecordScreen";

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="LoginOrRegister"
        screenOptions={{
          headerShown: false,
        }}
      >
        {/* スタート画面: ログインか新規登録を選択 */}
        <Stack.Screen
          name="LoginOrRegister"
          component={LoginOrRegisterScreen}
        />

        {/* ログイン画面 */}
        <Stack.Screen name="Login" component={LoginScreen} />

        {/* 新規登録画面 */}
        <Stack.Screen name="Registration" component={RegistrationScreen} />

        {/* 説明画面 */}
        <Stack.Screen name="Explanation" component={ExplanationScreen} />

        {/* 注意書き画面 */}
        <Stack.Screen name="Caution" component={CautionScreen} />

        {/* マップ画面 */}
        <Stack.Screen
          name="Map"
          component={MapScreen}
          options={{
            headerShown: false,
            ...TransitionPresets.FadeFromBottomAndroid, // フェードアニメーションを設定
          }}
        />

        {/* プロフィール画面 */}
        <Stack.Screen name="Profile" component={ProfileScreen} />

        {/* 録音画面 */}
        <Stack.Screen name="Record" component={RecordScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { FontAwesome } from "@expo/vector-icons";
import RegistrationScreen from "./src/screens/RegistrationScreen";
import HomeScreen from "./src/screens/HomeScreen";
import MapScreen from "./src/screens/MapScreen";
import RecordScreen from "./src/screens/RecordScreen";

const HomeStack = createStackNavigator();

const HomeStackNavigatorComponent = () => (
  <HomeStack.Navigator>
    <HomeStack.Screen
      name="Registration"
      component={RegistrationScreen}
      options={{ headerShown: false }}
    />
    <HomeStack.Screen
      name="Home"
      component={HomeScreen}
      options={{ headerShown: false }}
    />
  </HomeStack.Navigator>
);

const MapStack = createStackNavigator();

const MapStackNavigatorComponent = () => (
  <MapStack.Navigator>
    <MapStack.Screen
      name="Map"
      component={MapScreen}
      options={{ headerShown: false }}
    />
  </MapStack.Navigator>
);

const RecordStack = createStackNavigator();

const RecordStackNavigatorComponent = () => (
  <RecordStack.Navigator>
    <RecordStack.Screen
      name="Record"
      component={RecordScreen}
      options={{ headerShown: false }}
    />
  </RecordStack.Navigator>
);

const Tab = createBottomTabNavigator();

const screenOption = ({ route }) => ({
  tabBarIcon: ({ color, size }) => {
    let iconName;

    if (route.name === "HomeTab") {
      iconName = "home";
    } else if (route.name === "MapTab") {
      iconName = "map";
    } else if (route.name === "RecordTab") {
      iconName = "microphone";
    }

    return <FontAwesome name={iconName} size={size} color={color} />;
  },
});

// Appコンポーネントの定義

const App = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator screenOptions={screenOption}>
        <Tab.Screen
          name="HomeTab"
          component={HomeStackNavigatorComponent}
          options={{ headerShown: false, title: "ホーム" }}
        />
        <Tab.Screen
          name="MapTab"
          component={MapStackNavigatorComponent}
          options={{ headerShown: false, title: "マップ" }}
        />
        <Tab.Screen
          name="RecordTab"
          component={RecordStackNavigatorComponent}
          options={{ headerShown: false, title: "録音" }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

// スタイルの定義

const styles = StyleSheet.create({
  center: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  text: {
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default App;

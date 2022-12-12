import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Image, StyleSheet } from "react-native";
import VotesScreen from "../screens/VotesScreen";
import WinnerScreen from "../screens/WinnerScreen";

import vote from "../../assets/images/vote.png";
import trophy from "../../assets/images/trophy.png";

const tab = createBottomTabNavigator();

const StackRoutes = () => {
  return (
    <tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: {
          height: 110,
          backgroundColor: "#150100",
          paddingTop:12,
          borderTopLeftRadius: 16,
          borderTopRightRadius: 16,
        },
        tabBarLabelStyle: {
          fontFamily: "Monteserrat",
          fontSize: 24,
          paddingBottom: 12,
        },
        tabBarActiveTintColor: "white",
      })}
    >
      <tab.Screen
        name="Votes"
        component={VotesScreen}
        options={{
          tabBarIcon: () => <Image source={vote} />,
          tabBarIconStyle: {
            width: 50,
            height: 50,
          },
        }}
      />
      <tab.Screen
        name="Winner"
        component={WinnerScreen}
        options={{
          tabBarIcon: () => <Image source={trophy} />,
          tabBarIconStyle: {
            width: 50,
            height: 50,
          },
        }}
      />
    </tab.Navigator>
  );
};

export default StackRoutes;

import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { useFonts } from "expo-font";

import Loading from "./Loading";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { ImageBackground } from "react-native";
const tab = createBottomTabNavigator();

import DrawerNavigation from "./navigation/DrawerNavigation";

const Routes = () => {
  let [fontLoaded] = useFonts({
    Draper: require("../../assets/fonts/Draper.otf"),
    Monteserrat: require("../../assets/fonts/Montserrat-Medium.ttf"),
  });

  return (
    <NavigationContainer>
      {fontLoaded ? <DrawerNavigation /> : <Loading />}
    </NavigationContainer>
  );
};

export default Routes;

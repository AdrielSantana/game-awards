import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { useFonts } from "expo-font";

import StackRoutes from "./StackRoutes";
import Loading from "./Loading";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { ImageBackground } from "react-native";
const tab = createBottomTabNavigator();

import background from "../../assets/images/bg.png";

const Routes = () => {
  let [fontLoaded] = useFonts({
    Draper: require("../../assets/fonts/Draper.otf"),
    Monteserrat: require("../../assets/fonts/Montserrat-Medium.ttf"),
  });

  return (
    <NavigationContainer>
      <ImageBackground resizeMode="cover" style={{ flex: 1 }} source={background}>
        {fontLoaded ? <StackRoutes /> : <Loading />}
      </ImageBackground>
    </NavigationContainer>
  );
};

export default Routes;

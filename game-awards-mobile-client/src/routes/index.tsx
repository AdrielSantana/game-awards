import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { useFonts } from "expo-font";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Loading from "./Loading";
import DrawerNavigation from "./navigation/DrawerNavigation";
import GameScreen from "../screens/GameScreen";

const Stack = createNativeStackNavigator();

const Routes = () => {
  let [fontLoaded] = useFonts({
    Draper: require("../../assets/fonts/Draper.otf"),
    Monteserrat: require("../../assets/fonts/Montserrat-Medium.ttf"),
  });

  useEffect(() => {}, []);

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{ headerShown: false }}
        initialRouteName="DrawerNavigation"
      >
        <Stack.Screen
          name="DrawerNavigation"
          component={fontLoaded ? DrawerNavigation : Loading}
        />
        <Stack.Screen
          name="GameScreen"
          component={GameScreen}
          initialParams={{ game: {} }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Routes;

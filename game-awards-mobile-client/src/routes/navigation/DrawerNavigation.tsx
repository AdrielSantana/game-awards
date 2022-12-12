import React from "react";
import { View, ScrollView } from "react-native";
import { createDrawerNavigator } from "@react-navigation/drawer";

import StackRoutes from "./StackRoutes";

const Drawer = createDrawerNavigator();

const DrawerNavigation = () => {
  return (
    <Drawer.Navigator screenOptions={{headerShown: false}} >
      <Drawer.Screen name="HomeDrawer" component={StackRoutes} />
    </Drawer.Navigator>
  );
};

export default DrawerNavigation;

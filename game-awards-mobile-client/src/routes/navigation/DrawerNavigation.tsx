import React, { useState, useEffect } from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";

import StackRoutes from "./StackRoutes";
import { Category } from "../../interfaces/CategoryInterface";
import { clientGetCategories } from "../../api/api";
import Loading from "../Loading";

const Drawer = createDrawerNavigator();

type Props = {
  navigation: any;
};

const DrawerNavigation = ({ navigation }: Props) => {
  const [categories, setCategories] = useState<[Category] | []>();

  useEffect(() => {
    (async () => {
      const response = await clientGetCategories();

      setCategories(response);
    })();
  }, []);

  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: false,
        drawerActiveBackgroundColor: "#FFB700",
        drawerActiveTintColor: "#150100",
        drawerStyle: { backgroundColor: "#150100" },
        drawerInactiveTintColor: "white",
        drawerItemStyle: { width: "100%", borderRadius: 16 },
        drawerPosition: "right",
        drawerType: "slide",
        drawerLabelStyle: {
          fontSize: 16,
          fontFamily: "Monteserrat",
          paddingHorizontal: 16,
        },
      }}
    >
      {categories ? (
        categories.map((category) => {
          return (
            <Drawer.Screen
              key={category.id}
              name={category.name}
              children={() => (
                <StackRoutes navigation={navigation} category={category} />
              )}
            />
          );
        })
      ) : (
        <Drawer.Screen name="Select Category" component={Loading} />
      )}
    </Drawer.Navigator>
  );
};

export default DrawerNavigation;

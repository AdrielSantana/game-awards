import React from "react";
import { ImageBackground } from "react-native";

import background from "../../../assets/images/bg.png";
import { Category } from "../../interfaces/CategoryInterface";
import TabNavigation from "./TabNavigation";

const StackRoutes = (props: { category: Category; navigation: any }) => {
  return (
    <ImageBackground resizeMode="cover" style={{ flex: 1 }} source={background}>
      <TabNavigation navigation={props.navigation} category={props.category} />
    </ImageBackground>
  );
};

export default StackRoutes;

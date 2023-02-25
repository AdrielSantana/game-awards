import React from "react";
import { ImageBackground } from "react-native";

import background from "../../../assets/images/bg.png";
import { Category } from "../../interfaces/CategoryInterface";
import TabNavigation from "./TabNavigation";

type Props = {
  category: Category;
};

const StackRoutes = ({ category }: Props) => {
  return (
    <ImageBackground resizeMode="cover" style={{ flex: 1 }} source={background}>
      <TabNavigation category={category} />
    </ImageBackground>
  );
};

export default StackRoutes;

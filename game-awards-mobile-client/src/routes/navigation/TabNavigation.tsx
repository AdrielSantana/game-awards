import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { FontAwesome5 } from "@expo/vector-icons";
import VotesScreen from "../../screens/VotesScreen";
import WinnerScreen from "../../screens/WinnerScreen";
import vote from "../../../assets/images/vote.png";
import trophy from "../../../assets/images/trophy.png";
import tga from "../../../assets/images/tga.png";
import { Image, TouchableOpacity } from "react-native";
import { Category } from "../../interfaces/CategoryInterface";

const tab = createBottomTabNavigator();

const TabNavigation = (props: { category: Category; navigation: any }) => {
  return (
    <tab.Navigator
      screenOptions={({ navigation }) => ({
        headerShown: true,
        headerRight: () => (
          <TouchableOpacity
            onPress={() => {
              navigation.openDrawer();
            }}
            style={{ paddingRight: 16 }}
          >
            <FontAwesome5 name="bars" size={40} color="white" />
          </TouchableOpacity>
        ),
        headerStyle: {
          backgroundColor: "#150100",
          height: 110,
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 4,
          },
          shadowOpacity: 0.6,
          shadowRadius: 4.65,
          elevation: 8,
        },
        headerBackgroundContainerStyle: { backgroundColor: "#000" },
        headerTitle: () => (
          <Image resizeMode="contain" source={tga} style={{ width: 260 }} />
        ),
        headerTitleAlign: "left",
        tabBarStyle: {
          height: 110,
          backgroundColor: "#150100",
          paddingTop: 12,
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
        children={() => (
          <VotesScreen
            navigation={props.navigation}
            category={props.category}
          />
        )}
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
        children={() => <WinnerScreen navigation={props.navigation} category={props.category} />}
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

export default TabNavigation;

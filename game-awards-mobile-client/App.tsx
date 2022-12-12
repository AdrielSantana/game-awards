import 'react-native-gesture-handler';
import Routes from "./src/routes";
import { StatusBar } from "react-native";

export default function App() {
  return (
    <>
      <StatusBar barStyle={"light-content"} />
      <Routes />
    </>
  );
}

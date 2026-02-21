import HomeScreen from "@/screens/HomeScreen";
import LoginScreen from "../screens/LoginScreen";
import SignupScreen from "@/screens/SignupScreen";

const RouteList = [
  { path: "/login", element: LoginScreen },
  { path: "/signup", element: SignupScreen },
  { path: "/home", element: HomeScreen },
];

export default RouteList;

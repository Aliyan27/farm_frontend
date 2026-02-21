import HomeScreen from "@/screens/HomeScreen";
import LoginScreen from "../screens/LoginScreen";
import SignupScreen from "@/screens/SignupScreen";

const RouteList = [
  { path: "/login", element: LoginScreen, isPublic: true },
  { path: "/signup", element: SignupScreen, isPublic: true },
  { path: "/home", element: HomeScreen, isPublic: false },
];

export default RouteList;

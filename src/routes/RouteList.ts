import ExpensesScreen from "@/screens/ExpensesScreen";
import LoginScreen from "../screens/LoginScreen";
import SignupScreen from "@/screens/SignupScreen";
import FeedScreen from "@/screens/FeedScreen";
import RouteNames from "./RouteNames";
import EggProductionScreen from "@/screens/EggProductionScreen";

const RouteList = [
  { path: RouteNames.login, element: LoginScreen, isPublic: true },
  { path: RouteNames.signup, element: SignupScreen, isPublic: true },
  { path: RouteNames.expenses, element: ExpensesScreen, isPublic: false },
  { path: RouteNames.feedPurchase, element: FeedScreen, isPublic: false },
  {
    path: RouteNames.eggProduction,
    element: EggProductionScreen,
    isPublic: false,
  },
];

export default RouteList;

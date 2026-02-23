import ExpensesScreen from "@/screens/ExpensesScreen";
import LoginScreen from "../screens/LoginScreen";
import SignupScreen from "@/screens/SignupScreen";
import FeedScreen from "@/screens/FeedScreen";
import RouteNames from "./RouteNames";

const RouteList = [
  { path: RouteNames.login, element: LoginScreen, isPublic: true },
  { path: RouteNames.signup, element: SignupScreen, isPublic: true },
  { path: RouteNames.expenses, element: ExpensesScreen, isPublic: false },
  { path: RouteNames.feedPurchase, element: FeedScreen, isPublic: false },
];

export default RouteList;

import ExpensesScreen from "@/screens/ExpensesScreen";
import LoginScreen from "../screens/LoginScreen";
import SignupScreen from "@/screens/SignupScreen";
import FeedScreen from "@/screens/FeedScreen";

const RouteList = [
  { path: "/login", element: LoginScreen, isPublic: true },
  { path: "/signup", element: SignupScreen, isPublic: true },
  { path: "/expenses", element: ExpensesScreen, isPublic: false },
  { path: "/feed-purchase", element: FeedScreen, isPublic: false },
];

export default RouteList;

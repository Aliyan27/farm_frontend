import ExpensesScreen from "@/screens/ExpensesScreen";
import LoginScreen from "../screens/LoginScreen";
import SignupScreen from "@/screens/SignupScreen";
import FeedScreen from "@/screens/FeedScreen";
import RouteNames from "./RouteNames";
import EggProductionScreen from "@/screens/EggProductionScreen";
import EggSaleScreen from "@/screens/EggSaleScreen";
import SalaryScreen from "@/screens/SalaryScreen";
import IncomeStatementScreen from "@/screens/ReportScreen";
import DashboardScreen from "@/screens/DashboardScreen";

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
  {
    path: RouteNames.eggSale,
    element: EggSaleScreen,
    isPublic: false,
  },
  {
    path: RouteNames.salaries,
    element: SalaryScreen,
    isPublic: false,
  },
  {
    path: RouteNames.report,
    element: IncomeStatementScreen,
    isPublic: false,
  },
  {
    path: RouteNames.dashboard,
    element: DashboardScreen,
    isPublic: false,
  },
];

export default RouteList;

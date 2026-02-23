import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  LayoutDashboard,
  DollarSign,
  Egg,
  ShoppingCart,
  Package,
  Users,
  BarChart3,
  LogOut,
  Menu,
} from "lucide-react";
import { Link, NavLink } from "react-router-dom";
import { useAuthStore } from "@/store/AuthStore";
import { useNavigation } from "@/Hooks/useNavigation";
import RouteNames from "@/routes/RouteNames";

export function Navbar() {
  const { logout } = useAuthStore();
  const { navigateTo } = useNavigation();

  const handleLogout = () => {
    logout();
    navigateTo("/login");
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center justify-between">
        {/* Left: Logo + Mobile Menu */}
        <div className="flex items-center gap-4">
          {/* Mobile Hamburger */}
          <Sheet>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-72 p-0">
              {/* Mobile sidebar content - you can reuse Sidebar component here */}
              <div className="p-6">
                <h2 className="text-lg font-bold mb-6">Menu</h2>
                <nav className="space-y-2">
                  <Link
                    to="/"
                    className="block py-2 text-muted-foreground hover:text-foreground"
                  >
                    Dashboard
                  </Link>
                  <Link
                    to={RouteNames.expenses}
                    className="block py-2 text-muted-foreground hover:text-foreground"
                  >
                    Expenses
                  </Link>
                  <Link
                    to={RouteNames.feedPurchase}
                    className="block py-2 text-muted-foreground hover:text-foreground"
                  >
                    Feed Purchases
                  </Link>
                  <Link
                    to="/egg-production"
                    className="block py-2 text-muted-foreground hover:text-foreground"
                  >
                    Egg Production
                  </Link>
                  <Link
                    to="/egg-sales"
                    className="block py-2 text-muted-foreground hover:text-foreground"
                  >
                    Egg Sales
                  </Link>
                  <Link
                    to="/salaries"
                    className="block py-2 text-muted-foreground hover:text-foreground"
                  >
                    Salaries
                  </Link>
                  <Link
                    to="/reports"
                    className="block py-2 text-muted-foreground hover:text-foreground"
                  >
                    Reports
                  </Link>
                </nav>
              </div>
            </SheetContent>
          </Sheet>

          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold">
              F
            </div>
            <span className="font-semibold text-lg hidden sm:block">
              Farm Dashboard
            </span>
          </Link>
        </div>

        {/* Center: Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1">
          <NavLink
            to="/"
            className={({ isActive }) =>
              cn(
                "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground px-3 py-2",
                isActive && "bg-accent text-accent-foreground",
              )
            }
          >
            <LayoutDashboard className="mr-2 h-4 w-4" />
            Dashboard
          </NavLink>

          <NavLink
            to={RouteNames.expenses}
            className={({ isActive }) =>
              cn(
                "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground px-3 py-2",
                isActive && "bg-accent text-accent-foreground",
              )
            }
          >
            <DollarSign className="mr-2 h-4 w-4" />
            Expenses
          </NavLink>

          <NavLink
            to={RouteNames.feedPurchase}
            className={({ isActive }) =>
              cn(
                "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground px-3 py-2",
                isActive && "bg-accent text-accent-foreground",
              )
            }
          >
            <Package className="mr-2 h-4 w-4" />
            Feed Purchases
          </NavLink>

          <NavLink
            to="/egg-production"
            className={({ isActive }) =>
              cn(
                "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground px-3 py-2",
                isActive && "bg-accent text-accent-foreground",
              )
            }
          >
            <Egg className="mr-2 h-4 w-4" />
            Egg Production
          </NavLink>

          <NavLink
            to="/egg-sales"
            className={({ isActive }) =>
              cn(
                "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground px-3 py-2",
                isActive && "bg-accent text-accent-foreground",
              )
            }
          >
            <ShoppingCart className="mr-2 h-4 w-4" />
            Egg Sales
          </NavLink>

          <NavLink
            to="/salaries"
            className={({ isActive }) =>
              cn(
                "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground px-3 py-2",
                isActive && "bg-accent text-accent-foreground",
              )
            }
          >
            <Users className="mr-2 h-4 w-4" />
            Salaries
          </NavLink>

          <NavLink
            to="/reports"
            className={({ isActive }) =>
              cn(
                "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground px-3 py-2",
                isActive && "bg-accent text-accent-foreground",
              )
            }
          >
            <BarChart3 className="mr-2 h-4 w-4" />
            Reports
          </NavLink>
        </nav>

        {/* Right: User Actions */}
        <div className="flex items-center gap-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="relative h-10 w-10 rounded-full"
              >
                <Avatar className="h-10 w-10">
                  <AvatarImage src="/placeholder-user.jpg" alt="User" />
                  <AvatarFallback>FM</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end">
              <DropdownMenuLabel>
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">Malik</p>
                  <p className="text-xs leading-none text-muted-foreground">
                    malik@example.com
                  </p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout}>
                <LogOut className="mr-2 h-4 w-4" />
                Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}

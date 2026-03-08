import { Routes, Route, Navigate } from "react-router-dom";
import RouteList from "./RouteList";
import { type JSX } from "react";
import { useAuthStore } from "@/store/AuthStore";
import AuthWrapper from "@/components/AuthWrapper";
import { AppSidebar } from "@/components/app-sidebar";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { useNavigation } from "@/Hooks/useNavigation";
import RouteNames from "./RouteNames";

const protectedRoute = (element: JSX.Element) => {
  const { getCurrentRoute } = useNavigation();
  const { isAuthenticated } = useAuthStore();

  if (!isAuthenticated && getCurrentRoute() !== RouteNames.changePassword) {
    return <Navigate to={RouteNames.login} replace />;
  }
  return element;
};

const publicRoute = (element: JSX.Element) => {
  const { isAuthenticated, user } = useAuthStore();

  if (isAuthenticated) {
    if (user?.isEmailVerified) {
      return <Navigate to={RouteNames.dashboard} replace />;
    } else {
      return <Navigate to={RouteNames.verifyEmail} replace />;
    }
  }

  return element;
};

const InitiateRoute = () => {
  return (
    <>
      <Routes>
        {RouteList.map((route, index) => {
          if (route.isPublic) {
            return (
              <Route
                key={`route-${index}`}
                path={route.path}
                element={publicRoute(
                  <AuthWrapper key={`auth-wrapper-${index}`}>
                    <route.element />
                  </AuthWrapper>,
                )}
              />
            );
          }

          return (
            <Route
              key={`route-${index}`}
              path={route.path}
              element={protectedRoute(
                <>
                  <SidebarProvider>
                    <AppSidebar variant="inset" />
                    <SidebarInset className="bg-background">
                      {/* Mainlayout · TSX Copy */}
                      <main className="flex flex-col min-h-screen bg-stone-50 dark:bg-zinc-950">
                        {/* Top gradient accent bar */}
                        <div className="h-0.5 w-full bg-gradient-to-r from-amber-400 via-orange-400 to-rose-400 shrink-0" />

                        {/* Header */}
                        <header className="flex h-14 shrink-0 items-center gap-3 px-4 border-b border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-sm transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
                          <SidebarTrigger className="-ml-1 text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors" />
                          <div className="w-px h-4 bg-zinc-200 dark:bg-zinc-700" />
                          <Breadcrumb />
                        </header>

                        {/* Page content */}
                        <div className="flex-1 p-6">
                          <route.element />
                        </div>
                      </main>
                    </SidebarInset>
                  </SidebarProvider>
                </>,
              )}
            />
          );
        })}

        <Route
          path="*"
          element={<Navigate to={RouteNames.dashboard} replace />}
        />
      </Routes>
    </>
  );
};

export default InitiateRoute;

import {
  Routes,
  Route,
  Navigate,
  BrowserRouter as Router,
} from "react-router-dom";
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
import { Separator } from "@/components/ui/separator";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

const protectedRoute = (element: JSX.Element) => {
  const { isAuthenticated } = useAuthStore();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return element;
};

const publicRoute = (element: JSX.Element) => {
  const { isAuthenticated } = useAuthStore();

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return element;
};

const InitiateRoute = () => {
  return (
    <>
      <Router>
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
                        <main className="p-6">
                          <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
                            <div className="flex items-center gap-2 px-4">
                              <SidebarTrigger className="-ml-1" />
                              <Separator
                                orientation="vertical"
                                className="mr-2 data-[orientation=vertical]:h-4"
                              />
                              <Breadcrumb>
                                <BreadcrumbList>
                                  <BreadcrumbItem className="hidden md:block">
                                    <BreadcrumbLink href="#">
                                      Build Your Application
                                    </BreadcrumbLink>
                                  </BreadcrumbItem>
                                  <BreadcrumbSeparator className="hidden md:block" />
                                  <BreadcrumbItem>
                                    <BreadcrumbPage>
                                      Data Fetching
                                    </BreadcrumbPage>
                                  </BreadcrumbItem>
                                </BreadcrumbList>
                              </Breadcrumb>
                            </div>
                          </header>
                          <route.element />
                        </main>
                      </SidebarInset>
                    </SidebarProvider>
                  </>,
                )}
              />
            );
          })}

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </>
  );
};

export default InitiateRoute;

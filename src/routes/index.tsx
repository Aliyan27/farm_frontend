import {
  Routes,
  Route,
  Navigate,
  BrowserRouter as Router,
} from "react-router-dom";
import RouteList from "./RouteList";
import { type JSX } from "react";
import { useAuthStore } from "@/store/AuthStore";
import { Navbar } from "@/components/Navbar";

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
                  element={publicRoute(<route.element />)}
                />
              );
            }

            return (
              <Route
                key={`route-${index}`}
                path={route.path}
                element={protectedRoute(
                  <>
                    <Navbar />
                    <route.element />
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

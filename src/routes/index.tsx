import {
  Routes,
  Route,
  Navigate,
  BrowserRouter as Router,
} from "react-router-dom"; // ← correct import
import RouteList from "./RouteList";

const InitiateRoute = () => {
  return (
    <Router>
      <Routes>
        {RouteList.map((route, index) => (
          <Route
            key={`route-${index}`}
            path={route.path}
            element={<route.element />}
          />
        ))}

        <Route path="*" element={<Navigate to={"/login"} replace />} />
      </Routes>
    </Router>
  );
};

export default InitiateRoute;

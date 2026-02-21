import { useNavigate, useLocation, useParams } from "react-router-dom";
import { useCallback } from "react";

interface NavigationPayload {
  [key: string]: any;
}

export const useNavigation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const params = useParams();
  const navigateTo = useCallback(
    (route: string, payload?: NavigationPayload) => {
      navigate(route, { state: payload });
    },
    [navigate],
  );

  const navigateWithParams = useCallback(
    (
      route: string,
      params: Record<string, string | number>,
      payload?: NavigationPayload,
    ) => {
      let finalRoute = route;
      for (const [key, value] of Object.entries(params)) {
        finalRoute = finalRoute.replace(`:${key}`, String(value));
      }
      navigate(finalRoute, { state: payload });
    },
    [navigate],
  );

  const goBack = useCallback(() => {
    navigate(-1);
  }, [navigate]);

  const getCurrentState = useCallback(() => {
    return location.state as NavigationPayload | null;
  }, [location.state]);

  const getCurrentRoute = useCallback(() => {
    return location.pathname;
  }, [location.pathname]);

  const getCurrentParams = useCallback(() => {
    return params;
  }, [params]);
  return {
    navigateTo,
    navigateWithParams,
    goBack,
    getCurrentState,
    getCurrentRoute,
    getCurrentParams,
  };
};

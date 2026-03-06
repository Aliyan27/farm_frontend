import { LoginForm } from "@/components/login-form";
import { useState } from "react";
import { getErrorDataCase } from "@/lib/utils";
import { useNavigation } from "@/Hooks/useNavigation";
import { useAuthStore } from "@/store/AuthStore";
import { signinService } from "@/services/commonService";
import RouteNames from "@/routes/RouteNames";

const LoginScreen = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const { navigateTo } = useNavigation();
  const { login, setUser } = useAuthStore();

  const onLogin = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      let response = await signinService(email, password);
      if (response.message.toLowerCase() === "success") {
        login(response.data.token);
        globalThis.authToken = response.data.token;
        setError("");
        setUser(response.data.user);
        if (response.data.user.isEmailVerified) {
          console.log("isEmailVerified::", response.data.user.isEmailVerified);
          navigateTo(RouteNames.dashboard);
        } else {
          navigateTo(RouteNames.verifyEmail);
        }
      }
    } catch (error) {
      console.log("login error::", error);
      setError(getErrorDataCase(error));
    } finally {
      setIsLoading(false);
    }
  };

  return <LoginForm onSubmit={onLogin} isLoading={isLoading} error={error} />;
};

export default LoginScreen;

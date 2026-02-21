import { LoginForm } from "@/components/login-form";
import AuthWrapper from "@/components/AuthWrapper";
import { useState } from "react";
import { signinService } from "@/services/commonService";
import { getErrorDataCase } from "@/lib/utils";
import { useNavigation } from "@/Hooks/useNavigation";

const LoginScreen = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const { navigateTo } = useNavigation();

  const onLogin = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      let response = await signinService(email, password);
      if (response.message.toLowerCase() === "success") {
        console.log(response.data.token);
        globalThis.authToken = response.data.token;
        setError("");
        navigateTo("/home");
      }
    } catch (error) {
      console.log("login error::", error);
      setError(getErrorDataCase(error));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthWrapper>
      <LoginForm onSubmit={onLogin} isLoading={isLoading} error={error} />
    </AuthWrapper>
  );
};

export default LoginScreen;

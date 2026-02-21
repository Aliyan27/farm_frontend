import AuthWrapper from "@/components/AuthWrapper";
import { SignupForm } from "@/components/SignupForm";
import { useNavigation } from "@/Hooks/useNavigation";
import { getErrorDataCase } from "@/lib/utils";
import { signupService } from "@/services/commonService";
import { useState } from "react";

const SignupScreen = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const { navigateTo } = useNavigation();
  const onSignup = async (name: string, email: string, password: string) => {
    try {
      let response = await signupService(name, email, password);
      if (response.message.toLowerCase() === "success") {
        setError("");
        navigateTo("/login");
      }
    } catch (error) {
      console.log(error);
      setError(getErrorDataCase(error));
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <AuthWrapper>
      <SignupForm onSubmit={onSignup} isLoading={isLoading} error={error} />
    </AuthWrapper>
  );
};

export default SignupScreen;

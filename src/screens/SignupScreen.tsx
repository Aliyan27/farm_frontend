import { SignupForm } from "@/components/SignupForm";
import { useNavigation } from "@/Hooks/useNavigation";
import { getErrorDataCase } from "@/lib/utils";
import { signupService } from "@/services/commonService";
import { useState } from "react";
import toast from "react-hot-toast";

const SignupScreen = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { navigateTo } = useNavigation();
  const onSignup = async (
    name: string,
    email: string,
    role: string,
    password: string,
  ) => {
    try {
      let response = await signupService(name, email, role, password);
      if (response.message.toLowerCase() === "success") {
        toast.success("Account Created");
        navigateTo("/login");
      }
    } catch (error) {
      console.log(error);
      toast.error(getErrorDataCase(error));
    } finally {
      setIsLoading(false);
    }
  };
  return <SignupForm onSubmit={onSignup} isLoading={isLoading} />;
};

export default SignupScreen;

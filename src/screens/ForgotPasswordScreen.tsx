import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
  forgotPasswordService,
  verifyOtpService,
} from "@/services/commonService";
import { useNavigation } from "@/Hooks/useNavigation";
import RouteNames from "@/routes/RouteNames";

import { useAuthStore } from "@/store/AuthStore";
import ForgotPassword from "@/pages/ForgotPassword";

const ForgotPasswordScreen = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [showOtpForm, setShowOtpForm] = useState(false);
  const [emailSentTo, setEmailSentTo] = useState<string>("");
  const [timer, setTimer] = useState<number>(60);
  const { login } = useAuthStore();
  const { navigateTo } = useNavigation();

  useEffect(() => {
    if (!showOtpForm || timer <= 0) return;

    const interval = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [showOtpForm, timer]);

  const handleSendEmail = async (email: string) => {
    setIsLoading(true);

    try {
      const response = await forgotPasswordService(email);

      if (response.message?.toLowerCase().includes("success")) {
        toast.success("OTP sent to your email");
        setEmailSentTo(email);
        setShowOtpForm(true);
        setTimer(60);
      } else {
        toast.error(response.message || "Failed to send OTP");
      }
    } catch (err: any) {
      toast.error(err.message || "Something went wrong. Try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyOtp = async (otp: string) => {
    setIsLoading(true);

    try {
      const response = await verifyOtpService(emailSentTo, otp);

      if (response.message?.toLowerCase().includes("success")) {
        toast.success("Email verified! Redirecting...");
        login(response.data.token);
        globalThis.authToken = response.data.token;
        navigateTo(`${RouteNames.changePassword}?type=otp`);
      } else {
        toast.error(response.message || "Invalid OTP");
      }
    } catch (err: any) {
      toast.error(err.message || "Verification failed");
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendOtp = async () => {
    if (timer > 0 || isLoading) return;

    await handleSendEmail(emailSentTo);
  };

  return (
    <ForgotPassword
      showOtpForm={showOtpForm}
      isLoading={isLoading}
      emailSentTo={emailSentTo}
      timer={timer}
      handleSendEmail={handleSendEmail}
      handleVerifyOtp={handleVerifyOtp}
      handleResendOtp={handleResendOtp}
      hideOtpForm={() => setShowOtpForm(false)}
    />
  );
};

export default ForgotPasswordScreen;

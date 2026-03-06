import { getErrorDataCase } from "@/lib/utils";
import {
  sendVerificationEmailService,
  verifyEmailService,
} from "@/services/commonService";
import toast from "react-hot-toast";
import RouteNames from "@/routes/RouteNames";
import { useEffect, useState } from "react";
import { useAuthStore } from "@/store/AuthStore";
import VerifyEmail from "@/pages/VerifyEmail";

const VerifyEmailScreen = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [showOtpForm, setShowOtpForm] = useState(false);
  const [timer, setTimer] = useState<number>(60);
  const { user, setUser } = useAuthStore();

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

  const sendVerificationEmail = async () => {
    try {
      if (!user) return;
      let response = await sendVerificationEmailService(user.email);
      if (response.message.toLowerCase() === "success") {
        toast.success("OTP sent to your email");
        setShowOtpForm(true);
        setTimer(60);
      }
    } catch (error) {
      console.log(getErrorDataCase(error));
      toast.error(getErrorDataCase(error));
    }
  };

  const handleVerifyOtp = async (otp: string) => {
    setIsLoading(true);

    try {
      if (!user) return;
      const response = await verifyEmailService(user.email, otp);

      if (response.message?.toLowerCase().includes("success")) {
        toast.success("Email verified! Redirecting...");
        user.isEmailVerified = true;
        setUser(user);

        window.location.replace(`${RouteNames.dashboard}`);
      } else {
        toast.error(response.message || "Invalid OTP");
      }
    } catch (err: any) {
      toast.error(getErrorDataCase(err) || "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendOtp = async () => {
    if (timer > 0 || isLoading) return;

    await sendVerificationEmail();
  };

  return (
    <VerifyEmail
      showOtpForm={showOtpForm}
      isLoading={isLoading}
      emailSentTo={user?.email ?? "sample@gmail.com"}
      timer={timer}
      handleSendEmail={sendVerificationEmail}
      handleVerifyOtp={handleVerifyOtp}
      handleResendOtp={handleResendOtp}
      hideOtpForm={() => setShowOtpForm(false)}
    />
  );
};

export default VerifyEmailScreen;

"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { changePasswordService } from "@/services/commonService";
import { useNavigation } from "@/Hooks/useNavigation";
import RouteNames from "@/routes/RouteNames";
import ChangePassword from "@/pages/ChangePassword";
import { useLocation } from "react-router-dom";

const ChangePasswordScreen = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { navigateTo } = useNavigation();
  const location = useLocation();
  const search = new URLSearchParams(location.search);
  const type = search.get("type") ?? "password";

  const changePassword = async (values: {
    oldPassword?: string;
    newPassword: string;
  }) => {
    setIsLoading(true);

    try {
      const response = await changePasswordService(values.newPassword);

      if (response.message?.toLowerCase().includes("success")) {
        toast.success("Password changed successfully");
        navigateTo(RouteNames.dashboard);
      } else {
        toast.error(response.message || "Failed to change password");
      }
    } catch (err: any) {
      toast.error(err.message || "Something went wrong. Try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ChangePassword
      type={type}
      isLoading={isLoading}
      changePassword={changePassword}
    />
  );
};

export default ChangePasswordScreen;

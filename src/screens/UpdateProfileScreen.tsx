import { useNavigation } from "@/Hooks/useNavigation";
import { getErrorDataCase } from "@/lib/utils";
import UpdateProfile from "@/pages/UpdateProfile";
import RouteNames from "@/routes/RouteNames";
import { updateProfileService } from "@/services/commonService";
import { useAuthStore } from "@/store/AuthStore";
import { useState } from "react";
import toast from "react-hot-toast";

const UpdateProfileScreen = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { navigateTo } = useNavigation();
  const { setUser } = useAuthStore();

  const updateProfile = async (email: string, name?: string) => {
    setIsLoading(true);

    try {
      let response = await updateProfileService(
        email,
        name && name.length > 0 ? name : undefined,
      );

      if (response.message?.toLowerCase().includes("success")) {
        toast.success("Profile updated successfully");
        setUser(response.data);

        if (response.data?.isEmailVerified) {
          navigateTo(RouteNames.dashboard);
        } else {
          navigateTo(RouteNames.verifyEmail);
        }
      } else {
        toast.error(response.message || "Failed to update profile");
      }
    } catch (err: any) {
      toast.error(getErrorDataCase(err) || "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <UpdateProfile
      isLoading={isLoading}
      onSubmit={updateProfile}
      onCancel={() => navigateTo(RouteNames.dashboard)}
    />
  );
};

export default UpdateProfileScreen;

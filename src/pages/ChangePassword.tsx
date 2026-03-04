import { Button } from "@/components/ui/button";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";

const validationSchema = Yup.object({
  oldPassword: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .required(),
  newPassword: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .required("New password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("newPassword")], "Passwords must match")
    .required("Confirm password is required"),
});

const validationSchemaOtp = Yup.object({
  newPassword: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .required("New password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("newPassword")], "Passwords must match")
    .required("Confirm password is required"),
});

type ChangePasswordProps = {
  type: string;
  isLoading: boolean;
  changePassword: (values: {
    oldPassword?: string;
    newPassword: string;
  }) => Promise<void>;
};

const ChangePassword = (props: ChangePasswordProps) => {
  const formik = useFormik({
    initialValues:
      props.type === "password"
        ? {
            oldPassword: "",
            newPassword: "",
            confirmPassword: "",
          }
        : {
            newPassword: "",
            confirmPassword: "",
          },
    validationSchema:
      props.type === "password" ? validationSchema : validationSchemaOtp,
    onSubmit: async (values) => {
      await props.changePassword(values);
    },
  });
  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="w-full max-w-md space-y-8">
        {/* Header */}
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight">
            Set New Password
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Choose a strong password for your account
          </p>
        </div>

        {/* Form */}
        <form onSubmit={formik.handleSubmit} className="space-y-6">
          {/* Old Password */}
          {props.type === "password" && (
            <div className="space-y-2">
              <Label htmlFor="newPassword">Old Password</Label>
              <Input
                id="oldPassword"
                name="oldPassword"
                type="password"
                placeholder="••••••••"
                value={formik.values.oldPassword}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                disabled={props.isLoading}
                className={cn(
                  formik.touched.newPassword &&
                    formik.errors.newPassword &&
                    "border-destructive",
                )}
              />
              {formik.touched.oldPassword && formik.errors.oldPassword && (
                <p className="text-sm text-destructive">
                  {formik.errors.oldPassword as string}
                </p>
              )}
            </div>
          )}

          {/* New Password */}
          <div className="space-y-2">
            <Label htmlFor="newPassword">New Password</Label>
            <Input
              id="newPassword"
              name="newPassword"
              type="password"
              placeholder="••••••••"
              value={formik.values.newPassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              disabled={props.isLoading}
              className={cn(
                formik.touched.newPassword &&
                  formik.errors.newPassword &&
                  "border-destructive",
              )}
            />
            {formik.touched.newPassword && formik.errors.newPassword && (
              <p className="text-sm text-destructive">
                {formik.errors.newPassword as string}
              </p>
            )}
          </div>

          {/* Confirm Password */}
          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Confirm Password</Label>
            <Input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              placeholder="••••••••"
              value={formik.values.confirmPassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              disabled={props.isLoading}
              className={cn(
                formik.touched.confirmPassword &&
                  formik.errors.confirmPassword &&
                  "border-destructive",
              )}
            />
            {formik.touched.confirmPassword &&
              formik.errors.confirmPassword && (
                <p className="text-sm text-destructive">
                  {formik.errors.confirmPassword as string}
                </p>
              )}
          </div>

          {/* Submit */}
          <Button
            type="submit"
            className="w-full"
            disabled={props.isLoading || !formik.isValid}
          >
            {props.isLoading ? "Changing..." : "Change Password"}
          </Button>
        </form>

        {/* Back to login */}
        <div className="text-center text-sm">
          <a href="/login" className="text-primary hover:underline">
            Back to Login
          </a>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;

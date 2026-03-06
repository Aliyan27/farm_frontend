import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useFormik } from "formik";
import { cn } from "@/lib/utils";
import * as Yup from "yup";

type ForgotPasswordProps = {
  showOtpForm: boolean;
  emailSentTo: string;
  isLoading: boolean;
  timer: number;
  handleResendOtp: () => Promise<void>;
  handleSendEmail: () => Promise<void>;
  handleVerifyOtp: (otp: string) => Promise<void>;
  hideOtpForm: () => void;
};

const VerifyEmail = (props: ForgotPasswordProps) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="w-full max-w-md space-y-8 p-8 bg-card rounded-xl shadow-lg border">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight">
            {props.showOtpForm ? "Enter OTP" : "Send Email"}
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            {props.showOtpForm
              ? `We sent a 6-digit OTP to ${props.emailSentTo}`
              : "Send OTP to verify your email"}
          </p>
        </div>

        {props.showOtpForm ? (
          <OtpForm
            onSubmit={props.handleVerifyOtp}
            onResend={props.handleResendOtp}
            isLoading={props.isLoading}
            timer={props.timer}
          />
        ) : (
          <div>
            <Button className="w-full" onClick={() => props.handleSendEmail()}>
              Send Email
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default VerifyEmail;

const otpSchema = Yup.object({
  otp: Yup.string().required("OTP is required"),
});

type OtpFormProps = {
  onSubmit: (otp: string) => Promise<void>;
  onResend: () => Promise<void>;
  isLoading: boolean;
  timer: number;
};

const OtpForm = ({ onSubmit, onResend, isLoading, timer }: OtpFormProps) => {
  const formik = useFormik({
    initialValues: { otp: "" },
    validationSchema: otpSchema,
    onSubmit: async (values) => await onSubmit(values.otp),
  });

  return (
    <form onSubmit={formik.handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="otp">Enter 6-digit OTP</Label>
        <Input
          id="otp"
          name="otp"
          type="text"
          maxLength={6}
          placeholder="123456"
          value={formik.values.otp}
          onChange={(e) => {
            const value = e.target.value.replace(/\D/g, "");
            formik.setFieldValue("otp", value);
          }}
          onBlur={formik.handleBlur}
          disabled={isLoading}
          className={cn(
            formik.touched.otp && formik.errors.otp && "border-destructive",
          )}
        />
        {formik.touched.otp && formik.errors.otp && (
          <p className="text-sm text-destructive">
            {formik.errors.otp as string}
          </p>
        )}
      </div>

      <Button
        type="submit"
        className="w-full"
        disabled={isLoading || !formik.isValid}
      >
        {isLoading ? "Verifying..." : "Verify OTP"}
      </Button>

      <div className="text-center text-sm">
        {timer > 0 ? (
          <p className="text-muted-foreground">
            Resend in <span className="font-medium">{timer}s</span>
          </p>
        ) : (
          <button
            type="button"
            onClick={onResend}
            disabled={isLoading}
            className={cn(
              "text-primary hover:underline",
              isLoading && "opacity-50 cursor-not-allowed",
            )}
          >
            Resend OTP
          </button>
        )}
      </div>
    </form>
  );
};

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useFormik } from "formik";
import * as Yup from "yup";

const validationSchema = Yup.object({
  name: Yup.string()
    .min(3, "Name must be at least 3 characters")
    .required("Name is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
});

interface SignupFormProps {
  className?: string;
  onSubmit: (name: string, email: string, password: string) => Promise<void>;
  isLoading: boolean;
  error: string;
}

export function SignupForm(props: SignupFormProps) {
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      console.log("signup===>");
      props.onSubmit(values.name, values.email, values.password);
    },
  });

  return (
    <form
      onSubmit={formik.handleSubmit}
      className={cn("flex flex-col gap-6", props.className)}
    >
      <FieldGroup>
        <div className="flex flex-col items-center gap-1 text-center">
          <h1 className="text-2xl font-bold">Create your account</h1>
          <p className="text-muted-foreground text-sm text-balance">
            Enter your details below to create a new account
          </p>
        </div>

        {/* Name Field */}
        <Field>
          <FieldLabel htmlFor="name">Name</FieldLabel>
          <Input
            id="name"
            name="name"
            type="text"
            placeholder="Malik Ahmed"
            required
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            disabled={props.isLoading}
          />
          {formik.touched.name && formik.errors.name ? (
            <p className="text-sm text-red-600 mt-1">{formik.errors.name}</p>
          ) : null}
        </Field>

        {/* Email Field */}
        <Field>
          <FieldLabel htmlFor="email">Email</FieldLabel>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="m@example.com"
            required
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            disabled={props.isLoading}
          />
          {formik.touched.email && formik.errors.email ? (
            <p className="text-sm text-red-600 mt-1">{formik.errors.email}</p>
          ) : null}
        </Field>

        {/* Password Field */}
        <Field>
          <FieldLabel htmlFor="password">Password</FieldLabel>
          <Input
            id="password"
            name="password"
            type="password"
            required
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            disabled={props.isLoading}
          />
          {formik.touched.password && formik.errors.password ? (
            <p className="text-sm text-red-600 mt-1">
              {formik.errors.password}
            </p>
          ) : null}
        </Field>

        {/* Submit Button */}
        <Field>
          <Button type="submit" disabled={props.isLoading || !formik.isValid}>
            {props.isLoading ? "Creating account..." : "Create Account"}
          </Button>
        </Field>

        {/* Error Message */}
        {props.error && (
          <p className="text-sm text-red-600 text-center">{props.error}</p>
        )}

        {/* Separator & Login link */}
        <FieldSeparator>Or</FieldSeparator>

        <Field>
          <FieldDescription className="text-center mt-4">
            Already have an account?{" "}
            <a href="/login" className="underline underline-offset-4">
              Login
            </a>
          </FieldDescription>
        </Field>
      </FieldGroup>
    </form>
  );
}

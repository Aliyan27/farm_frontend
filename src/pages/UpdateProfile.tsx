import { useFormik } from "formik";
import * as Yup from "yup";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

const validationSchema = Yup.object({
  name: Yup.string()
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name is too long")
    .optional(),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
});

type UpdateProfileProps = {
  isLoading: boolean;
  onSubmit: (email: string, name?: string) => void;
  onCancel: () => void;
};

const UpdateProfile = (props: UpdateProfileProps) => {
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      props.onSubmit(values.email, values.name);
    },
  });
  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="w-full max-w-md space-y-8 p-8 bg-card rounded-xl shadow-lg border">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight">Update Profile</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Update your name and email address
          </p>
        </div>

        <form onSubmit={formik.handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              name="name"
              type="text"
              placeholder="Your full name"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              disabled={props.isLoading}
              className={cn(
                formik.touched.name &&
                  formik.errors.name &&
                  "border-destructive",
              )}
            />
            {formik.touched.name && formik.errors.name && (
              <p className="text-sm text-destructive">
                {formik.errors.name as string}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email address *</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="name@example.com"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              disabled={props.isLoading}
              className={cn(
                formik.touched.email &&
                  formik.errors.email &&
                  "border-destructive",
              )}
            />
            {formik.touched.email && formik.errors.email && (
              <p className="text-sm text-destructive">
                {formik.errors.email as string}
              </p>
            )}
          </div>

          <div className="flex flex-col gap-4">
            <Button
              type="submit"
              className="w-full"
              disabled={props.isLoading || !formik.isValid}
            >
              {props.isLoading ? "Updating..." : "Update Profile"}
            </Button>

            <Button
              type="button"
              variant="outline"
              className="w-full"
              disabled={props.isLoading}
              onClick={props.onCancel}
            >
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateProfile;

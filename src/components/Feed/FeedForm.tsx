import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Textarea } from "../ui/TextArea";

// ────────────────────────────────────────────────
// Validation Schema
// ────────────────────────────────────────────────
const validationSchema = Yup.object({
  date: Yup.date()
    .required("Date is required")
    .typeError("Invalid date format"),
  voucherType: Yup.string()
    .oneOf(["IN", "OUT"], "Type must be IN or OUT")
    .required("Type is required"),
  feedType: Yup.string().required("Feed type is required").trim(),
  farm: Yup.string()
    .oneOf(["KAASI_19", "MATITAL", "OTHER"], "Invalid farm")
    .required("Farm is required"),
  bags: Yup.number()
    .integer("Must be a whole number")
    .min(0, "Bags cannot be negative")
    .required("Bags is required"),
  description: Yup.string().optional().trim(),
  debit: Yup.number().min(0, "Debit cannot be negative").optional(),
  credit: Yup.number().min(0, "Credit cannot be negative").optional(),
  reconciled: Yup.boolean().optional(),
  postedToStatement: Yup.boolean().optional(),
});

interface FeedFormProps {
  className?: string;
  initialValues?: any;
  onSubmit: (values: any) => Promise<void>;
  isLoading: boolean;
  error: string;
}

export function FeedForm({
  className,
  initialValues = {},
  onSubmit,
  isLoading,
  error,
}: FeedFormProps) {
  const formik = useFormik({
    initialValues: {
      date: initialValues?.date?.toString() || "",
      voucherType: initialValues?.voucherType || "",
      feedType: initialValues?.feedType || "",
      farm: initialValues?.farm || "",
      bags: initialValues?.bags ?? "",
      description: initialValues?.description || "",
      debit: initialValues?.debit ?? 0,
      credit: initialValues?.credit ?? 0,
      reconciled: initialValues?.reconciled ?? false,
      postedToStatement: initialValues?.postedToStatement ?? false,
    },
    validationSchema,
    enableReinitialize: true,
    onSubmit: async (values) => {
      console.log("Submitting feed record:", values);
      await onSubmit(values);
      formik.resetForm();
    },
  });

  // Helper to render field errors safely
  const renderError = (fieldName: keyof typeof formik.errors) => {
    const err = formik.errors[fieldName];
    const touched = formik.touched[fieldName];

    if (!touched || !err) return null;

    const message =
      typeof err === "string"
        ? err
        : Array.isArray(err)
          ? err.join(", ")
          : "Invalid value";

    return <p className="text-xs text-red-600 mt-1">{message}</p>;
  };

  return (
    <form
      onSubmit={formik.handleSubmit}
      className={cn("flex flex-col gap-5", className)}
    >
      <FieldGroup className="space-y-5">
        {/* Date */}
        <Field>
          <FieldLabel htmlFor="date">Date</FieldLabel>
          <Input
            id="date"
            name="date"
            type="date"
            value={formik.values.date}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            disabled={isLoading}
          />
          {renderError("date")}
        </Field>

        {/* Voucher Type */}
        <Field>
          <FieldLabel htmlFor="voucherType">Type</FieldLabel>
          <select
            id="voucherType"
            name="voucherType"
            value={formik.values.voucherType}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            disabled={isLoading}
            className={cn(
              "flex h-9 w-full rounded-md border border-input bg-background px-3 py-1.5 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
            )}
          >
            <option value="">Select type</option>
            <option value="IN">IN (Purchase)</option>
            <option value="OUT">OUT (Payment)</option>
          </select>
          {renderError("voucherType")}
        </Field>

        {/* Feed Type */}
        <Field>
          <FieldLabel htmlFor="feedType">Feed Type</FieldLabel>
          <Input
            id="feedType"
            name="feedType"
            placeholder="13-C1"
            value={formik.values.feedType}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            disabled={isLoading}
          />
          {renderError("feedType")}
        </Field>

        {/* Farm */}
        <Field>
          <FieldLabel htmlFor="farm">Farm</FieldLabel>
          <select
            id="farm"
            name="farm"
            value={formik.values.farm}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            disabled={isLoading}
            className={cn(
              "flex h-9 w-full rounded-md border border-input bg-background px-3 py-1.5 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
            )}
          >
            <option value="">Select farm</option>
            <option value="KAASI_19">KAASI_19</option>
            <option value="MATITAL">MATITAL</option>
            <option value="OTHER">OTHER</option>
          </select>
          {renderError("farm")}
        </Field>

        {/* Bags */}
        <Field>
          <FieldLabel htmlFor="bags">Bags</FieldLabel>
          <Input
            id="bags"
            name="bags"
            type="number"
            min="0"
            step="1"
            placeholder="240"
            value={formik.values.bags}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            disabled={isLoading}
          />
          {renderError("bags")}
        </Field>

        {/* Description */}
        <Field>
          <FieldLabel htmlFor="description">Description (optional)</FieldLabel>
          <Textarea
            id="description"
            name="description"
            placeholder="240 bags feed NO 13-C1 @6827/="
            value={formik.values.description}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            disabled={isLoading}
            rows={2}
          />
          {renderError("description")}
        </Field>

        {/* Debit & Credit */}
        <div className="grid grid-cols-2 gap-4">
          <Field>
            <FieldLabel htmlFor="debit">Debit</FieldLabel>
            <Input
              id="debit"
              name="debit"
              type="number"
              min="0"
              step="0.01"
              placeholder="1477862"
              value={formik.values.debit}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              disabled={isLoading}
            />
            {renderError("debit")}
          </Field>

          <Field>
            <FieldLabel htmlFor="credit">Credit</FieldLabel>
            <Input
              id="credit"
              name="credit"
              type="number"
              min="0"
              step="0.01"
              placeholder="0"
              value={formik.values.credit}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              disabled={isLoading}
            />
            {renderError("credit")}
          </Field>
        </div>

        {/* Submit */}
        <div className="flex justify-end mt-4 gap-3">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => formik.resetForm()}
            disabled={isLoading}
          >
            Reset
          </Button>
          <Button
            type="submit"
            size="sm"
            disabled={isLoading || !formik.isValid || !formik.dirty}
          >
            {isLoading ? "Saving..." : "Save"}
          </Button>
        </div>

        {/* Server error */}
        {error && (
          <p className="text-sm text-red-600 text-center mt-3">{error}</p>
        )}
      </FieldGroup>
    </form>
  );
}

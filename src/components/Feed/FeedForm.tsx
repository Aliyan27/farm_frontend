import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Textarea } from "../ui/TextArea";

// Validation schema (same as your Zod backend)
const validationSchema = Yup.object({
  date: Yup.date().required("Date is required"),
  voucherType: Yup.string().oneOf(["IN", "OUT"]).required("Type is required"),
  feedType: Yup.string().required("Feed type is required"),
  farm: Yup.string()
    .oneOf(["KAASI_19", "MATITAL", "COMBINED", "OTHER"])
    .required("Farm is required"),
  bags: Yup.number().integer().min(0).required("Bags is required"),
  description: Yup.string().optional(),
  debit: Yup.number().min(0).optional(),
  credit: Yup.number().min(0).optional(),
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
      bags: initialValues?.bags || "",
      description: initialValues?.description || "",
      debit: initialValues?.debit || 0,
      credit: initialValues?.credit || 0,
      reconciled: initialValues?.reconciled ?? false,
      postedToStatement: initialValues?.postedToStatement ?? false,
    },
    validationSchema,
    enableReinitialize: true,
    onSubmit: async (values) => {
      console.log("Submitting feed record:", values);
      await onSubmit(values);
      formik.resetForm(); // clear form after success
    },
  });

  // Helper to safely render formik errors
  const renderError = (fieldName: keyof typeof formik.errors) => {
    const err = formik.errors[fieldName];
    const touched = formik.touched[fieldName];

    if (!touched || !err) return null;

    // Safely convert error to string (handles string | object | array)
    const message = typeof err === "string" ? err : "Invalid value";

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
          <FieldLabel>Date</FieldLabel>
          <Input
            type="date"
            name="date"
            value={formik.values.date}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            disabled={isLoading}
          />
          {renderError("date")}
        </Field>

        {/* Voucher Type */}
        <Field>
          <FieldLabel>Type</FieldLabel>
          <select
            name="voucherType"
            value={formik.values.voucherType}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            disabled={isLoading}
            className="flex h-9 w-full rounded-md border px-3 py-1.5 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            <option value="">Select type</option>
            <option value="IN">IN (Purchase)</option>
            <option value="OUT">OUT (Payment)</option>
          </select>
          {renderError("voucherType")}
        </Field>

        {/* Feed Type */}
        <Field>
          <FieldLabel>Feed Type</FieldLabel>
          <Input
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
          <FieldLabel>Farm</FieldLabel>
          <select
            name="farm"
            value={formik.values.farm}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            disabled={isLoading}
            className="flex h-9 w-full rounded-md border px-3 py-1.5 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            <option value="">Select farm</option>
            <option value="KAASI_19">KAASI_19</option>
            <option value="MATITAL">MATITAL</option>
            <option value="COMBINED">COMBINED</option>
            <option value="OTHER">OTHER</option>
          </select>
          {renderError("farm")}
        </Field>

        {/* Bags */}
        <Field>
          <FieldLabel>Bags</FieldLabel>
          <Input
            type="number"
            name="bags"
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
          <FieldLabel>Description</FieldLabel>
          <Textarea
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
            <FieldLabel>Debit</FieldLabel>
            <Input
              type="number"
              name="debit"
              placeholder="1477862"
              value={formik.values.debit}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              disabled={isLoading}
            />
            {renderError("debit")}
          </Field>

          <Field>
            <FieldLabel>Credit</FieldLabel>
            <Input
              type="number"
              name="credit"
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
        <div className="flex justify-end mt-4">
          <Button
            type="submit"
            disabled={isLoading || !formik.isValid || !formik.dirty}
          >
            {isLoading ? "Saving..." : "save"}
          </Button>
        </div>

        {error && (
          <p className="text-sm text-red-600 text-center mt-3">{error}</p>
        )}
      </FieldGroup>
    </form>
  );
}

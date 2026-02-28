import { useFormik } from "formik";
import * as Yup from "yup";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "../ui/TextArea";

// Validation schema (adjust as needed)
const validationSchema = Yup.object({
  date: Yup.date().required("Date is required"),
  farm: Yup.string()
    .oneOf(["KAASI_19", "MATITAL", "COMBINED", "OTHER"])
    .required("Farm is required"),
  chickenEggs: Yup.number()
    .integer("Must be a whole number")
    .min(0, "Cannot be negative")
    .required("Chicken eggs count is required"),
  totalEggs: Yup.number()
    .integer("Must be a whole number")
    .min(0, "Cannot be negative")
    .required("Total eggs count is required"),
  notes: Yup.string().optional(),
});

interface EggProductionFormProps {
  initialValues?: Partial<{
    date: string;
    farm: string;
    chickenEggs: number | string;
    totalEggs: number | string;
    notes?: string;
  }>;
  onSubmit: (values: any) => Promise<void>;
  isLoading: boolean;
  error: string;
  className?: string;
}

export function EggProductionForm({
  initialValues = {},
  onSubmit,
  isLoading,
  error,
  className,
}: EggProductionFormProps) {
  const formik = useFormik({
    initialValues: {
      date: initialValues.date
        ? new Date(initialValues?.date).toISOString().split("T")[0]
        : "",
      farm: initialValues.farm || "",
      chickenEggs: initialValues.chickenEggs || "",
      totalEggs: initialValues.totalEggs || "",
      notes: initialValues.notes || "",
    },
    validationSchema,
    enableReinitialize: true,
    onSubmit: async (values) => {
      await onSubmit(values);
      formik.resetForm();
    },
  });

  const renderError = (field: keyof typeof formik.errors) => {
    if (formik.touched[field] && formik.errors[field]) {
      return (
        <p className="text-xs text-red-600 mt-1">
          {formik.errors[field] as string}
        </p>
      );
    }
    return null;
  };

  return (
    <form
      onSubmit={formik.handleSubmit}
      className={cn("flex flex-col gap-6", className)}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Date */}
        <div className="space-y-2">
          <Label htmlFor="date">Date</Label>
          <Input
            id="date"
            type="date"
            name="date"
            value={formik.values.date}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            disabled={isLoading}
          />
          {renderError("date")}
        </div>

        {/* Farm */}
        <div className="space-y-2">
          <Label htmlFor="farm">Farm</Label>
          <Select
            name="farm"
            value={formik.values.farm}
            onValueChange={(value) => formik.setFieldValue("farm", value)}
            disabled={isLoading}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select farm" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="KAASI_19">KAASI_19</SelectItem>
              <SelectItem value="MATITAL">MATITAL</SelectItem>
              <SelectItem value="OTHER">OTHER</SelectItem>
            </SelectContent>
          </Select>
          {renderError("farm")}
        </div>

        {/* Chicken Eggs */}
        <div className="space-y-2">
          <Label htmlFor="chickenEggs">Chicken Eggs</Label>
          <Input
            id="chickenEggs"
            type="number"
            name="chickenEggs"
            placeholder="e.g. 13290"
            value={formik.values.chickenEggs}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            disabled={isLoading}
          />
          {renderError("chickenEggs")}
        </div>

        {/* Total Eggs */}
        <div className="space-y-2">
          <Label htmlFor="totalEggs">Total Eggs</Label>
          <Input
            id="totalEggs"
            type="number"
            name="totalEggs"
            placeholder="e.g. 13290"
            value={formik.values.totalEggs}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            disabled={isLoading}
          />
          {renderError("totalEggs")}
        </div>
      </div>

      {/* Notes */}
      <div className="space-y-2">
        <Label htmlFor="notes">Notes</Label>
        <Textarea
          id="notes"
          name="notes"
          placeholder="Any additional remarks..."
          value={formik.values.notes}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          disabled={isLoading}
          rows={3}
        />
        {renderError("notes")}
      </div>

      {/* Submit */}
      <div className="flex justify-end mt-4">
        <Button
          type="submit"
          disabled={isLoading || !formik.isValid || !formik.dirty}
        >
          {isLoading ? "Saving..." : "Save"}
        </Button>
      </div>

      {error && (
        <p className="text-sm text-red-600 text-center mt-4">{error}</p>
      )}
    </form>
  );
}

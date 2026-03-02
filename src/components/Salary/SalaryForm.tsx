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
import { Textarea } from "@/components/ui/TextArea";

// Validation schema
const validationSchema = Yup.object({
  employeeName: Yup.string().trim().required("Employee name is required"),
  designation: Yup.string().trim().required("Designation is required"),
  farm: Yup.string().oneOf(["MATITAL", "KAASI_19", "OTHER"]).optional(),
  total: Yup.number()
    .min(0, "Total cannot be negative")
    .required("Total salary amount is required"),
  advance: Yup.number().min(0, "Advance cannot be negative").optional(),
  salaryAmount: Yup.number()
    .min(0, "Salary paid cannot be negative")
    .required("Salary paid amount is required"),
  remarks: Yup.string().optional(),
});

interface SalaryFormProps {
  initialValues?: Partial<{
    date: string;
    createdAt: string;
    employeeName: string;
    designation: string;
    farm?: string;
    total: number | string;
    advance?: number | string;
    salaryAmount: number | string;
    remarks?: string;
  }>;
  onSubmit: (values: any) => Promise<void>;
  isLoading: boolean;
  error: string;
  className?: string;
}

export function SalaryForm({
  initialValues = {},
  onSubmit,
  isLoading,
  error,
  className,
}: SalaryFormProps) {
  const formik = useFormik({
    initialValues: {
      date: initialValues?.createdAt
        ? new Date(initialValues?.createdAt).toISOString().split("T")[0]
        : "",
      employeeName: initialValues.employeeName || "",
      designation: initialValues.designation || "",
      farm: initialValues.farm || "",
      total: initialValues.total ?? "",
      advance: initialValues.advance ?? "",
      salaryAmount: initialValues.salaryAmount ?? "",
      remarks: initialValues.remarks || "",
    },
    validationSchema,
    enableReinitialize: true,
    onSubmit: async (values) => {
      const submitValues = {
        ...values,
        total: Number(values.total),
        advance: values.advance ? Number(values.advance) : undefined,
        salaryAmount: Number(values.salaryAmount),
      };

      await onSubmit(submitValues);
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
        {/* Employee Name */}
        <div className="space-y-2">
          <Label htmlFor="employeeName">Employee Name *</Label>
          <Input
            id="employeeName"
            name="employeeName"
            placeholder="e.g. Ahmed Khan"
            value={formik.values.employeeName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            disabled={isLoading}
          />
          {renderError("employeeName")}
        </div>

        {/* Designation */}
        <div className="space-y-2">
          <Label htmlFor="designation">Designation *</Label>
          <Input
            id="designation"
            name="designation"
            placeholder="e.g. Farm Manager"
            value={formik.values.designation}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            disabled={isLoading}
          />
          {renderError("designation")}
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
              <SelectValue placeholder="Select farm (optional)" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="MATITAL">MATITAL</SelectItem>
              <SelectItem value="KAASI_19">KAASI_19</SelectItem>
              <SelectItem value="OTHER">OTHER</SelectItem>
            </SelectContent>
          </Select>
          {renderError("farm")}
        </div>

        {/* Total Salary */}
        <div className="space-y-2">
          <Label htmlFor="total">Total Salary (Rs.) *</Label>
          <Input
            id="total"
            type="number"
            step="0.01"
            name="total"
            placeholder="e.g. 75000"
            value={formik.values.total}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            disabled={isLoading}
          />
          {renderError("total")}
        </div>

        {/* Advance */}
        <div className="space-y-2">
          <Label htmlFor="advance">Advance Paid (Rs.)</Label>
          <Input
            id="advance"
            type="number"
            step="0.01"
            name="advance"
            placeholder="e.g. 10000"
            value={formik.values.advance}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            disabled={isLoading}
          />
          {renderError("advance")}
        </div>

        {/* Salary Amount Paid */}
        <div className="space-y-2">
          <Label htmlFor="salaryAmount">Salary Paid (Rs.) *</Label>
          <Input
            id="salaryAmount"
            type="number"
            step="0.01"
            name="salaryAmount"
            placeholder="e.g. 65000"
            value={formik.values.salaryAmount}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            disabled={isLoading}
          />
          {renderError("salaryAmount")}
        </div>

        {/* Remarks */}
        <div className="space-y-2 md:col-span-2">
          <Label htmlFor="remarks">Remarks / Notes</Label>
          <Textarea
            id="remarks"
            name="remarks"
            placeholder="e.g. Paid via cash, includes bonus..."
            value={formik.values.remarks}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            disabled={isLoading}
            rows={3}
          />
          {renderError("remarks")}
        </div>
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

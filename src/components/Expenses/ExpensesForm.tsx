import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useEffect } from "react";
import { Textarea } from "../ui/TextArea";
import type { IExpense } from "@/@types/expenseTypes";

const validationSchema = Yup.object({
  expenseDate: Yup.date()
    .required("Expense date is required")
    .typeError("Invalid date format"),
  challan: Yup.string().optional(),
  transId: Yup.string().optional(),
  farm: Yup.string()
    .oneOf(["MATITAL", "KAASI_19", "OTHER"], "Invalid farm")
    .required("Farm is required"),
  expenseCost: Yup.number()
    .positive("Cost must be positive")
    .required("Expense cost is required"),
  head: Yup.string()
    .oneOf(
      [
        "CHICKEN",
        "FEED",
        "RENT",
        "UTILITIES",
        "PACKING_MATERIAL",
        "TP",
        "SALARIES_PAYMENTS",
        "MESS",
        "POWER_ELECTRIC",
        "POL",
        "MEDICINE",
        "VACCINE",
        "REPAIR_MAINTENANCE",
        "TRAVELLING_LOGISTICS",
        "OFFICE_EXPENSES",
        "MEETING_REFRESHMENT",
        "FURNITURE_FIXTURE",
        "COMPUTER_DEVICES",
        "PROFESSIONAL_FEE",
        "MISCELLANEOUS",
        "SHAREHOLDERS_DIVIDEND",
        "OTHER",
      ],
      "Invalid expense head",
    )
    .required("Head is required"),
  notes: Yup.string().optional(),
});

interface ExpenseFormProps {
  className?: string;
  expense?: IExpense;
  onSubmit: (values: any) => Promise<void>;
  isLoading: boolean;
  error: string;
}

export function ExpenseForm(props: ExpenseFormProps) {
  const formik = useFormik({
    initialValues: {
      expenseDate: props.expense?.expenseDate
        ? new Date(props.expense?.expenseDate).toISOString().split("T")[0]
        : "",
      month: props?.expense?.month || "",
      challan: props?.expense?.challan || "",
      transId: props?.expense?.transId || "",
      farm: props?.expense?.farm || "",
      expenseCost: props?.expense?.expenseCost || "",
      head: props?.expense?.head || "",
      notes: props?.expense?.notes || "",
    },
    validationSchema,
    enableReinitialize: true,
    onSubmit: async (values) => {
      console.log("Submitting expense:", values);
      await props.onSubmit(values);
      formik.resetForm();
    },
  });

  useEffect(() => {
    if (!props.isLoading && !props.error && formik.submitCount > 0) {
      // Optional: handle success (e.g. close modal from parent)
    }
  }, [props.isLoading, props.error, formik.submitCount]);

  return (
    <form
      onSubmit={formik.handleSubmit}
      className={cn("flex flex-col gap-5", props.className)}
    >
      <FieldGroup className="space-y-5">
        {/* Expense Date */}
        <Field>
          <FieldLabel htmlFor="expenseDate">Expense Date</FieldLabel>
          <Input
            id="expenseDate"
            name="expenseDate"
            type="date"
            value={formik.values.expenseDate}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            disabled={props.isLoading}
          />
          {formik.touched.expenseDate && formik.errors.expenseDate && (
            <p className="text-xs text-red-600 mt-1">
              {typeof formik.errors.expenseDate === "string"
                ? formik.errors.expenseDate
                : "Invalid date"}
            </p>
          )}
        </Field>

        {/* Challan + Trans ID */}
        <div className="grid grid-cols-2 gap-4">
          <Field>
            <FieldLabel htmlFor="challan">Challan (optional)</FieldLabel>
            <Input
              id="challan"
              name="challan"
              placeholder="748"
              value={formik.values.challan}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              disabled={props.isLoading}
            />
          </Field>

          <Field>
            <FieldLabel htmlFor="transId">Trans ID (optional)</FieldLabel>
            <Input
              id="transId"
              name="transId"
              placeholder="Arafat Adeel"
              value={formik.values.transId}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              disabled={props.isLoading}
            />
          </Field>
        </div>

        {/* Farm – already a select */}
        <Field>
          <FieldLabel htmlFor="farm">Farm</FieldLabel>
          <select
            id="farm"
            name="farm"
            value={formik.values.farm}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            disabled={props.isLoading}
            className={cn(
              "flex h-9 w-full rounded-md border border-input bg-background px-3 py-1.5 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
            )}
          >
            <option value="">Select farm</option>
            <option value="MATITAL">MATITAL</option>
            <option value="KAASI_19">KAASI_19</option>
            <option value="OTHER">OTHER</option>
          </select>
          {formik.touched.farm && formik.errors.farm && (
            <p className="text-xs text-red-600 mt-1">
              {typeof formik.errors.farm === "string"
                ? formik.errors.farm
                : "Invalid farm"}
            </p>
          )}
        </Field>

        {/* Expense Cost */}
        <Field>
          <FieldLabel htmlFor="expenseCost">Expense Cost</FieldLabel>
          <Input
            id="expenseCost"
            name="expenseCost"
            type="number"
            step="0.01"
            value={formik.values.expenseCost}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            disabled={props.isLoading}
          />
          {formik.touched.expenseCost && formik.errors.expenseCost && (
            <p className="text-xs text-red-600 mt-1">
              {typeof formik.errors.expenseCost === "string"
                ? formik.errors.expenseCost
                : "Invalid cost"}
            </p>
          )}
        </Field>

        {/* Head – already a select */}
        <Field>
          <FieldLabel htmlFor="head">Expense Head</FieldLabel>
          <select
            id="head"
            name="head"
            value={formik.values.head}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            disabled={props.isLoading}
            className={cn(
              "flex h-9 w-full rounded-md border border-input bg-background px-3 py-1.5 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
            )}
          >
            <option value="">Select head</option>
            {[
              "CHICKEN",
              "FEED",
              "RENT",
              "UTILITIES",
              "PACKING_MATERIAL",
              "TP",
              "SALARIES_PAYMENTS",
              "MESS",
              "POWER_ELECTRIC",
              "POL",
              "MEDICINE",
              "VACCINE",
              "REPAIR_MAINTENANCE",
              "TRAVELLING_LOGISTICS",
              "OFFICE_EXPENSES",
              "MEETING_REFRESHMENT",
              "FURNITURE_FIXTURE",
              "COMPUTER_DEVICES",
              "PROFESSIONAL_FEE",
              "MISCELLANEOUS",
              "SHAREHOLDERS_DIVIDEND",
              "OTHER",
            ].map((h) => (
              <option key={h} value={h}>
                {h.replace(/_/g, " ")} {/* optional: make display nicer */}
              </option>
            ))}
          </select>
          {formik.touched.head && formik.errors.head && (
            <p className="text-xs text-red-600 mt-1">
              {typeof formik.errors.head === "string"
                ? formik.errors.head
                : "Invalid head"}
            </p>
          )}
        </Field>

        {/* Notes */}
        <Field>
          <FieldLabel htmlFor="notes">Notes (optional)</FieldLabel>
          <Textarea
            id="notes"
            name="notes"
            placeholder="Additional details..."
            value={formik.values.notes}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            disabled={props.isLoading}
            rows={2}
          />
        </Field>

        {/* Actions */}
        <div className="flex justify-end gap-3 mt-4">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => formik.resetForm()}
            disabled={props.isLoading}
          >
            Reset
          </Button>
          <Button
            type="submit"
            size="sm"
            disabled={props.isLoading || !formik.isValid || !formik.dirty}
          >
            {props.isLoading ? "Saving..." : "Save"}
          </Button>
        </div>

        {/* Server-side error */}
        {props.error && (
          <p className="text-sm text-red-600 text-center mt-3">{props.error}</p>
        )}
      </FieldGroup>
    </form>
  );
}

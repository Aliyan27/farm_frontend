import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Textarea } from "../ui/TextArea";

// Validation schema matching your backend Zod schema
const validationSchema = Yup.object({
  expenseDate: Yup.date()
    .required("Expense date is required")
    .typeError("Invalid date format"),
  month: Yup.string()
    .length(3, "Month must be 3 characters (e.g. Jan)")
    .optional(),
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
  onSubmit: (values: any) => void;
  isLoading: boolean;
  error: string;
}

export function ExpenseForm(props: ExpenseFormProps) {
  const formik = useFormik({
    initialValues: {
      expenseDate: "",
      month: "",
      challan: "",
      transId: "",
      farm: "",
      expenseCost: "",
      head: "",
      notes: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      console.log("create expense ===>", values);
      props.onSubmit(values);
      formik.resetForm();
    },
  });

  return (
    <form
      onSubmit={formik.handleSubmit}
      className={cn("flex flex-col gap-6", props.className)}
    >
      <FieldGroup>
        <div className="flex flex-col items-center gap-1 text-center">
          <h1 className="text-2xl font-bold">Add New Expense</h1>
          <p className="text-muted-foreground text-sm text-balance">
            Enter the details of the expense below
          </p>
        </div>

        {/* Expense Date */}
        <Field>
          <FieldLabel htmlFor="expenseDate">Expense Date</FieldLabel>
          <Input
            id="expenseDate"
            name="expenseDate"
            type="date"
            required
            value={formik.values.expenseDate}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            disabled={props.isLoading}
          />
          {formik.touched.expenseDate && formik.errors.expenseDate ? (
            <p className="text-sm text-red-600 mt-1">
              {formik.errors.expenseDate}
            </p>
          ) : null}
        </Field>

        {/* Month (optional) */}
        <Field>
          <FieldLabel htmlFor="month">Month (optional)</FieldLabel>
          <Input
            id="month"
            name="month"
            placeholder="Jan"
            value={formik.values.month}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            disabled={props.isLoading}
          />
          {formik.touched.month && formik.errors.month ? (
            <p className="text-sm text-red-600 mt-1">{formik.errors.month}</p>
          ) : null}
        </Field>

        {/* Challan & Trans ID (optional) */}
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

        {/* Farm */}
        <Field>
          <FieldLabel htmlFor="farm">Farm</FieldLabel>
          <select
            id="farm"
            name="farm"
            required
            value={formik.values.farm}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            disabled={props.isLoading}
            className={cn(
              "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
            )}
          >
            <option value="">Select farm</option>
            <option value="MATITAL">MATITAL</option>
            <option value="KAASI_19">KAASI_19</option>
            <option value="OTHER">OTHER</option>
          </select>
          {formik.touched.farm && formik.errors.farm ? (
            <p className="text-sm text-red-600 mt-1">{formik.errors.farm}</p>
          ) : null}
        </Field>

        {/* Expense Cost */}
        <Field>
          <FieldLabel htmlFor="expenseCost">Expense Cost</FieldLabel>
          <Input
            id="expenseCost"
            name="expenseCost"
            type="number"
            placeholder="105600"
            required
            value={formik.values.expenseCost}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            disabled={props.isLoading}
          />
          {formik.touched.expenseCost && formik.errors.expenseCost ? (
            <p className="text-sm text-red-600 mt-1">
              {formik.errors.expenseCost}
            </p>
          ) : null}
        </Field>

        {/* Head */}
        <Field>
          <FieldLabel htmlFor="head">Expense Head</FieldLabel>
          <select
            id="head"
            name="head"
            required
            value={formik.values.head}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            disabled={props.isLoading}
            className={cn(
              "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
            )}
          >
            <option value="">Select head</option>
            <option value="CHICKEN">CHICKEN</option>
            <option value="FEED">FEED</option>
            <option value="RENT">RENT</option>
            <option value="UTILITIES">UTILITIES</option>
            <option value="PACKING_MATERIAL">PACKING_MATERIAL</option>
            <option value="TP">TP</option>
            <option value="SALARIES_PAYMENTS">SALARIES_PAYMENTS</option>
            <option value="MESS">MESS</option>
            <option value="POWER_ELECTRIC">POWER_ELECTRIC</option>
            <option value="POL">POL</option>
            <option value="MEDICINE">MEDICINE</option>
            <option value="VACCINE">VACCINE</option>
            <option value="REPAIR_MAINTENANCE">REPAIR_MAINTENANCE</option>
            <option value="TRAVELLING_LOGISTICS">TRAVELLING_LOGISTICS</option>
            <option value="OFFICE_EXPENSES">OFFICE_EXPENSES</option>
            <option value="MEETING_REFRESHMENT">MEETING_REFRESHMENT</option>
            <option value="FURNITURE_FIXTURE">FURNITURE_FIXTURE</option>
            <option value="COMPUTER_DEVICES">COMPUTER_DEVICES</option>
            <option value="PROFESSIONAL_FEE">PROFESSIONAL_FEE</option>
            <option value="MISCELLANEOUS">MISCELLANEOUS</option>
            <option value="SHAREHOLDERS_DIVIDEND">SHAREHOLDERS_DIVIDEND</option>
            <option value="OTHER">OTHER</option>
          </select>
          {formik.touched.head && formik.errors.head ? (
            <p className="text-sm text-red-600 mt-1">{formik.errors.head}</p>
          ) : null}
        </Field>

        {/* Notes (optional) */}
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
            rows={3}
          />
        </Field>

        {/* Submit Button */}
        <Field>
          <Button type="submit" disabled={props.isLoading || !formik.isValid}>
            {props.isLoading ? "Adding expense..." : "Add Expense"}
          </Button>
        </Field>

        {/* Error Message */}
        {props.error && (
          <p className="text-sm text-red-600 text-center">{props.error}</p>
        )}
      </FieldGroup>
    </form>
  );
}

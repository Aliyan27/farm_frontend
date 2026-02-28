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
import type { IEggSale } from "@/@types/eggSaleTypes";

const validationSchema = Yup.object({
  saleDate: Yup.string()
    .required("Sale date is required")
    .matches(/^\d{4}-\d{2}-\d{2}$/, "Invalid date format (YYYY-MM-DD)"),
  challanNumber: Yup.string().optional(),
  farm: Yup.string()
    .oneOf(["MATITAL", "KAASI_19", "OTHER"])
    .required("Farm is required"),
  eggsSold: Yup.number()
    .integer("Must be a whole number")
    .min(0, "Cannot be negative")
    .optional(), // optional, backend defaults to 0
  pricePerEgg: Yup.number().min(0, "Price cannot be negative").optional(),
  totalAmount: Yup.number()
    .min(0, "Total amount cannot be negative")
    .optional(),
  amountReceived: Yup.number()
    .min(0, "Amount received cannot be negative")
    .required("Amount received is required"),
  paymentDue: Yup.number().min(0, "Payment due cannot be negative").optional(),
  notes: Yup.string().optional(),
  type: Yup.string().optional(),
});

interface EggSaleFormProps {
  initialValues?: IEggSale;
  onSubmit: (values: any) => Promise<void>;
  isLoading: boolean;
  error: string;
  className?: string;
}

export function EggSaleForm({
  initialValues,
  onSubmit,
  isLoading,
  error,
  className,
}: EggSaleFormProps) {
  const formik = useFormik({
    initialValues: {
      saleDate: initialValues?.saleDate
        ? new Date(initialValues?.saleDate).toISOString().split("T")[0]
        : "",
      challanNumber: initialValues?.challanNumber || "",
      farm: initialValues?.farm || "",
      eggsSold: initialValues?.eggsSold || "",
      pricePerEgg: initialValues?.pricePerEgg || "",
      totalAmount: initialValues?.totalAmount || "",
      amountReceived: initialValues?.amountReceived || "",
      paymentDue: initialValues?.paymentDue || "",
      notes: initialValues?.notes || "",
      type: initialValues?.type || "",
    },
    validationSchema,
    enableReinitialize: true,
    onSubmit: async (values) => {
      const submitValues = {
        ...values,
        saleDate: new Date(values.saleDate).toISOString(),
        eggsSold: values.eggsSold ? Number(values.eggsSold) : 0,
        pricePerEgg: values.pricePerEgg
          ? Number(values.pricePerEgg)
          : undefined,
        totalAmount: values.totalAmount
          ? Number(values.totalAmount)
          : undefined,
        amountReceived: Number(values.amountReceived),
        paymentDue: values.paymentDue ? Number(values.paymentDue) : undefined,
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
        {/* Sale Date */}
        <div className="space-y-2">
          <Label htmlFor="saleDate">Sale Date *</Label>
          <Input
            id="saleDate"
            type="date"
            name="saleDate"
            value={formik.values.saleDate}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            disabled={isLoading}
          />
          {renderError("saleDate")}
        </div>

        {/* Challan Number */}
        <div className="space-y-2">
          <Label htmlFor="challanNumber">Challan Number</Label>
          <Input
            id="challanNumber"
            name="challanNumber"
            placeholder="e.g. 1031"
            value={formik.values.challanNumber}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            disabled={isLoading}
          />
          {renderError("challanNumber")}
        </div>

        {/* Farm */}
        <div className="space-y-2">
          <Label htmlFor="farm">Farm *</Label>
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
              <SelectItem value="MATITAL">MATITAL</SelectItem>
              <SelectItem value="KAASI_19">KAASI_19</SelectItem>
              <SelectItem value="OTHER">OTHER</SelectItem>
            </SelectContent>
          </Select>
          {renderError("farm")}
        </div>

        {/* Eggs Sold */}
        <div className="space-y-2">
          <Label htmlFor="eggsSold">Eggs Sold</Label>
          <Input
            id="eggsSold"
            type="number"
            name="eggsSold"
            placeholder="e.g. 500"
            value={formik.values.eggsSold}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            disabled={isLoading}
          />
          {renderError("eggsSold")}
        </div>

        {/* Price per Egg */}
        <div className="space-y-2">
          <Label htmlFor="pricePerEgg">Price per Egg (Rs.)</Label>
          <Input
            id="pricePerEgg"
            type="number"
            step="0.01"
            name="pricePerEgg"
            placeholder="e.g. 15.50"
            value={formik.values.pricePerEgg}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            disabled={isLoading}
          />
          {renderError("pricePerEgg")}
        </div>

        {/* Total Amount */}
        <div className="space-y-2">
          <Label htmlFor="totalAmount">Total Amount (Rs.)</Label>
          <Input
            id="totalAmount"
            type="number"
            step="0.01"
            name="totalAmount"
            placeholder="e.g. 7500"
            value={formik.values.totalAmount}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            disabled={isLoading}
          />
          {renderError("totalAmount")}
        </div>

        {/* Amount Received */}
        <div className="space-y-2">
          <Label htmlFor="amountReceived">Amount Received (Rs.) *</Label>
          <Input
            id="amountReceived"
            type="number"
            step="0.01"
            name="amountReceived"
            placeholder="e.g. 5000"
            value={formik.values.amountReceived}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            disabled={isLoading}
          />
          {renderError("amountReceived")}
        </div>

        {/* Payment Due */}
        <div className="space-y-2">
          <Label htmlFor="paymentDue">Payment Due (Rs.)</Label>
          <Input
            id="paymentDue"
            type="number"
            step="0.01"
            name="paymentDue"
            placeholder="e.g. 2500"
            value={formik.values.paymentDue}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            disabled={isLoading}
          />
          {renderError("paymentDue")}
        </div>

        {/* Notes */}
        <div className="space-y-2 md:col-span-2">
          <Label htmlFor="notes">Notes</Label>
          <Textarea
            id="notes"
            name="notes"
            placeholder="Any additional remarks (e.g. payment terms)..."
            value={formik.values.notes}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            disabled={isLoading}
            rows={3}
          />
          {renderError("notes")}
        </div>

        {/* Type */}
        <div className="space-y-2">
          <Label htmlFor="type">Type</Label>
          <Input
            id="type"
            name="type"
            placeholder="e.g. Eggs"
            value={formik.values.type}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            disabled={isLoading}
          />
          {renderError("type")}
        </div>
      </div>

      {/* Submit */}
      <div className="flex justify-end mt-4">
        <Button type="submit" disabled={isLoading || !formik.isValid}>
          {isLoading ? "Saving..." : "Save Sale"}
        </Button>
      </div>

      {error && (
        <p className="text-sm text-red-600 text-center mt-4">{error}</p>
      )}
    </form>
  );
}

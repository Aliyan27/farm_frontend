import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { format } from "date-fns";
import { AppMessage } from "@/constants/AppMessage";
import { AxiosError } from "axios";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getErrorDataCase = (e: unknown): string => {
  try {
    if (e instanceof AxiosError) {
      if (e.response?.data?.result) {
        return String(e.response.data.result);
      }

      // Common backend pattern: { message: "..." }
      if (e.response?.data?.message) {
        return String(e.response.data.message);
      }

      // Axios error message
      if (e.message) {
        return e.message;
      }
    }

    // Non-Axios errors
    if (e instanceof Error) {
      return e.message;
    }

    return AppMessage.requestFailed;
  } catch {
    return AppMessage.requestFailed;
  }
};

// Type for your backend report (adjust as needed)
interface IncomeStatementReport {
  period: string;
  grossRevenue: number;
  otherIncome: number;
  totalRevenue: number;
  cogs: {
    chicken: number;
    feed: number;
    medicine: number;
    vaccine: number;
    total: number;
  };
  operatingExpenses: {
    rent: number;
    utilities: number;
    salariesPayments: number;
    mess: number;
    powerElectric: number;
    pol: number;
    packingMaterial: number;
    repairMaintenance: number;
    officeExpenses: number;
    meetingRefreshment: number;
    travellingLogistics: number;
    miscellaneous: number;
    total: number;
  };
  totalExpenses: number;
  netIncome: number;
  notes: string;
}

export const generateIncomeStatementPdf = (report: IncomeStatementReport) => {
  const doc = new jsPDF();

  // Header
  doc.setFontSize(18);
  doc.text("Income Statement", 105, 15, { align: "center" });
  doc.setFontSize(12);
  doc.text(report.period, 105, 25, { align: "center" });
  doc.setLineWidth(0.5);
  doc.line(10, 30, 200, 30);

  let y = 40;

  // Revenue Section
  doc.setFontSize(14);
  doc.text("Revenue", 15, y);
  y += 8;
  doc.setFontSize(11);
  autoTable(doc, {
    startY: y,
    head: [["Description", "Amount (Rs.)"]],
    body: [
      ["Gross Revenue", report.grossRevenue.toLocaleString()],
      ["Other Income", report.otherIncome.toLocaleString()],
      [
        "Total Revenue",
        {
          content: report.totalRevenue.toLocaleString(),
          styles: { fontStyle: "bold" },
        },
      ],
    ],
    theme: "grid",
    styles: { cellPadding: 3, fontSize: 10 },
    headStyles: { fillColor: [66, 139, 202] },
    columnStyles: { 0: { cellWidth: 120 } },
  });
  y = (doc as any).lastAutoTable.finalY + 10;

  // COGS
  doc.setFontSize(14);
  doc.text("Cost of Goods Sold", 15, y);
  y += 8;
  autoTable(doc, {
    startY: y,
    head: [["Item", "Amount (Rs.)"]],
    body: [
      ["Chicken", report.cogs.chicken.toLocaleString()],
      ["Feed", report.cogs.feed.toLocaleString()],
      ["Medicine", report.cogs.medicine.toLocaleString()],
      ["Vaccine", report.cogs.vaccine.toLocaleString()],
      [
        "Total COGS",
        {
          content: report.cogs.total.toLocaleString(),
          styles: { fontStyle: "bold" },
        },
      ],
    ],
    theme: "grid",
    styles: { cellPadding: 3, fontSize: 10 },
    headStyles: { fillColor: [220, 53, 69] },
    columnStyles: { 0: { cellWidth: 120 } },
  });
  y = (doc as any).lastAutoTable.finalY + 10;

  // Operating Expenses (long list – use smaller font)
  doc.setFontSize(14);
  doc.text("Operating Expenses", 15, y);
  y += 8;
  autoTable(doc, {
    startY: y,
    head: [["Expense", "Amount (Rs.)"]],
    body: [
      ["Rent", report.operatingExpenses.rent.toLocaleString()],
      ["Utilities", report.operatingExpenses.utilities.toLocaleString()],
      [
        "Salaries Payments",
        report.operatingExpenses.salariesPayments.toLocaleString(),
      ],
      ["Mess", report.operatingExpenses.mess.toLocaleString()],
      [
        "Power/Electric",
        report.operatingExpenses.powerElectric.toLocaleString(),
      ],
      ["POL", report.operatingExpenses.pol.toLocaleString()],
      [
        "Packing Material",
        report.operatingExpenses.packingMaterial.toLocaleString(),
      ],
      [
        "Repair & Maintenance",
        report.operatingExpenses.repairMaintenance.toLocaleString(),
      ],
      [
        "Office Expenses",
        report.operatingExpenses.officeExpenses.toLocaleString(),
      ],
      [
        "Meeting Refreshment",
        report.operatingExpenses.meetingRefreshment.toLocaleString(),
      ],
      [
        "Travelling & Logistics",
        report.operatingExpenses.travellingLogistics.toLocaleString(),
      ],
      [
        "Miscellaneous",
        report.operatingExpenses.miscellaneous.toLocaleString(),
      ],
      [
        "Total Operating Expenses",
        {
          content: report.operatingExpenses.total.toLocaleString(),
          styles: { fontStyle: "bold" },
        },
      ],
    ],
    theme: "grid",
    styles: { cellPadding: 2, fontSize: 9 },
    headStyles: { fillColor: [220, 53, 69] },
    columnStyles: { 0: { cellWidth: 120 } },
  });
  y = (doc as any).lastAutoTable.finalY + 15;

  // Summary Totals
  doc.setFontSize(14);
  doc.text("Summary", 15, y);
  y += 8;
  autoTable(doc, {
    startY: y,
    head: [["Description", "Amount (Rs.)"]],
    body: [
      ["Total Expenses", report.totalExpenses.toLocaleString()],
      [
        "Net Income",
        {
          content: report.netIncome.toLocaleString(),
          styles: {
            fontStyle: "bold",
            textColor: report.netIncome >= 0 ? [0, 128, 0] : [220, 53, 69],
          },
        },
      ],
    ],
    theme: "grid",
    styles: { cellPadding: 3, fontSize: 11 },
    headStyles: { fillColor: [40, 167, 69] },
    columnStyles: { 0: { cellWidth: 120 } },
  });
  y = (doc as any).lastAutoTable.finalY + 10;

  // Notes
  doc.setFontSize(11);
  doc.setTextColor(100);
  doc.text(`Notes: ${report.notes}`, 15, y);

  // Footer
  const pageCount = (doc as any).internal.getNumberOfPages();
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.setFontSize(9);
    doc.setTextColor(100);
    doc.text(
      `Generated on ${format(new Date(), "dd MMM yyyy HH:mm")} | Page ${i} of ${pageCount}`,
      105,
      290,
      { align: "center" },
    );
  }

  // Download
  doc.save(`Income_Statement_${format(new Date(), "yyyy-MM-dd")}.pdf`);
};

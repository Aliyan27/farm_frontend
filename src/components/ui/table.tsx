import * as React from "react";
import { cn } from "@/lib/utils";

// ────────────────────────────────────────────────
// Table (root container)
const Table = React.forwardRef<
  HTMLTableElement,
  React.HTMLAttributes<HTMLTableElement>
>(({ className, ...props }, ref) => (
  <div className="relative w-full overflow-auto rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-sm">
    <table
      ref={ref}
      className={cn("w-full caption-bottom text-sm", className)}
      {...props}
    />
  </div>
));
Table.displayName = "Table";

// ────────────────────────────────────────────────
// TableHeader (thead)
const TableHeader = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <thead
    ref={ref}
    className={cn(
      "bg-zinc-50 dark:bg-zinc-900 [&_tr]:border-b [&_tr]:border-zinc-200 dark:[&_tr]:border-zinc-800",
      className
    )}
    {...props}
  />
));
TableHeader.displayName = "TableHeader";

// ────────────────────────────────────────────────
// TableBody (tbody)
const TableBody = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <tbody
    ref={ref}
    className={cn(
      "bg-white dark:bg-zinc-900 [&_tr:last-child]:border-0",
      className
    )}
    {...props}
  />
));
TableBody.displayName = "TableBody";

// ────────────────────────────────────────────────
// TableRow (tr)
const TableRow = React.forwardRef<
  HTMLTableRowElement,
  React.HTMLAttributes<HTMLTableRowElement>
>(({ className, ...props }, ref) => (
  <tr
    ref={ref}
    className={cn(
      "border-b border-zinc-100 dark:border-zinc-800 transition-colors",
      "hover:bg-zinc-50/80 dark:hover:bg-zinc-800/50",
      "data-[state=selected]:bg-amber-50/60 dark:data-[state=selected]:bg-amber-950/20",
      className
    )}
    {...props}
  />
));
TableRow.displayName = "TableRow";

// ────────────────────────────────────────────────
// TableHead (th)
const TableHead = React.forwardRef<
  HTMLTableCellElement,
  React.ThHTMLAttributes<HTMLTableCellElement>
>(({ className, ...props }, ref) => (
  <th
    ref={ref}
    className={cn(
      "h-11 px-4 text-left align-middle",
      "text-[11px] font-semibold uppercase tracking-widest text-zinc-400 dark:text-zinc-500",
      "[&:has([role=checkbox])]:pr-0",
      className
    )}
    {...props}
  />
));
TableHead.displayName = "TableHead";

// ────────────────────────────────────────────────
// TableCell (td)
const TableCell = React.forwardRef<
  HTMLTableCellElement,
  React.TdHTMLAttributes<HTMLTableCellElement>
>(({ className, ...props }, ref) => (
  <td
    ref={ref}
    className={cn(
      "px-4 py-3.5 align-middle text-sm text-zinc-700 dark:text-zinc-300",
      "[&:has([role=checkbox])]:pr-0",
      className
    )}
    {...props}
  />
));
TableCell.displayName = "TableCell";

// ────────────────────────────────────────────────
// TableFooter (tfoot) — bonus addition for totals rows
const TableFooter = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <tfoot
    ref={ref}
    className={cn(
      "border-t border-zinc-200 dark:border-zinc-800",
      "bg-zinc-50 dark:bg-zinc-900",
      "[&_td]:py-3.5 [&_td]:font-semibold [&_td]:text-zinc-800 dark:[&_td]:text-zinc-100",
      className
    )}
    {...props}
  />
));
TableFooter.displayName = "TableFooter";

// ────────────────────────────────────────────────
// TableCaption
const TableCaption = React.forwardRef<
  HTMLTableCaptionElement,
  React.HTMLAttributes<HTMLTableCaptionElement>
>(({ className, ...props }, ref) => (
  <caption
    ref={ref}
    className={cn(
      "mt-3 text-xs text-zinc-400 dark:text-zinc-500 text-center",
      className
    )}
    {...props}
  />
));
TableCaption.displayName = "TableCaption";

// ────────────────────────────────────────────────
export {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableRow,
  TableHead,
  TableCell,
  TableCaption,
};
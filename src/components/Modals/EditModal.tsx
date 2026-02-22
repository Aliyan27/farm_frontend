import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { ReactNode } from "react";

interface EditExpenseModalProps {
  open: boolean;
  title: string;
  desc: string;
  onOpenChange: (open: boolean) => void;
  children: ReactNode;
}

export function EditModal({
  title,
  desc,
  open,
  onOpenChange,
  children,
}: EditExpenseModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md p-4 max-h-[90vh] flex flex-col">
        {/* Header - fixed, non-scrolling */}
        <DialogHeader className="space-y-1 pb-3 border-b">
          <DialogTitle className="text-lg font-semibold">{title}</DialogTitle>
          <DialogDescription className="text-xs text-muted-foreground">
            {desc}
          </DialogDescription>
        </DialogHeader>

        {/* Scrollable Form Area */}
        <div className="flex-1 overflow-y-auto py-4 pr-2 scrollbar-thin scrollbar-thumb-muted-foreground/30 scrollbar-track-transparent">
          {children}
        </div>
      </DialogContent>
    </Dialog>
  );
}

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface ConfirmationPoppupProps {
  title: string;
  desc: string;
  open: boolean;
  onClick: (flag: boolean) => void;
}

export function ConfirmationPoppup(props: ConfirmationPoppupProps) {
  return (
    <Dialog open={props.open} onOpenChange={props.onClick}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-destructive">{props.title}</DialogTitle>
          <DialogDescription>
            {props.desc}
            <br />
            <span className="text-xs mt-1 text-muted-foreground mt-1 block">
              This action cannot be undone.
            </span>
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className="gap-3 mt-6">
          <Button variant="outline" onClick={() => props.onClick(false)}>
            Cancel
          </Button>
          <Button variant="destructive" onClick={() => props.onClick(true)}>
            "Yes, Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

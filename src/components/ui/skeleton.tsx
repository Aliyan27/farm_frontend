import * as React from "react";

import { cn } from "@/lib/utils";

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Optional variant for different shapes
   */
  variant?: "rect" | "circle" | "text";
  /**
   * Optional animation speed (default: pulse)
   */
  animation?: "pulse" | "none";
}

function Skeleton({
  className,
  variant = "rect",
  animation = "pulse",
  ...props
}: SkeletonProps) {
  return (
    <div
      className={cn(
        "rounded-md bg-muted/60",
        animation === "pulse" && "animate-pulse",
        variant === "circle" && "rounded-full",
        variant === "text" && "h-4 rounded",
        className,
      )}
      {...props}
    />
  );
}

export { Skeleton };

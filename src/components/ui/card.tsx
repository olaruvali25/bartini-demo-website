import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type CardProps = HTMLAttributes<HTMLDivElement>;

export function Card({ className, ...props }: CardProps) {
  return (
    <div
      className={cn(
        "rounded-3xl border border-white/12 bg-[rgba(14,14,14,0.72)] p-5 shadow-[0_16px_44px_rgba(0,0,0,0.35)] backdrop-blur-xl",
        className,
      )}
      {...props}
    />
  );
}

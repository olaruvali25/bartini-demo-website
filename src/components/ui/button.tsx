import type { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "secondary" | "ghost";
type ButtonSize = "sm" | "md" | "lg";

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "bg-[linear-gradient(120deg,var(--brand-red),#c9151d)] text-white shadow-[0_10px_40px_rgba(163,0,0,0.45)] hover:brightness-110",
  secondary:
    "border border-[var(--gold)]/65 bg-[rgba(14,14,14,0.7)] text-[var(--text)] hover:bg-[rgba(24,24,24,0.95)]",
  ghost:
    "border border-white/20 bg-white/5 text-[var(--text)] hover:bg-white/10",
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: "h-10 px-4 text-sm",
  md: "h-12 px-6 text-sm sm:text-base",
  lg: "h-14 px-7 text-base",
};

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
};

export function Button({
  className,
  variant = "primary",
  size = "md",
  type = "button",
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={cn(
        "group inline-flex items-center justify-center gap-2 rounded-2xl font-medium tracking-[0.02em] transition duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--gold)]/70 focus-visible:ring-offset-2 focus-visible:ring-offset-black disabled:pointer-events-none disabled:opacity-60",
        variantClasses[variant],
        sizeClasses[size],
        className,
      )}
      {...props}
    />
  );
}

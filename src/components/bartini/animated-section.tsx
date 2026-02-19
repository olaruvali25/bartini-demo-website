"use client";

import type { ReactNode } from "react";
import { motion, type HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

type AnimatedSectionProps = Omit<HTMLMotionProps<"section">, "children"> & {
  children: ReactNode;
};

export function AnimatedSection({
  children,
  className,
  ...props
}: AnimatedSectionProps) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 34 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.18 }}
      transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
      className={cn("relative", className)}
      {...props}
    >
      {children}
    </motion.section>
  );
}

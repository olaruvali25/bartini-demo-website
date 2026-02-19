"use client";

import { motion, useScroll } from "framer-motion";

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();

  return (
    <motion.div
      className="fixed inset-x-0 top-0 z-[90] h-[2px] origin-left bg-[linear-gradient(90deg,var(--brand-red),var(--gold),var(--brand-red))]"
      style={{ scaleX: scrollYProgress }}
    />
  );
}

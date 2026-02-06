"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export interface SectionProps {
  children: React.ReactNode;
  className?: string;
  containerClassName?: string;
  animate?: boolean;
  id?: string;
}

export function Section({
  children,
  className,
  containerClassName,
  animate = true,
  id,
}: SectionProps) {
  const Container = animate ? motion.section : "section";

  return (
    <Container
      id={id}
      className={cn("py-16 md:py-24", className)}
      {...(animate && {
        initial: { opacity: 0, y: 20 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, margin: "-100px" },
        transition: { duration: 0.5, ease: "easeOut" },
      })}
    >
      <div className={cn("container mx-auto px-4", containerClassName)}>
        {children}
      </div>
    </Container>
  );
}

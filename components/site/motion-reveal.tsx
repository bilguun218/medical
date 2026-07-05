"use client";

import { motion, type HTMLMotionProps } from "framer-motion";

export function MotionReveal(props: HTMLMotionProps<"div">) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.28, ease: [0.2, 0.8, 0.2, 1] }}
      {...props}
    />
  );
}

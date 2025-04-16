'use client';

import { motion } from 'framer-motion';

export function SquigglyArrow() {
  return (
    <motion.div
      className="absolute right-8 top-1/2 -translate-y-1/2"
      initial={{ x: 100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <motion.svg
        width="120"
        height="120"
        viewBox="0 0 120 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        animate={{
          x: [0, 10, 0],
          rotate: [0, 5, 0],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <path
          d="M20 60C20 60 40 30 60 60C80 90 100 60 100 60"
          stroke="#847158"
          strokeWidth="2"
          strokeLinecap="round"
          fill="none"
          className="opacity-40"
        />
        <path
          d="M85 50L100 60L85 70"
          stroke="#847158"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="opacity-40"
        />
      </motion.svg>
    </motion.div>
  );
} 
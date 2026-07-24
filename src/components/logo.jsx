"use client"
import React from 'react';
import { motion } from "framer-motion";

const Logo = ({ inversion }) => {
  return (
    <motion.span
      className={`logo ${inversion ? "inversion" : ""}`}
      initial="rest"
      whileHover="hover"
      animate="rest"
    >
      <span className="logo__word">
        VAGCLUB
      </span>

      <motion.span
        className="logo__digit"
        variants={{
          rest: { y: 0 },
          hover: {
            y: [0, -14, 0, -6, 0],
            transition: {
              duration: 0.45,
              ease: "easeInOut",
            },
          }
        }}
      >
        21
      </motion.span>
    </motion.span>
  );
};

export default Logo;

'use client'
import { motion } from "framer-motion";

const AnimateSection = ({ className, children, initial= {opacity: 0}, whileInView = {opacity: 1} }) => {
  return (
    <motion.section
      className={className}
      // initial={{ opacity: 0, y: 40 }}
      // whileInView={{ opacity: 1, y: 0 }}
      initial={initial}
      whileInView={whileInView}
      viewport={{ once: false, amount: 0.15 }}
      transition={{ duration: 0.85, ease: "easeInOut" }}
    >
      {children}
    </motion.section>
  );
};

export default AnimateSection;

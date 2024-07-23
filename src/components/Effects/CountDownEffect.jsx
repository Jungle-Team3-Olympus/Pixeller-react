import React from "react";
import { useEffect, useState } from "react";
import { motion, useAnimation, transform } from "framer-motion";

const CountDownEffect = ({ time, setCountDown }) => {
  const [timer, setTimer] = useState(5);

  setTimeout(() => {
    setTimer((prev) => prev - 1);
  }, 1000);

  return (
    <motion.div
      initial={{
        opacity: 1,
      }}
      animate={{
        opacity: 0,
      }}
      transition={{
        duration: 1,
        // ease: "easeInOut",
        
      }}
    >
      <div>{timer}</div>
    </motion.div>
  );
};

export default CountDownEffect;

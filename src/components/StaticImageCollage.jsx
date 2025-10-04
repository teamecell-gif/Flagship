import React from "react";
import { motion } from "framer-motion";

const StaticImageCollage = ({ images }) => {
  // Framer Motion is used here for a simple, on-load entrance animation.
  // There are no complex mouse-tracking effects.
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2, // Animate children one by one
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5 } },
  };

  return (
    // This container defines the shape and holds the images
    <motion.div
      className="relative w-full aspect-[4/3] max-w-lg mx-auto"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.5 }}
    >
      {/* Image 1: Back-left */}
      <motion.div
        className="absolute top-[10%] left-0 w-8/12"
        variants={itemVariants}
      >
        <img
          src={images[0]}
          alt="Event scene 1"
          className="w-full h-full object-cover rounded-xl shadow-lg border-4 border-gray-700/50"
        />
      </motion.div>

      {/* Image 2: Front-right */}
      <motion.div
        className="absolute bottom-[10%] right-0 w-7/12 z-10"
        variants={itemVariants}
      >
        <img
          src={images[1]}
          alt="Event scene 2"
          className="w-full h-full object-cover rounded-xl shadow-2xl border-4 border-gray-600/60"
        />
      </motion.div>

      {/* Image 3: Top-right */}
      <motion.div
        className="absolute top-0 right-[10%] w-6/12"
        variants={itemVariants}
      >
        <img
          src={images[2]}
          alt="Event scene 3"
          className="w-full h-full object-cover rounded-xl shadow-md border-4 border-gray-800/40"
        />
      </motion.div>
    </motion.div>
  );
};

export default StaticImageCollage;
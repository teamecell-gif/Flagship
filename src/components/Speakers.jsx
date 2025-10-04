import React from "react";
import { motion } from "framer-motion";
import { styles } from "../styles";
import { SectionWrapper } from "../hoc";
import { projects } from "../constants"; // You might want to rename this to 'speakers' in your constants file
import { fadeIn, textVariant } from "../utils/motion";
import SpotlightCard  from "./SpotlightCard.jsx";  // The curly braces {} mean it's a named import

// Renamed component from Works to Speakers
const Speakers = () => {
  return (
    <>
      {/* This is the new heading section */}
      <motion.div variants={textVariant()}>
        <p className={styles.sectionSubText}>Meet our lineup</p>
        <h2 className={styles.sectionHeadText}>Speakers.</h2>
      </motion.div>

      {/* This is your existing card grid */}
      <div className="mt-20 py-10 px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {projects.map((project, idx) => ( // Consider renaming 'projects' to 'speakers'
          <motion.div
            key={idx}
            variants={fadeIn("up", "spring", idx * 0.2, 0.75)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.25 }}
            whileHover={{ scale: 1.03, rotate: 1 }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
            className="h-full"
            tabIndex="0"
          >
            <SpotlightCard
              className="flex flex-col items-center p-6 bg-tertiary rounded-2xl h-full"
              spotlightColor="rgba(0, 229, 255, 0.2)"
            >
              <img
                src={project.image}
                alt={project.name}
                className="w-32 h-32 object-cover rounded-full border-4 border-secondary shadow-lg mb-4 transform hover:scale-105 transition-transform duration-300"
              />
              <h3 className="text-xl font-bold text-white mb-2 text-center drop-shadow-md">
                {project.name}
              </h3>
              <p className="text-base font-medium text-white text-center leading-relaxed px-3 py-2 rounded">
  {project.description}
</p>
            </SpotlightCard>
          </motion.div>
        ))}
      </div>
    </>
  );
};

// Update the export to use the new component name and add the ID "speakers"
export default SectionWrapper(Speakers, "speakers");

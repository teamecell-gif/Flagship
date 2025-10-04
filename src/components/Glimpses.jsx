import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "../index.css";
import { textVariant } from "../utils/motion";
import { styles } from "../styles";

// Media assets
import glimp2 from "../assets/IMG-20230913-WA0001.jpg";
import glimp3 from "../assets/IMG-20230913-WA0002.jpg";
import glimp4 from "../assets/IMG-20230913-WA0003.jpg";
import glimp5 from "../assets/IMG-20230913-WA0004.jpg";
import glimp6 from "../assets/IMG-20230913-WA0005.jpg";
import glimp7 from "../assets/IMG-20230913-WA0006.jpg";
import glimp8 from "../assets/IMG-20230913-WA0007.jpg";

const Glimpses = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState("right");

  const media = [
    { src: glimp2, type: "image" },
    { src: glimp3, type: "image" },
    { src: glimp4, type: "image" },
    { src: glimp5, type: "image" },
    { src: glimp6, type: "image" },
    { src: glimp7, type: "image" },
    { src: glimp8, type: "image" },
  ];

  const slideVariants = {
    hiddenRight: { x: "100%", opacity: 0 },
    hiddenLeft: { x: "-100%", opacity: 0 },
    visible: { x: "0", opacity: 1, transition: { duration: 0.5 } },
    exit: { opacity: 0, scale: 0.8, transition: { duration: 0.25 } },
  };

  const slidersVariants = {
    hover: { scale: 1.2, backgroundColor: "#000000" },
  };

  const handleNext = () => {
    setDirection("right");
    setCurrentIndex((prevIndex) =>
      prevIndex + 1 === media.length ? 0 : prevIndex + 1
    );
  };

  const handlePrevious = () => {
    setDirection("left");
    setCurrentIndex((prevIndex) =>
      prevIndex - 1 < 0 ? media.length - 1 : prevIndex - 1
    );
  };

  return (
    <div id="glimpses" className="my-8 pb-8 p-2">
      <motion.div variants={textVariant()}>
        <div className="text-center">
          <h2 className={styles.sectionHeadText}>GLIMPSES OF FLAGSHIP '24</h2>
        </div>
      </motion.div>

      {/* ✅ RESPONSIVE CONTAINER */}
      <div className="relative mx-auto mt-8 max-w-4xl aspect-[4/3] sm:aspect-video">
        <AnimatePresence>
          <motion.div
            key={currentIndex}
            className="absolute inset-0 flex items-center justify-center"
            initial={direction === "right" ? "hiddenRight" : "hiddenLeft"}
            animate="visible"
            exit="exit"
            variants={slideVariants}
          >
            {/* ✅ IMAGE FILLS CONTAINER */}
            <img
              src={media[currentIndex].src}
              alt={`Glimpse ${currentIndex + 1}`}
              className="h-full w-full object-contain"
            />
          </motion.div>
        </AnimatePresence>

        {/* ✅ ALIGNED & STYLED NAVIGATION ARROWS */}
        {/* Previous Button */}
        <motion.div
          variants={slidersVariants}
          whileHover="hover"
          className="absolute top-1/2 left-2 -translate-y-1/2 z-10 bg-black/40 rounded-full p-2 cursor-pointer transition-colors hover:bg-black/60"
          onClick={handlePrevious}
        >
          <svg xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 96 960 960" width="20" className="fill-white">
            <path d="M400 976 0 576l400-400 56 57-343 343 343 343-56 57Z" />
          </svg>
        </motion.div>

        {/* Next Button */}
        <motion.div
          variants={slidersVariants}
          whileHover="hover"
          className="absolute top-1/2 right-2 -translate-y-1/2 z-10 bg-black/40 rounded-full p-2 cursor-pointer transition-colors hover:bg-black/60"
          onClick={handleNext}
        >
          <svg xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 96 960 960" width="20" className="fill-white">
            <path d="m304 974-56-57 343-343-343-343 56-57 400 400-400 400Z" />
          </svg>
        </motion.div>
      </div>
    </div>
  );
};

export default Glimpses;
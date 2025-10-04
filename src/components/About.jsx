import React from "react";
import { motion } from "framer-motion";

// ✅ Import the new StaticImageCollage component
import StaticImageCollage from "./StaticImageCollage";

// Import your images
import flag1 from "../assets/flagship1.jpg";
import flag2 from "../assets/flagship2.jpg";
import flag3 from "../assets/flagship3.jpg";

const About = () => {
  const flagshipImages = [flag1, flag2, flag3];

  return (
    <section
      id="about"
      className="pt-12 px-6 sm:px-10 lg:pt-[120px] pb-12 lg:pb-[90px] overflow-hidden bg-[#131424]/30"
    >
      <div className="container mx-auto">
        <div className="flex flex-col lg:flex-row items-center justify-center gap-12 lg:justify-between">
          
          {/* ✅ Left Column: Using the new StaticImageCollage component */}
          <div className="w-full lg:w-6/12 flex justify-center">
            <StaticImageCollage images={flagshipImages} />
          </div>

          {/* Right Column: Text content */}
          <div className="w-full lg:w-5/12">
            <div className="text-center lg:text-left">
              <h2 className="block mb-4 text-3xl sm:text-4xl font-semibold text-white">
                About Flagship
              </h2>
              <p className="px-2 mb-8 text-justify text-base text-body-color">
                Flagship'25 is the inaugural event of the Entrepreneurship Cell of
                VNIT that aims to foster innovation, entrepreneurship, and
                leadership among young minds. This event marks the conclave of
                pioneering personalities that have proven themselves in
                different walks of life. Elite speakers who have demonstrated
                their expertise on the international stage and can inspire the
                crowd with their interactions are invited every year.
              </p>
              <a
                href="/#contact"
                className="inline-flex items-center justify-center px-10 py-4 text-base font-normal text-center text-white rounded-lg bg-blue-600 hover:bg-blue-700 transition-colors lg:px-8 xl:px-10"
              >
                Register Now
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
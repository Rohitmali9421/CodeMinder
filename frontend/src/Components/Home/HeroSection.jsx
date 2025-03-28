import React, { useRef } from "react";
import { motion } from "framer-motion";
import { ReactTyped } from "react-typed";
import curveImg from "../assets/curve.png";
import hero from "../assets/hv.mp4";

const HeroSection = () => {
  const parallaxRef = useRef(null);

  return (
    <section
      className="relative flex flex-col items-center justify-center h-screen w-screen fixed inset-0 text-center bg-cover bg-center bg-no-repeat overflow-hidden"
      ref={parallaxRef}
    >
      <video 
        autoPlay 
        loop 
        muted 
        playsInline
        className="absolute inset-0 w-full h-full object-cover opacity-80"
      >
        <source src={hero} type="video/mp4" />
      </video>

      {/* Main Content */}
      <motion.div
        initial={{ opacity: 0, y: -50, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="relative z-10 flex flex-col items-center max-w-4xl mx-auto p-6"
      >
        <h1 className="text-6xl sm:text-8xl font-extrabold bg-gradient-to-r from-yellow-400 via-red-500 to-purple-500 text-transparent bg-clip-text leading-tight animate-pulse">
          <ReactTyped
            className="font-bold"
            strings={["Elevate", "Optimize", "Conquer"]}
            typeSpeed={50}
            backSpeed={50}
            loop
          />
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, ease: "easeOut", delay: 0.5 }}
          className="text-xl font-bold sm:text-3xl text-white max-w-2xl mt-6 shadow-lg p-4 bg-opacity-30 bg-black rounded-lg"
        >
          A comprehensive platform for developers to monitor progress, visualize achievements, and connect with the coding community. <br />
          <span className="inline-block relative text-center">
            <span className="relative z-20 text-blue-400 font-extrabold text-2xl tracking-wide drop-shadow-lg">
              Code<span className="text-pink-500">Minder</span>
            </span>
            <motion.img
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.5, ease: "easeOut", delay: 1 }}
              src={curveImg}
              className="absolute top-full left-1 transform -translate-x-1/2 w-36"
              width="170"
              height="20"
              alt="Curve"
            />
          </span>
        </motion.p>
      </motion.div>

      {/* Buttons */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, ease: "easeOut", delay: 1 }}
        className="relative z-10 mt-10 flex flex-wrap justify-center gap-8"
      >
        <motion.a
          whileHover={{ scale: 1.1, rotate: 3 }}
          whileTap={{ scale: 0.9 }}
          transition={{ duration: 0.3 }}
          href="/question-tracker"
          className="px-8 py-4 text-xl font-semibold text-white border-2 border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-900 transition shadow-lg bg-black bg-opacity-40 backdrop-blur-lg"
        >
          Question Tracker
        </motion.a>

        <motion.a
          whileHover={{ scale: 1.1, rotate: -3 }}
          whileTap={{ scale: 0.9 }}
          transition={{ duration: 0.3 }}
          href="/profile"
          className="px-8 py-4 text-xl font-semibold text-white bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center gap-2 hover:from-blue-700 hover:to-purple-700 transition shadow-lg"
        >
          Profile Tracker
        </motion.a>
      </motion.div>
    </section>
  );
};

export default HeroSection;

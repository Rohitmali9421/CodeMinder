import React from "react";
import { motion } from "framer-motion";
import { ReactTyped } from "react-typed";
import curveImg from "../assets/curve.png";

const HeroSection = () => {
  // Floating shapes data
  const shapes = [
    { id: 1, color: "from-purple-500 to-pink-500", size: "w-16 h-16", top: "top-20", left: "left-10", rotate: 45 },
    { id: 2, color: "from-blue-400 to-cyan-400", size: "w-24 h-24", top: "top-1/3", left: "left-1/4", rotate: -15 },
    { id: 3, color: "from-yellow-400 to-orange-500", size: "w-20 h-20", top: "top-2/3", left: "left-3/4", rotate: 30 },
    { id: 4, color: "from-green-400 to-teal-500", size: "w-12 h-12", top: "top-1/4", left: "right-20", rotate: -60 },
  ];

  return (
    <section className="relative flex flex-col items-center justify-center min-h-screen w-full text-center overflow-hidden bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900">
      {/* Animated floating shapes */}
      {shapes.map((shape) => (
        <motion.div
          key={shape.id}
          className={`absolute ${shape.size} ${shape.top} ${shape.left} bg-gradient-to-br ${shape.color} rounded-xl blur-xl opacity-20`}
          initial={{ y: 0, rotate: 0 }}
          animate={{ 
            y: [0, -40, 0],
            rotate: shape.rotate,
          }}
          transition={{
            duration: Math.random() * 10 + 10,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 opacity-10 [mask-image:radial-gradient(ellipse_at_center,white,transparent)]">
        <div className="absolute inset-0 bg-[size:20px_20px] [background-image:linear-gradient(to_right,white_1px,transparent_1px),linear-gradient(to_bottom,white_1px,transparent_1px)]"></div>
      </div>

      {/* Main Content */}
      <motion.div
        initial={{ opacity: 0, y: -50, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 1.2, ease: [0.2, 0.65, 0.3, 0.9] }}
        className="relative z-10 flex flex-col items-center max-w-4xl mx-auto p-6"
      >
        <h1 className="text-5xl sm:text-7xl md:text-8xl font-extrabold bg-gradient-to-r from-yellow-400 via-red-500 to-purple-500 text-transparent bg-clip-text leading-tight mb-4">
          <ReactTyped
            strings={["Elevate", "Optimize", "Conquer"]}
            typeSpeed={50}
            backSpeed={40}
            loop
            className="inline-block min-h-[1em]"
          />
        </h1>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, ease: "easeOut", delay: 0.5 }}
          className="relative"
        >
          <motion.p className="text-xl sm:text-2xl md:text-3xl text-white max-w-2xl mt-6 p-6 bg-black/30 backdrop-blur-md rounded-xl border border-white/10 shadow-2xl">
            A comprehensive platform for developers to monitor progress, visualize achievements, and connect with the coding community.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1 }}
            className="mt-8"
          >
            <span className="inline-block relative text-center">
              <span className="relative z-20 text-blue-300 font-extrabold text-3xl sm:text-4xl tracking-wide">
                Code<span className="text-pink-400">Minder</span>
              </span>
              <motion.img
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.5, ease: "easeOut", delay: 1.2 }}
                src={curveImg}
                className="absolute top-full left-1/2 transform -translate-x-1/2 w-36"
                width="170"
                height="20"
                alt="Curve underline"
              />
            </span>
          </motion.div>
        </motion.div>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut", delay: 1 }}
          className="relative z-10 mt-12 flex flex-wrap justify-center gap-6"
        >
          <motion.a
            whileHover={{ 
              scale: 1.05,
              boxShadow: "0 0 15px rgba(255, 255, 255, 0.4)"
            }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
            href="/question-tracker"
            className="px-8 py-4 text-lg font-semibold text-white border-2 border-white/20 rounded-xl hover:bg-white/10 transition-all duration-300 shadow-lg bg-gradient-to-r from-black/30 to-black/50 backdrop-blur-sm"
          >
            Question Tracker
          </motion.a>

          <motion.a
            whileHover={{ 
              scale: 1.05,
              boxShadow: "0 0 20px rgba(99, 102, 241, 0.6)"
            }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
            href="/profile"
            className="px-8 py-4 text-lg font-semibold text-white bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-xl hover:shadow-glow transition-all duration-300 shadow-lg"
          >
            Profile Tracker
          </motion.a>
        </motion.div>
      </motion.div>

      {/* Scrolling indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
      >
        <div className="animate-bounce flex flex-col items-center">
          <p className="text-sm text-white/70 mb-2">Scroll down</p>
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-1 h-2 bg-white rounded-full mt-2"
            />
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
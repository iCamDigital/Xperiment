"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { RiStarSFill } from "react-icons/ri";
import Image from "next/image";

const images = [
  { url: "/images/logo/logo-2.svg", alt: "Logo" },
  { url: "/images/logo/logo-3.svg", alt: "Logo" },
  { url: "/images/logo/logo-4.svg", alt: "Logo" },
  { url: "/images/logo/logo-7.svg", alt: "Logo" },
  { url: "/images/logo/logo-8.svg", alt: "Logo" },
  { url: "/images/logo/logo-9.svg", alt: "Logo" },
  { url: "/images/logo/logo-10.svg", alt: "Logo" },
  { url: "/images/logo/logo-11.svg", alt: "Logo" },
  { url: "/images/logo/logo-12.svg", alt: "Logo" },
  { url: "/images/logo/logo-13.svg", alt: "Logo" },
];

const Carousel = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="md:mt-[-40px] md:mb-0 mb-10">
      <div className="flex items-center justify-center pb-4">
        {[...Array(5)].map((_, index) => (
          <RiStarSFill key={index} size={20} color="#2563eb" />
        ))}
      </div>
      <div className="text-center text-md font-medium px-4 md:px-10 uppercase tracking-wider text-slate-400">
        Trusted by leading brands & professionals.
      </div>
      <div className="flex flex-wrap md:flex-nowrap justify-center items-center mt-4 md:mt-[-2rem] px-4 md:px-8 lg:px-52">
        <AnimatePresence custom={currentImageIndex}>
          {images.map((image, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0 }}
              animate={{
                opacity: index === currentImageIndex ? 1 : 0.5,
                scale: index === currentImageIndex ? 1.2 : 1,
                transition: { duration: 0.1 },
              }}
              className="flex justify-center items-center h-24 w-24 sm:h-32 sm:w-32 md:h-40 md:w-40"
              exit={{ opacity: 0 }}
              custom={index}
              transition={{
                opacity: { duration: 0.3 },
              }}
            >
              <Image
                src={image.url}
                alt={image.alt}
                width={200}
                height={200}
                className="object-contain h-16 w-16 sm:h-20 sm:w-20 md:h-24 md:w-24"
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Carousel;

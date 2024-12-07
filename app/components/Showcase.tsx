"use client";
import React from "react";
import Carousal from "@/components/Carousal";

const Showcase = () => {
  const humans = [
    "/headshots/human1.jpeg",
    "/headshots/human2.jpeg",
    "/headshots/human3.jpeg",
    "/headshots/human4.jpeg",
    "/headshots/human5.jpg",
    "/headshots/human6.jpeg",
    "/headshots/human7.jpg",
    "/headshots/human8.jpeg",
  ];

  const animals = [
    "/headshots/animal1.jpeg",
    "/headshots/animal2.jpeg",
    "/headshots/animal3.jpeg",
    "/headshots/animal4.jpeg",
    "/headshots/animal5.jpeg",
    "/headshots/animal6.jpeg",
    "/headshots/animal7.jpeg",
    "/headshots/animal8.jpeg",
  ];

  const products = [
    "/headshots/prod1.jpg",
    "/headshots/prod2.jpeg",
    "/headshots/prod3.jpeg",
    "/headshots/prod4.jpeg",
    "/headshots/prod5.jpg",
    "/headshots/prod6.jpg",
    "/headshots/prod7.jpg",
    "/headshots/prod8.jpeg",
  ];

  return (
    <div className="animate-fadeIn">
      <Carousal images={humans} />
      <Carousal images={animals} reverse={true} />
      <Carousal images={products} />
    </div>
  );
};

export default Showcase;

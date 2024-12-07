"use client";

import React from "react";
import Image from "next/image";
import Carousal from "@/components/Carousal";

const humans = [
  "/headshots/human1.png",
  "/headshots/human2.png",
  "/headshots/human3.png",
  "/headshots/human4.png",
  "/headshots/human5.png",
  "/headshots/human6.png",
  "/headshots/human7.png",
  "/headshots/human8.png",
];

const humans2 = [
  "/headshots/human9.png",
  "/headshots/human10.png",
  "/headshots/human11.png",
  "/headshots/human12.png",
  "/headshots/human13.png",
  "/headshots/human14.png",
  "/headshots/human15.png",
  "/headshots/human16.png",
];

const SecondSection = () => {
  return (
    <div>
      <div className="flex flex-col justify-center items-center">
        {/* First section */}
        {/* Circle element */}
        <div className="relative flex flex-col items-center">
          {/* Circle with gradient and number */}
          <div className="bg-gradient-to-l from-blue-500 to-blue-300 text-white rounded-full h-12 w-12 flex items-center justify-center font-bold z-10">
            1
          </div>
          {/* Gradient stroke line with fade out at the end */}
          <div className="w-1 h-10 rounded-lg bg-gradient-to-b from-blue-600 to-transparent mt-[-2px]"></div>
        </div>
        {/* Text element */}
        <div className="text-4xl sm:text-5xl md:text-6xl font-bold text-center mt-2">
          Upload your photos
        </div>
        <div
          className="items-center justify-center flex text-lg md:text-xl font-md px-10 tracking-wider text-slate-700 mt-4 
        max-w-4xl text-center"
        >
          Submit 4 or more high-quality selfies. Ensure they are front-facing,
          with only one person, no hats or accessories.
        </div>
        {/* Graphic element */}
        <div className="px-2 min-w-fit flex justify-center items-center mt-8">
          <div className="flex flex-row items-center">
            {/* Row with images on left, center, and right */}
            <div className="flex justify-between w-full max-w-7xl">
              {/* Left side */}
              <div className="flex flex-col items-center justify-center">
                <div className="hidden sm:flex-col lg:flex-row sm:flex gap-6 mb-1">
                  {/* Three images up */}
                  <Image
                    src="/avatars/7.png"
                    width={105}
                    height={105}
                    className="rounded-2xl shadow-custom-shadow"
                    alt="image 1"
                  />
                  <Image
                    src="/avatars/1.png"
                    width={105}
                    height={105}
                    className="rounded-2xl shadow-custom-shadow"
                    alt="image 2"
                  />
                  <Image
                    src="/avatars/8.png"
                    width={105}
                    height={105}
                    className="rounded-2xl shadow-custom-shadow"
                    alt="image 3"
                  />
                </div>
                <div className="hidden lg:flex gap-6 mt-6">
                  {/* Three images down */}
                  <Image
                    src="/avatars/4.png"
                    width={105}
                    height={105}
                    className="rounded-2xl shadow-custom-shadow"
                    alt="image 4"
                  />
                  <Image
                    src="/avatars/9.png"
                    width={105}
                    height={105}
                    className="rounded-2xl shadow-custom-shadow"
                    alt="image 5"
                  />
                  <Image
                    src="/avatars/3.png"
                    width={105}
                    height={105}
                    className="rounded-2xl shadow-custom-shadow"
                    alt="image 6"
                  />
                </div>
              </div>

              {/* Center image */}
              <div className="relative mx-8 w-[250px] h-[480px]">
                {/* Image */}
                <Image
                  src="/avatars/phone.svg"
                  layout="fill"
                  objectFit="cover"
                  className="rounded-2xl drop-shadow-2xl"
                  alt="Center image"
                  loading="eager"
                />

                {/* Video positioned on top of the image */}
                <video
                  src="/avatars/tutorial.mp4"
                  autoPlay
                  loop
                  muted
                  className="absolute top-6 left-1/2 transform -translate-x-1/2 -translate-y-3 w-[212px] rounded-3xl"
                />
              </div>

              {/* Right side */}
              <div className="flex flex-col items-center justify-center">
                <div className="hidden lg:flex gap-6 mb-1">
                  {/* Three images up */}
                  <Image
                    src="/avatars/5.png"
                    width={105}
                    height={105}
                    className="rounded-2xl shadow-custom-shadow"
                    alt="image 7"
                  />
                  <Image
                    src="/avatars/10.png"
                    width={105}
                    height={105}
                    className="rounded-2xl shadow-custom-shadow"
                    alt="image 8"
                  />
                  <Image
                    src="/avatars/6.png"
                    width={105}
                    height={105}
                    className="rounded-2xl shadow-custom-shadow"
                    alt="image 9"
                  />
                </div>
                <div className="hidden sm:flex-col lg:flex-row sm:flex flex-col gap-6 lg:mt-6">
                  {/* Three images down */}
                  <Image
                    src="/avatars/12.png"
                    width={105}
                    height={105}
                    className="rounded-2xl shadow-custom-shadow"
                    alt="image 10"
                  />
                  <Image
                    src="/avatars/2.png"
                    width={105}
                    height={105}
                    className="rounded-2xl shadow-custom-shadow"
                    alt="image 11"
                  />
                  <Image
                    src="/avatars/11.png"
                    width={105}
                    height={105}
                    className="rounded-2xl shadow-custom-shadow"
                    alt="image 12"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Second section */}
        {/* Circle element */}
        <div className="relative flex flex-col items-center mt-8">
          {/* Circle with gradient and number */}
          <div className="bg-gradient-to-l from-slate-700 to-blue-500 text-white rounded-full h-12 w-12 flex items-center justify-center font-bold z-10">
            2
          </div>
          {/* Gradient stroke line with fade out at the end */}
          <div className="mt-[-75px] w-1 h-28 rounded-lg bg-gradient-to-b from-transparent via-blue-500 to-transparent bg-[length:100%_100%]"></div>
        </div>
        {/* Text element */}
        <div className="text-4xl sm:text-5xl md:text-6xl font-bold text-center mt-2">
          Our AI gets to work
        </div>
        <div className="items-center justify-center flex text-lg md:text-xl font-md px-10 tracking-wider text-slate-700 mt-4 max-w-4xl text-center">
          The AI magic takes ~20 minutes. You'll get an email when it's ready.
        </div>
        {/* Video element */}
        <div className="flex justify-center items-center mt-8">
          <div
            className="relative w-[95%] xl:w-[1050px] border-blue-800 border-4 h-[200px] sm:h-[350px]
            md:h-[400px] lg:h-[500px] xl:h-[600px] rounded-2xl overflow-hidden shadow-custom-shadow"
          >
            <video
              src="/avatars/showcase.mp4"
              autoPlay
              loop
              muted
              className="w-full h-full object-cover"
            />
          </div>
        </div>
        {/* Third section */}
        {/* Circle element */}
        <div className="relative flex flex-col items-center mt-16">
          {/* Circle with gradient and number */}
          <div className="bg-gradient-to-l from-black to-slate-100 text-white rounded-full h-12 w-12 flex items-center justify-center font-bold z-10">
            3
          </div>
          {/* Gradient stroke line with fade out at the end */}
          <div className="mt-[-90px] w-1 h-14 rounded-lg bg-gradient-to-b from-transparent to-black"></div>
        </div>
        {/* Text element */}
        <div className="text-4xl sm:text-5xl md:text-6xl font-bold text-center mt-10">
          Get amazing headshots
        </div>
        <div className="items-center justify-center flex text-lg md:text-xl font-md px-10 tracking-wider text-slate-700 mt-4 max-w-4xl text-center">
          You'll receive multiple AI headshots, ready for all use cases — from
          personal to professional — depending on the style you choose.
        </div>
        <div className="animate-fadeIn container mx-auto pt-10">
          <Carousal images={humans} />
          <Carousal images={humans2} reverse={true} />
        </div>
        <div className="items-center justify-center flex text-sm font-md px-10 pb-20 uppercase tracking-wider text-slate-400">
          Results from framecast ai headshot generator.
        </div>
      </div>
    </div>
  );
};

export default SecondSection;

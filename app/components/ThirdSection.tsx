import Testimonial from "@/components/Testimonials";
import Link from "next/link";
import { MdOutlineCamera } from "react-icons/md";

const ThirdSection = () => {
  return (
    <div className="bg-blue-100 py-8 sm:py-12 md:py-20">
      <div className="flex justify-center items-center px-4 sm:px-6 md:px-8">
        <h2
          className="text-4xl sm:text-5xl md:text-7xl text-center font-bold pb-4 text-gradient bg-gradient-to-r from-blue-800
        to-blue-300 bg-clip-text text-transparent max-w-3xl"
        >
          5000+ AI headshots generated.
        </h2>
      </div>
      <div className="text-center justify-center items-center flex px-4 sm:px-6 md:px-8">
        <p className="text-xl sm:text-2xl font-medium tracking-wider max-w-6xl md:px-44">
          Read what people are saying about their new headshots.
        </p>
      </div>
      <div className="flex justify-center pt-6 sm:pt-8">
        <Link href="/login">
          <button
            className="flex gap-3 items-center text-center bg-blue-600 hover:bg-blue-500 font-medium text-white px-4 sm:px-6 py-2 rounded-lg text-base sm:text-lg 
              transition transform motion-reduce:transition-none motion-reduce:hover:transform-none"
          >
            Get Your Headshots
            <MdOutlineCamera size={25} />
          </button>
        </Link>
      </div>
      <div className="sm:mt-12 md:mt-[-70px]">
        <Testimonial />
      </div>
    </div>
  );
};

export default ThirdSection;

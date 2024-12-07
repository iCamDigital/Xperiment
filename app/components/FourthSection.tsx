import Link from "next/link";
import { MdOutlineCamera } from "react-icons/md";

const FourthSection = () => {
  return (
    <div className="relative sm:py-16 md:py-20 lg:py-28 sm:my-16 md:my-20">
      {/* Floating images - Left Side */}
      <div className="hidden lg:block absolute left-[5%] xl:left-[180px] top-[50px] space-y-8">
        <div className="animate-float-left-up-down">
          <img
            src="/headshots/human1.png"
            alt="Image 1"
            className="w-[100px] xl:w-[125px] h-[120px] xl:h-[150px] object-cover rounded-lg shadow-custom-shadow rotate-2"
            loading="lazy"
          />
        </div>
        <div className="animate-float-left-up-down delay-200">
          <img
            src="/headshots/human2.png"
            alt="Image 2"
            className="w-[100px] xl:w-[125px] h-[120px] xl:h-[150px] object-cover rounded-lg shadow-custom-shadow ml-10"
            loading="lazy"
          />
        </div>
        <div className="animate-float-left-up-down delay-400">
          <img
            src="/headshots/human3.png"
            alt="Image 3"
            className="w-[100px] xl:w-[125px] h-[120px] xl:h-[150px] object-cover rounded-lg shadow-custom-shadow rotate-2"
            loading="lazy"
          />
        </div>
      </div>

      {/* Floating images - Right Side */}
      <div className="hidden lg:block absolute right-[5%] xl:right-[180px] top-[50px] space-y-8">
        <div className="animate-float-right-up-down">
          <img
            src="/headshots/human4.png"
            alt="Image 4"
            className="w-[100px] xl:w-[125px] h-[120px] xl:h-[150px] object-cover rounded-lg shadow-custom-shadow rotate-[-2deg]"
            loading="lazy"
          />
        </div>
        <div className="animate-float-right-up-down delay-200">
          <img
            src="/headshots/human5.png"
            alt="Image 5"
            className="w-[100px] xl:w-[125px] h-[120px] xl:h-[150px] object-cover rounded-lg shadow-custom-shadow ml-[-40px]"
            loading="lazy"
          />
        </div>
        <div className="animate-float-right-up-down delay-400">
          <img
            src="/headshots/human6.png"
            alt="Image 6"
            className="w-[100px] xl:w-[125px] h-[120px] xl:h-[150px] object-cover rounded-lg shadow-custom-shadow rotate-[-2deg]"
            loading="lazy"
          />
        </div>
      </div>

      {/* Main Content */}
      <div className="flex justify-center items-center px-4 sm:px-6 md:px-8">
        <h2
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-center font-bold pb-4 text-gradient bg-gradient-to-l from-blue-800 to-blue-300
          max-w-3xl bg-clip-text text-transparent"
        >
          Money-back Guarantee.
        </h2>
      </div>
      <div className="mt-2 text-center justify-center items-center flex px-4 sm:px-6 md:px-8">
        <p className="text-lg sm:text-xl md:text-2xl font-md tracking-wider max-w-6xl md:px-12 lg:px-44">
          Try Framecast AI with confidence. Not completely satisfied? Let us
          know within 7 days of purchase for a full refund.
        </p>
      </div>
      <div className="flex gap-4 justify-center pt-8">
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
    </div>
  );
};

export default FourthSection;

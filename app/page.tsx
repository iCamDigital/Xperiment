import FirstSection from "./components/Hero";
import Carousel from "../components/ui/carousel";
import SecondSection from "./components/page";
import ThirdSection from "./components/ThirdSection";
import FourthSection from "./components/FourthSection";
import PricingSection from "./components/Pricing";
import FifthSection from "./components/FifthSection";
import Navbar from "./components/Header";
import Footer from "./components/Footer";

export const dynamic = "force-dynamic";

export default async function Index() {
  return (
    <>
      <Navbar />
      <FirstSection />
      <Carousel />
      <SecondSection />
      <ThirdSection />
      <PricingSection />
      <FourthSection />
      <FifthSection />
      <Footer />
    </>
  );
}

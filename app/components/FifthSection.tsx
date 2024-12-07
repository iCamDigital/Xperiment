import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ArrowRight, Camera } from "lucide-react";

const FifthSection = () => {
  return (
    <>
      <div
        id="faqs"
        className="bg-blue-100 py-20 flex flex-col items-center justify-center mt-36"
      >
        <div className="max-w-screen-2xl w-full px-10 flex flex-col md:flex-row items-start justify-between mb-12">
          {/* Left Section: Heading and Subheading */}
          <div className="flex flex-col mb-10 md:mb-0">
            <div
              className="text-4xl sm:text-5xl md:text-7xl font-bold pb-2 text-gradient bg-gradient-to-l from-blue-800 to-blue-300
            bg-clip-text text-transparent"
            >
              Frequently asked questions.
            </div>
            <div className="mt-2 text-xl sm:text-2xl font-medium text-slate-700 tracking-wider">
              Have more questions? You can email us at support@framecastai.com.
            </div>
          </div>

          {/* Right Section: Accordion */}
          <div className="w-full max-w-3xl md:ml-20">
            <Accordion type="single" collapsible>
              <AccordionItem value="item-1">
                <AccordionTrigger className="text-xl text-left">
                  Can I get more credits at anytime?
                </AccordionTrigger>
                <AccordionContent>
                  Yes, you can get more credits whenever you want. No questions
                  are asked while you do that and we would highly appreciate if
                  you will give us some feedback.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger className="text-xl text-left">
                  How does Framecast AI's pricing work?
                </AccordionTrigger>
                <AccordionContent>
                  Our one-time payment plans are tiered according to the credits
                  you buy. Understanding the task at hand and ironing out the
                  wrinkles is key.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger className="text-xl text-left">
                  How secure is Framecast AI?
                </AccordionTrigger>
                <AccordionContent>
                  Protecting the data you trust to Framecast AI is our first
                  priority. This part is really crucial in keeping the project
                  in line to completion.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-4">
                <AccordionTrigger className="text-xl text-left">
                  How do I increase the credits for any account?
                </AccordionTrigger>
                <AccordionContent>
                  To increase the credits for any account, you can purchase the
                  credits by using one of the payment gateways attached.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-5">
                <AccordionTrigger className="text-xl text-left">
                  Do I get access to every single headshot as shown?
                </AccordionTrigger>
                <AccordionContent>
                  Yes, you get access to every single headshot generated for
                  lifetime.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </div>

      <div>
        <div className="py-24 px-2 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="rounded-3xl p-8 lg:p-12 shadow-custom-shadow flex flex-col lg:flex-row items-center justify-between">
              {/* Left Section: Heading and Call-to-Action */}
              <div className="mb-12 lg:mb-0 lg:mr-12 lg:w-max">
                <div className="text-4xl sm:text-5xl md:text-7xl font-extrabold text-dark mb-6 leading-tight">
                  Get{" "}
                  <span className="text-4xl sm:text-5xl md:text-7xl text-gradient bg-gradient-to-r from-blue-800 to-blue-300 bg-clip-text text-transparent">
                    your AI{" "}
                  </span>
                  headshots today.
                </div>
                <p className="text-xl sm:text-2xl mb-8 text-slate-700 font-medium tracking-wider">
                  Stand out in every frame – personalized AI headshots for a
                  picture perfect you.
                </p>
                <div className="flex items-center mb-10">
                  <Camera className="w-6 h-6 mr-3 text-blue-600" />
                  <span className="text-sm sm:text-md font-medium text-slate-700 tracking-wider">
                    Premium quality starting at just $11.99
                  </span>
                </div>
                <a
                  href="/login"
                  className="inline-flex items-center justify-center text-blue-700 text-dark font-bold py-4 px-8 rounded-xl text-lg border-2 border-blue-600 shadow-lg hover:shadow-xl transition-all duration-300 group"
                >
                  Get Your Headshots
                  <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                </a>
              </div>

              {/* Right Section: Images */}
              <div className="w-full lg:w-1/2 flex justify-center items-center">
                <div className="relative w-80 h-80">
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-40 h-40 rounded-full overflow-hidden border-4 border-blue-600 shadow-custom-shadow">
                    <img
                      src="/headshots/human10.png"
                      alt="AI Headshot Example 1"
                      className="object-cover w-full h-full"
                      loading="lazy"
                    />
                  </div>
                  <div className="absolute bottom-0 left-0 w-40 h-40 rounded-full overflow-hidden border-4 border-blue-700 shadow-custom-shadow">
                    <img
                      src="/headshots/human12.png"
                      alt="AI Headshot Example 2"
                      className="object-cover w-full h-full"
                      loading="lazy"
                    />
                  </div>
                  <div className="absolute bottom-0 right-[-10px] w-40 h-40 rounded-full overflow-hidden border-4 border-blue-700 shadow-custom-shadow">
                    <img
                      src="/headshots/human14.png"
                      alt="AI Headshot Example 3"
                      className="object-cover w-full h-full"
                      loading="lazy"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FifthSection;

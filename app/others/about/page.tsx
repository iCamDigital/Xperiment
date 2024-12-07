import Head from "next/head";
import React from "react";
import Navbar from "../../components/Header";

const About = () => {
  return (
    <div className="flex-grow pb-6">
      <Head>
        <title>About Us | Framecast AI</title>
        <meta
          name="description"
          content="About Us for Framecast AI, the AI headshot generator platform."
        />
      </Head>
      <Navbar />
      <main className="max-w-[80rem] mt-14 px-4 sm:px-6 lg:px-8 mx-auto text-justify">
        <h1 className="text-main text-6xl font-bold mx-auto mb-10 text-blue-600 tracking-wide lg:mb-14">
          About Us
        </h1>

        <section className="mb-6">
          <p className="mb-4">
            At Framecast AI, we believe that everyone deserves a professional
            headshot that captures their unique essence. Our AI-powered headshot
            generator makes it easy to create stunning, high-quality images
            without the hassle of traditional photo shoots. With just a few
            clicks, you can explore countless styles, backgrounds, and
            expressions to find the perfect headshot for your personal or
            professional needs. Say goodbye to awkward poses and expensive
            photographers - Framecast AI puts the power of professional
            headshots right at your fingertips.
          </p>
        </section>
      </main>
    </div>
  );
};

export default About;

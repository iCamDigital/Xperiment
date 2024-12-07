import Head from "next/head";
import React from "react";
import Navbar from "../../components/Header";

const ContactUs = () => {
  return (
    <div className="flex-grow pb-6">
      <Head>
        <title>Contact Us | Framecast AI</title>
        <meta
          name="description"
          content="Contact Us for Framecast AI, the AI headshot generator platform."
        />
      </Head>
      <Navbar />
      <main className="max-w-[80rem] mt-14 px-4 sm:px-6 lg:px-8 mx-auto text-justify">
        <h1 className="text-main text-6xl font-bold mx-auto mb-10 text-blue-600 tracking-wide lg:mb-14">
          Contact Us
        </h1>

        <section className="mb-6">
          <p className="mb-4">
            Have questions or need assistance? We're here to help! Feel free to
            reach out to us by email at
            <a href="" className="text-blue-600">
              {" "}
              support@framecastai.com
            </a>
            . Our dedicated team is available to answer your inquiries and
            provide support. For general inquiries or to request a demo, please
            contact us via email.
          </p>
        </section>
      </main>
    </div>
  );
};

export default ContactUs;

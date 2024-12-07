import React from "react";
import Head from "next/head";
import Navbar from "../../components/Header";

const TermsOfService: React.FC = () => {
  return (
    <div className="flex-grow pb-6">
      <Head>
        <title>Terms of Service | Framecast AI</title>
        <meta
          name="description"
          content="Read the comprehensive terms of service for Framecast AI, the AI headshot generator platform."
        />
      </Head>
      <Navbar />
      <main className="max-w-[80rem] mt-14 px-4 sm:px-6 lg:px-8 mx-auto text-justify">
        <h1 className="text-main text-6xl font-bold mx-auto mb-10 text-blue-600 tracking-wide lg:mb-14">
          Terms of Service
        </h1>

        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-2">1. Introduction</h2>
          <p className="mb-4">
            Welcome to <strong>Framecast AI </strong>("we," "our," "us"). By
            accessing or using our website at
            <a
              href="https://framecast-ai.vercel.app/"
              className="text-blue-600"
            >
              {" "}
              https://framecast-ai.vercel.app{" "}
            </a>
            ("Website"), you agree to comply with and be bound by these Terms of
            Service ("Terms"). If you do not agree to these Terms, please do not
            use the Website.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-2">2. Use of Our Service</h2>
          <p className="mb-4">
            <strong>Framecast AI </strong> is an AI-powered headshot generator
            that allows users to create professional images. Users must adhere
            to all applicable laws and agree not to misuse our services. Any
            violations of these rules can result in the termination of access to
            the platform.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-2">
            3. Account and User Responsibilities
          </h2>
          <p className="mb-4">
            To access certain features of the Website, you may need to create an
            account. You agree to provide accurate and complete information when
            registering and to keep this information updated. Users are
            responsible for maintaining the confidentiality of their account
            details and for all activities under their account.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-2">4. Payment and Credits</h2>
          <p className="mb-4">
            <strong>Framecast AI</strong> operates on a credit-based system for
            using our services. All purchases of credits are final and
            non-refundable, except as specified in our
            <a
              href="https://framecast-ai.vercel.app/refund"
              className="text-blue-600"
            >
              {" "}
              Refund Policy
            </a>
            . We reserve the right to modify pricing and the terms of credits at
            any time.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-2">
            5. Data Retention and Deletion
          </h2>
          <p className="mb-4">
            We value your privacy. Data, including photos and generated
            headshots, is stored for a period of 30 days, after which it is
            permanently deleted. Users may request the deletion of their data at
            any time by contacting us at
            <a href="" className="text-blue-600">
              {" "}
              support@framecastai.com
            </a>
            . For more information, please review our
            <a
              href="https://framecast-ai.vercel.app/privacy-policy"
              className="text-blue-600"
            >
              {" "}
              Privacy Policy
            </a>
            .
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-2">
            6. Third-Party Services
          </h2>
          <p className="mb-4">
            <strong>Framecast AI </strong> & it's services may contain links to
            other websites, products, or services that we do not own or operate.
            We are not responsible for the privacy practices of these third
            parties. Please be aware that this Policy does not apply to your
            activities on these third-party services or any information you
            disclose to these third parties. We encourage you to read their
            privacy policies before providing any information to them.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-2">
            7. Limitation of Liability
          </h2>
          <p className="mb-4">
            To the maximum extent permitted by law,{" "}
            <strong>Framecast AI </strong> and its affiliates shall not be
            liable for any indirect, incidental, special, or consequential
            damages arising out of or in connection with your use of our
            services.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-2">
            8. Changes to the Terms
          </h2>
          <p className="mb-4">
            We reserve the right to update these Terms at any time. Any changes
            will be posted on this page, with the updated date. Continued use of
            the Website after any changes constitutes acceptance of those
            changes.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-2">9. Contact Us</h2>
          <p className="mb-4">
            If you have any questions about these Terms, please contact
            Framecast AI by email at
            <a href="" className="text-blue-600">
              {" "}
              support@framecastai.com
            </a>
            .
          </p>
        </section>
      </main>
    </div>
  );
};

export default TermsOfService;

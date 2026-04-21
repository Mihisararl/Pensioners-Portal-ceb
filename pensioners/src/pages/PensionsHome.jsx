import React from "react";
import Navbar from "../components/Navbar";
import Card from "../components/Card";
import Footer from "../components/Footer";

// Import sample PDF
import SamplePDF from "../docs/sample.pdf";


// Import images
import Card1Img from "../assets/pention/c1.jpg";
import Card2Img from "../assets/pention/restor.jpg";
import Card3Img from "../assets/pention/c3.jpg";
import HeroImg from "../assets/pention/pentioner.png";

const PensionsHome = () => {
  return (
    <div className="bg-white font-sans text-gray-800">
      {/* Navbar */}
      <Navbar />

      {/* Card Section */}
      <section className="pt-48 pb-16">
        <div className="flex flex-col md:flex-row gap-8 justify-between items-stretch px-4 md:px-6 lg:px-8">
          <Card
            title="Download Document"
            description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae voluptatem, veritatis ipsum autem minima possimus eos."
            btnText="Download"
            imgSrc={Card1Img}
            btnLink={SamplePDF} // PDF in public/docs folder
            download
            className="h-full"
          />
          <Card
            title="Book Your Circuit Bungalow Escape"
            description="A special platform for CEB pensioners to reserve peaceful, comfortable stays at circuit bungalows islandwide. Quick, fair, and made just for you — start your next getaway today."
            btnText="Go to Site"
            imgSrc={Card2Img}
            className="h-full"
          />
          <Card
            title="Announcements"
            description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae voluptatem, veritatis ipsum autem minima possimus eos."
            btnText="Click More"
            imgSrc={Card3Img}
            className="h-full"
          />
        </div>
      </section>

      {/* Hero Section */}
      <section className="flex flex-col md:flex-row items-center justify-center gap-8 px-4 md:px-6 lg:px-8 py-16 max-w-6xl mx-auto">
        {/* Left Content */}
        <div className="flex-1">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Welcome to the CEB Pensioners' Portal
          </h1>
          <p className="text-gray-700 text-base md:text-lg font-medium leading-relaxed">
            Welcome to your dedicated portal — a heartfelt tribute to the men and women who devoted their strength, time, and wisdom to powering our nation. At the Ceylon Electricity Board (CEB), we deeply value the remarkable service you rendered throughout your career. This platform is designed to honor that legacy by providing you with continued care, information, and essential services even after retirement. We are committed to ensuring that your golden years are peaceful, well-supported, and filled with the respect you truly deserve. From pension-related assistance to welfare benefits and updates, this portal is here to serve you — just as you once served the nation. Thank you for being a pillar of CEB's proud history.
          </p>
        </div>

        {/* Right Image */}
        <div className="flex-1">
          <img
            src={HeroImg}
            alt="CEB Pensioner"
            className="rounded-xl shadow-xl w-full h-auto object-cover"
          />
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default PensionsHome;

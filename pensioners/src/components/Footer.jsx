import React from "react";
import Footer1 from "../assets/pention/f1.jpg";
import Footer2 from "../assets/pention/f2.jpg";
import Footer3 from "../assets/pention/f3.jpg";
import Footer4 from "../assets/pention/f4.png";
import Footer5 from "../assets/pention/f5.jpg";

export default function Footer() {
  const footerImages = [Footer1, Footer2, Footer3, Footer4, Footer5];

  return (
    <footer className="bg-black text-white mt-16">
      {/* Image Section - Full Width */}
      <div className="flex w-full overflow-hidden">
        {footerImages.map((img, index) => (
          <div key={index} className="flex-1 overflow-hidden">
            <img
              src={img}
              alt={`footer-img-${index}`}
              className="w-full h-48 md:h-64 object-cover transform transition duration-500 hover:scale-105 hover:brightness-110"
            />
          </div>
        ))}
      </div>

      {/* Information Section */}
      <div className="flex flex-wrap justify-center gap-8 py-8 px-4 md:px-16 bg-black">
        <div className="flex-1 min-w-[200px] text-center md:text-left">
          <h3 className="text-white font-semibold mb-2">Address</h3>
          <p className="text-gray-400">
            50 Sir Chittampalam A Gardiner Mawatha<br />Colombo 00200, 00700
          </p>
          <a href="#" className="text-blue-500 hover:underline">Get Direction</a>
        </div>

        <div className="flex-1 min-w-[200px] text-center md:text-left">
          <h3 className="text-white font-semibold mb-2">Reservation</h3>
          <p className="text-gray-400">+94 112 451 098</p>
          <p>
            <a href="mailto:wm@ceb.lk" className="text-blue-500 hover:underline">
              wm@ceb.lk
            </a>
          </p>
        </div>

        <div className="flex-1 min-w-[200px] text-center md:text-left">
          <h3 className="text-white font-semibold mb-2">Navigation</h3>
          <p><a href="#" className="text-gray-400 hover:underline">Home</a></p>
          <p><a href="#" className="text-gray-400 hover:underline">My Bookings</a></p>
          <p><a href="#" className="text-gray-400 hover:underline">Admin Portal</a></p>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="text-center text-gray-400 py-4 text-sm bg-black">
        <hr className="border-gray-700 mb-2"/>
        <p>
          Copyright © 2025 All rights reserved |{" "}
          <a href="#" className="text-blue-500 hover:underline">
            Ceylon Electricity Board Version 2.1.6
          </a>
        </p>
      </div>
    </footer>
  );
}

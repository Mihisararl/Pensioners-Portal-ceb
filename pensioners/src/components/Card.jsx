import React from "react";

export default function Card({ title, description, btnText, imgSrc, btnLink, download }) {
  return (
    <div className="flex flex-col md:flex-row bg-white shadow-lg rounded-xl overflow-hidden hover:shadow-2xl transform hover:-translate-y-1 transition w-full md:flex-1 min-w-[280px]">
      
      <div className="p-6 flex flex-col justify-between w-full md:w-2/3">
        <span className="text-xl font-medium text-black mb-2">{title}</span>
        <p className="text-gray-900 text-sm">{description}</p>

        {btnLink ? (
          <a
            href={btnLink}
            download={download}
            className="mt-4 inline-block bg-red-900 text-white px-4 py-2 rounded hover:bg-red-800 transform hover:scale-105 transition"
          >
            {btnText}
          </a>
        ) : (
          <button className="mt-4 inline-block bg-red-900 text-white px-4 py-2 rounded hover:bg-red-800 transform hover:scale-105 transition">
            {btnText}
          </button>
        )}
      </div>

      <div className="w-full md:w-2/4">
        <img src={imgSrc} alt={title} className="w-full h-full object-cover" />
      </div>
    </div>
  );
}

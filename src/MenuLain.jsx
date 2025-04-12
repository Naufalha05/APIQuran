import { useState } from "react";
import { Link } from "react-router-dom";

export default function Menu() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative">
      <button
        onClick={toggleMenu}
        className="fixed bottom-3 right-6 bg-green-700 text-white p-4 rounded-full shadow-lg cursor-pointer z-50 hover:bg-green-500 transition-all duration-300 ease-in-out"
        style={{ width: "60px", height: "60px" }}
      >
        <span className="text-2xl">☰</span>
      </button>
      {isOpen && (
        <div className="fixed bottom-23 right-10 flex flex-col gap-4 z-50 transition-all duration-300 ease-in-out transform translate-x-0">
          <Link
            to="/baca"
            className="bg-green-700 text-white p-4 rounded-lg shadow-lg cursor-pointer flex justify-center items-center hover:bg-green-500 transition"
          >
            Chapter
          </Link>
          <Link
            to="/sajda"
            className="bg-green-700 text-white p-4 rounded-lg shadow-lg cursor-pointer flex justify-center items-center hover:bg-green-500 transition"
          >
            Sajda
          </Link>
          <Link
            to="/juz"
            className="bg-green-700 text-white p-4 rounded-lg shadow-lg cursor-pointer flex justify-center items-center hover:bg-green-500 transition"
          >
            Juz
          </Link>
          <Link
            to="/manzil"
            className="bg-green-700 text-white p-4 rounded-lg shadow-lg cursor-pointer flex justify-center items-center hover:bg-green-500 transition"
          >
            Manzil
          </Link>
          <Link
            to="/ruku"
            className="bg-green-700 text-white p-4 rounded-lg shadow-lg cursor-pointer flex justify-center items-center hover:bg-green-500 transition"
          >
            Ruku
          </Link>
          <Link
            to="/hizb"
            className="bg-green-700 text-white p-4 rounded-lg shadow-lg cursor-pointer flex justify-center items-center hover:bg-green-500 transition"
          >
            Hizb
          </Link>
        </div>
      )}
    </div>
  );
}

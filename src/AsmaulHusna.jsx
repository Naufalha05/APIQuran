import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faBookOpen,
  faMagnifyingGlass,
  faStarAndCrescent,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
const AsmaulHusna = () => {
  const [names, setNames] = useState([]);

  useEffect(() => {
    const fetchNames = async () => {
      try {
        const response = await fetch("https://api.aladhan.com/v1/asmaAlHusna");
        const result = await response.json();
        setNames(result.data);
      } catch (error) {
        console.error("Error fetching Asmaul Husna:", error);
      }
    };

    fetchNames();
  }, []);

  return (
    <div
  className="min-h-screen bg-cover bg-center bg-no-repeat font-optimaAlt"
  style={{ backgroundImage: "url('/fix1.jpeg')" }}
>
      <nav className="bg-green-700 text-white px-6 py-4 shadow-md flex justify-between items-center">
        <div className="flex items-center gap-2">
          <img src="fix.png" alt="logo" className="w-8 h-6" />
          <h1 className="text-xl font-bold font-quattro">Al-Qur'an Digital</h1>
        </div>
        <ul className="flex gap-6 text-sm font-medium">
          <li className="hover:text-yellow-300 cursor-pointer flex items-center gap-1">
            <FontAwesomeIcon icon={faHome} />
            <Link to="/home">Home</Link>
          </li>
          <li className="hover:text-yellow-300 cursor-pointer flex items-center gap-1">
            <FontAwesomeIcon icon={faBookOpen} />
            <Link to="/baca">Chapter</Link>
          </li>
          <li className="hover:text-yellow-300 cursor-pointer flex items-center gap-1">
            <FontAwesomeIcon icon={faMagnifyingGlass} />
            <Link to="/cari">Find</Link>
          </li>
          <li className="hover:text-yellow-300 cursor-pointer flex items-center gap-1">
            <FontAwesomeIcon icon={faStarAndCrescent} />
            <Link to="/asmaulhusna">Asmaul Husna</Link>
          </li>
        </ul>
      </nav>
    <div className="min-h-screen bg-gradient-to-b from-green-100 to-green-200 p-6">
      <h1 className="text-3xl font-bold text-center text-green-800 mb-8">Asmaul Husna</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {names.map((item, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl shadow-md p-4 text-center transition transform hover:scale-105 hover:shadow-lg"
          >
            <h2 className="text-3xl font-arabic text-green-700 mb-2">{item.name}</h2>
            <p className="text-lg text-green-900 font-semibold">{item.transliteration}</p>
            <p className="text-gray-600 text-sm mt-1">{item.en.meaning}</p>
          </div>
        ))}
      </div>
    </div>
    </div>
  );
};

export default AsmaulHusna;

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faBookOpen,
  faMagnifyingGlass,
  faStarAndCrescent,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
export default function Juz() {
  const [selectedJuz, setSelectedJuz] = useState(null);
  const [ayahs, setAyahs] = useState([]);
  const [translations, setTranslations] = useState([]);

  const fetchJuz = async (juzNumber) => {
    try {
      const arabRes = await fetch(`https://api.alquran.cloud/v1/juz/${juzNumber}/quran-uthmani`);
      const transRes = await fetch(`https://api.alquran.cloud/v1/juz/${juzNumber}/en.asad`);

      const arabData = await arabRes.json();
      const transData = await transRes.json();

      setAyahs(arabData.data.ayahs);
      setTranslations(transData.data.ayahs);
      setSelectedJuz(juzNumber);
    } catch (err) {
      console.error("Gagal fetch data Juz:", err);
    }
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat font-optimaAlt"
      style={{ backgroundImage: "url('/fix1.jpeg')" }}
    >
      {/* Navbar */}
      <nav className="bg-green-700 text-white px-6 py-4 shadow-md flex justify-between items-center">
        <div className="flex items-center gap-2">
          <img src="/fix.png" alt="logo" className="w-8 h-6" />
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
      <div className="p-6">
        {!selectedJuz ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {Array.from({ length: 30 }, (_, i) => (
              <div
                key={i}
                onClick={() => fetchJuz(i + 1)}
                className="bg-white/80 rounded-xl shadow p-6 text-center text-green-800 font-semibold text-lg cursor-pointer hover:bg-green-100 transition"
              >
                Juz {i + 1}
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white/90 p-6 rounded-xl shadow-lg max-h-[80vh] overflow-y-auto">
            <button
              onClick={() => setSelectedJuz(null)}
              className="mb-4 text-green-700 hover:underline"
            >
              ← Kembali ke daftar Juz
            </button>
            <h2 className="text-xl font-bold text-green-800 mb-4">Juz {selectedJuz}</h2>
            {ayahs.map((ayah, idx) => (
              <div key={ayah.number} className="mb-4 border-b pb-3">
                <p className="text-2xl text-right font-lateef text-gray-900" dir="rtl">
                  {ayah.text}
                </p>
                <p className="text-sm text-gray-700 mt-1">
                  {idx + 1}. {translations[idx]?.text}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
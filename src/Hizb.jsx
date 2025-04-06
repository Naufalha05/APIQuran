import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faBookOpen,
  faMagnifyingGlass,
  faStarAndCrescent,
  faS,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
export default function Hizb() {
  const [selectedHizb, setSelectedHizb] = useState(null);
  const [ayahs, setAyahs] = useState([]);
  const [translations, setTranslations] = useState([]);

  const totalHizbQuarters = 240;

  const fetchHizbQuarter = async (hizbNumber) => {
    try {
      const arabicRes = await fetch(
        `https://api.alquran.cloud/v1/hizbQuarter/${hizbNumber}/quran-uthmani`
      );
      const translationRes = await fetch(
        `https://api.alquran.cloud/v1/hizbQuarter/${hizbNumber}/en.asad`
      );

      const arabicData = await arabicRes.json();
      const translationData = await translationRes.json();

      setAyahs(arabicData.data.ayahs);
      setTranslations(translationData.data.ayahs);
      setSelectedHizb(hizbNumber);
    } catch (err) {
      console.error(`Gagal mengambil Hizb Quarter ${hizbNumber}:`, err);
    }
  };

  return (
    <div className="min-h-screen bg-cover bg-center font-optimaAlt" style={{ backgroundImage: "url('/fix1.jpeg')" }}>
      <nav className="bg-green-700 text-white px-6 py-4 shadow-md flex justify-between items-center">
        <div className="flex items-center gap-2">
          <img src="/fix.png" alt="logo" className="w-8 h-6" />
          <h1 className="text-xl font-bold font-quattro">Al-Qur'an Digital</h1>
        </div>
        <ul className="flex gap-6 text-sm font-medium">
          <li className="hover:text-yellow-300 flex items-center gap-1">
            <FontAwesomeIcon icon={faHome} />
            <Link to="/home">Home</Link>
          </li>
          <li className="hover:text-yellow-300 flex items-center gap-1">
            <FontAwesomeIcon icon={faBookOpen} />
            <Link to="/baca">Chapter</Link>
          </li>
          <li className="hover:text-yellow-300 flex items-center gap-1">
            <FontAwesomeIcon icon={faMagnifyingGlass} />
            <Link to="/cari">Find</Link>
          </li>
          <li className="hover:text-yellow-300 flex items-center gap-1">
            <FontAwesomeIcon icon={faStarAndCrescent} />
            <Link to="/asmaulhusna">Asmaul Husna</Link>
          </li>
        </ul>
      </nav>
      <div className="p-6">
      <h2 className="text-2xl font-bold text-center text-green-700 mb-6">
              Daftar Hizb
            </h2>
        {!selectedHizb ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
            {Array.from({ length: totalHizbQuarters }, (_, i) => (
              <div
                key={i}
                onClick={() => fetchHizbQuarter(i + 1)}
                className="bg-white/80 rounded-lg shadow text-center text-green-800 font-medium text-sm p-4 cursor-pointer hover:bg-green-100 transition"
              >
                Hizb Quarter {i + 1}
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white/90 p-6 rounded-xl shadow-lg max-h-[80vh] overflow-y-auto">
            <button
              onClick={() => setSelectedHizb(null)}
              className="mb-4 text-green-700 hover:underline"
            >
              ← Kembali ke daftar Hizb Quarter
            </button>
            <h2 className="text-xl font-bold text-green-800 mb-4">Hizb Quarter {selectedHizb}</h2>
            {ayahs.map((ayah, idx) => (
              <div key={ayah.number} className="mb-4 border-b pb-3">
                <p className="text-2xl text-right font-lateef text-gray-900 leading-loose" dir="rtl">
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

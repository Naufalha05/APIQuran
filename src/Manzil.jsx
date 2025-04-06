import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faBookOpen,
  faMagnifyingGlass,
  faStarAndCrescent,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
export default function Manzil() {
  const [selectedManzil, setSelectedManzil] = useState(null);
  const [ayahs, setAyahs] = useState([]);
  const [translations, setTranslations] = useState([]);

  const manzilInfo = [
    {
      number: 1,
      surahs: "Al-Fatihah (1) - An-Nisa' (4)",
      image: "/sen.jpg",
    },
    {
      number: 2,
      surahs: "Al-Ma'idah (5) - At-Tawbah (9)",
      image: "/sel.jpg",
    },
    {
      number: 3,
      surahs: "Yunus (10) - An-Nahl (16)",
      image: "/rab.jpg",
    },
    {
      number: 4,
      surahs: "Al-Isra' (17) - Al-Furqan (25)",
      image: "/kam.jpg",
    },
    {
      number: 5,
      surahs: "Ash-Shu'ara' (26) - Ya-Sin (36)",
      image: "/sab.jpg",
    },
    {
      number: 6,
      surahs: "As-Saffat (37) - Al-Hujurat (49)",
      image: "/sabtu.jpg",
    },
    {
      number: 7,
      surahs: "Qaf (50) - An-Nas (114)",
      image: "/ming.jpg",
    },
  ];

  const fetchManzil = async (number) => {
    try {
      const arabRes = await fetch(
        `https://api.alquran.cloud/v1/manzil/${number}/quran-uthmani`
      );
      const transRes = await fetch(
        `https://api.alquran.cloud/v1/manzil/${number}/en.asad`
      );

      const arabData = await arabRes.json();
      const transData = await transRes.json();

      setAyahs(arabData.data.ayahs);
      setTranslations(transData.data.ayahs);
      setSelectedManzil(number);
    } catch (err) {
      console.error("Gagal fetch data Manzil:", err);
    }
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat font-optimaAlt"
      style={{ backgroundImage: "url('/fix1.jpeg')" }}
    >
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
        {!selectedManzil ? (
          <>
            <h2 className="text-2xl font-bold text-center text-green-700 mb-6">
              Daftar Manzil
            </h2>
            <div className="space-y-6">
              <div className="flex justify-center gap-6 flex-wrap">
                {manzilInfo.slice(0, 3).map((m) => (
                  <Card key={m.number} manzil={m} fetchManzil={fetchManzil} />
                ))}
              </div>
              <div className="flex justify-center gap-6 flex-wrap">
                {manzilInfo.slice(3, 6).map((m) => (
                  <Card key={m.number} manzil={m} fetchManzil={fetchManzil} />
                ))}
              </div>
              <div className="flex justify-center">
                <Card manzil={manzilInfo[6]} fetchManzil={fetchManzil} />
              </div>
            </div>
          </>
        ) : (
          <div className="bg-white/90 p-6 rounded-xl shadow-lg max-h-[80vh] overflow-y-auto">
            <button
              onClick={() => setSelectedManzil(null)}
              className="mb-4 text-green-700 hover:underline"
            >
              ← Kembali ke daftar Manzil
            </button>
            <h2 className="text-xl font-bold text-green-800 mb-4">
              Manzil {selectedManzil}
            </h2>
            {ayahs.map((ayah, idx) => (
              <div key={ayah.number} className="mb-4 border-b pb-3">
                <p className="text-2xl text-right font-lateef text-gray-900" dir="rtl">
                  {ayah.text}
                </p>
                <p className="text-sm text-gray-700 mt-1">
                  {translations[idx]?.text || "Terjemahan tidak tersedia."}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function Card({ manzil, fetchManzil }) {
  return (
    <div
      onClick={() => fetchManzil(manzil.number)}
      className="w-40 aspect-square bg-white rounded-2xl shadow-md p-4 cursor-pointer hover:bg-green-100 transition-all flex flex-col items-center justify-center text-center"
    >
      <div className="w-16 h-16 mb-3">
        <img
          src={manzil.image}
          alt={`Manzil ${manzil.number}`}
          className="w-full h-full object-contain"
        />
      </div>
      <h3 className="text-green-700 font-semibold">Manzil {manzil.number}</h3>
      <p className="text-sm text-gray-600 mt-1">{manzil.surahs}</p>
    </div>
  );
}

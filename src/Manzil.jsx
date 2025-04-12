import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleQuestion, faHome, faBookOpen, faMagnifyingGlass, faStarAndCrescent } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Menu  from "./Menu";
export default function Manzil() {
  const [selectedManzil, setSelectedManzil] = useState(null);
  const [ayahs, setAyahs] = useState([]);
  const [translations, setTranslations] = useState([]);
  const [isGlossaryOpen, setIsGlossaryOpen] = useState(false);

  const manzilInfo = [
    { number: 1, surahs: "Al-Fatihah (1) - An-Nisa' (4)", image: "/sen.jpg" },
    { number: 2, surahs: "Al-Ma'idah (5) - At-Tawbah (9)", image: "/sel.jpg" },
    { number: 3, surahs: "Yunus (10) - An-Nahl (16)", image: "/rab.jpg" },
    { number: 4, surahs: "Al-Isra' (17) - Al-Furqan (25)", image: "/kam.jpg" },
    { number: 5, surahs: "Ash-Shu'ara' (26) - Ya-Sin (36)", image: "/sab.jpg" },
    { number: 6, surahs: "As-Saffat (37) - Al-Hujurat (49)", image: "/sabtu.jpg" },
    { number: 7, surahs: "Qaf (50) - An-Nas (114)", image: "/ming.jpg" },
  ];

  const fetchManzil = async (number) => {
    try {
      const arabRes = await fetch(
        `https://api.alquran.cloud/v1/manzil/${number}/quran-uthmani`
      );
      const transRes = await fetch(
        `https://api.alquran.cloud/v1/manzil/${number}/id.indonesian`
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

  const toggleGlossary = () => {
    setIsGlossaryOpen(!isGlossaryOpen);
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat font-optimaAlt pt-16"
      style={{ backgroundImage: "url('/fix1.jpeg')" }}
    >
      <nav className="fixed top-0 left-0 right-0 bg-green-700 bg-opacity-90 text-white px-6 py-4 shadow-md flex justify-between items-center z-50">
        <div className="flex items-center gap-2">
          <img src="/fix.png" alt="logo" className="w-8 h-6" />
          <h1 className="text-xl font-bold font-">SaQu</h1>
        </div>
        <ul className="hidden md:flex gap-6 text-sm font-medium font-bold">
          <li className="hover:text-yellow-300 cursor-pointer flex items-center gap-1">
            <FontAwesomeIcon icon={faHome} />
            <Link to="/home" className="font-bold text-base">Home</Link>
          </li>
          <li className="hover:text-yellow-300 cursor-pointer flex items-center gap-1">
            <FontAwesomeIcon icon={faBookOpen} />
            <Link to="/baca" className="font-bold text-base">Chapter</Link>
          </li>
          <li className="hover:text-yellow-300 cursor-pointer flex items-center gap-1">
            <FontAwesomeIcon icon={faMagnifyingGlass} />
            <Link to="/cari" className="font-bold text-base">Find</Link>
          </li>
          <li className="hover:text-yellow-300 cursor-pointer flex items-center gap-1">
            <FontAwesomeIcon icon={faStarAndCrescent} />
            <Link to="/asmaulhusna" className="font-bold text-base">Asmaul Husna</Link>
          </li>
        </ul>
      </nav>
      
      <div className="p-6">
        {!selectedManzil ? (
          <>
            <h2 className="text-2xl font-bold text-center text-green-700 mb-6 font-optimaAlt">
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

      <div
  onClick={toggleGlossary}
  className="fixed bottom-3 right-6 bg-green-700 text-white p-4 rounded-full cursor-pointer shadow-lg z-50"
>
  <FontAwesomeIcon icon={faCircleQuestion} className="text-2xl" />
</div>

{isGlossaryOpen && (
  <div className="fixed bottom-24 right-6 bg-white p-6 rounded-lg shadow-lg w-72 max-h-72 overflow-y-auto z-50">
    <button
      onClick={toggleGlossary}
      className="absolute top-2 right-2 text-green-700 font-bold"
    >
      X
    </button>
    <h3 className="text-xl font-bold text-green-700">Glosarium</h3>
    <ul className="mt-4 text-sm text-gray-700 text-justify">
      <li>
        <strong>Manzil</strong> dalam konteks Al-Qur'an merujuk pada pembagian Al-Qur'an menjadi beberapa bagian yang lebih kecil, yang dikenal sebagai manzil. Tujuan utama dari pembagian ini adalah untuk mempermudah pembacaan dan penghafalan Al-Qur'an, serta memudahkan pembacaan setiap hari sehingga seseorang bisa menyelesaikan Al-Qur'an dalam waktu tertentu, seperti dalam 7 hari.
      </li>
    </ul>
  </div>
)}
<Menu />
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

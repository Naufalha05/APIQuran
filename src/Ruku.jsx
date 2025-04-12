import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faBookOpen, faMagnifyingGlass, faStarAndCrescent, faCircleQuestion } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Menu from "./Menu";

export default function Ruku() {
  const [selectedRuku, setSelectedRuku] = useState(null);
  const [ayahs, setAyahs] = useState([]);
  const [translations, setTranslations] = useState([]);
  const [isGlossaryOpen, setIsGlossaryOpen] = useState(false);

  const totalRukus = 558;

  const fetchRuku = async (rukuNumber) => {
    try {
      const arabRes = await fetch(`https://api.alquran.cloud/v1/ruku/${rukuNumber}/quran-uthmani`);
      const transRes = await fetch(`https://api.alquran.cloud/v1/ruku/${rukuNumber}/id.indonesian`);

      const arabData = await arabRes.json();
      const transData = await transRes.json();

      setAyahs(arabData.data.ayahs);
      setTranslations(transData.data.ayahs);
      setSelectedRuku(rukuNumber);
    } catch (err) {
      console.error(`Gagal fetch Ruku ${rukuNumber}:`, err);
    }
  };

  const toggleGlossary = () => {
    setIsGlossaryOpen(!isGlossaryOpen);
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center font-optimaAlt pt-16"
      style={{ backgroundImage: "url('/fix1.jpeg')" }}
    >
      <nav className="fixed top-0 left-0 right-0 bg-green-700 bg-opacity-90 text-white px-6 py-4 shadow-md flex justify-between items-center z-50">
        <div className="flex items-center gap-2">
          <img src="/fix.png" alt="logo" className="w-8 h-6" />
          <h1 className="text-xl font-bold font-optimaAlt">SaQu</h1>
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
        <h2 className="text-2xl font-bold text-center text-green-700 mb-6">
          Daftar Ruku'
        </h2>
        {!selectedRuku ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
            {Array.from({ length: totalRukus }, (_, i) => (
              <div
                key={i}
                onClick={() => fetchRuku(i + 1)}
                className="bg-white/80 rounded-lg shadow text-center text-green-800 font-medium text-sm p-4 cursor-pointer hover:bg-green-100 transition"
              >
                Ruku {i + 1}
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white/90 p-6 rounded-xl shadow-lg max-h-[80vh] overflow-y-auto">
            <button
              onClick={() => setSelectedRuku(null)}
              className="mb-4 text-green-700 hover:underline"
            >
              ← Kembali ke daftar Ruku
            </button>
            <h2 className="text-xl font-bold text-green-800 mb-4">Ruku {selectedRuku}</h2>
            {ayahs.map((ayah, idx) => (
              <div key={ayah.number} className="mb-4 border-b pb-3">
                <p
                  className="text-2xl text-right font-lateef text-gray-900 leading-loose"
                  dir="rtl"
                >
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
            <li><strong>Ruku</strong> dalam Al-Qur'an adalah bagian dari bacaan yang menunjukkan titik atau bagian di mana seseorang perlu melakukan rukuk (sujud) saat melaksanakan shalat. Secara harfiah, ruku' berarti tekuk atau menundukkan kepala. Dalam konteks Al-Qur'an, ruku' merujuk pada tanda atau pembagian yang menunjukkan adanya perubahan atau pembatasan bagian tertentu dari sebuah surah atau ayat.</li>
            <li>Setiap surah dalam Al-Qur'an terbagi menjadi beberapa ruku', yang biasanya terdiri dari beberapa ayat. Pembagian ini berfungsi untuk mempermudah pembacaan dan hafalan Al-Qur'an. Ruku' juga memberikan pemahaman tentang perubahan tema atau poin penting dalam suatu surah atau ayat.</li>
          </ul>
        </div>
      )}
      <Menu />
    </div>
  );
}

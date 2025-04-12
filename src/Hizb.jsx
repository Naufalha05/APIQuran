import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faHome, faBookOpen, faMagnifyingGlass, faStarAndCrescent, faCircleQuestion,} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Menu from "./Menu";
export default function Hizb() {
  const [selectedHizb, setSelectedHizb] = useState(null);
  const [ayahs, setAyahs] = useState([]);
  const [translations, setTranslations] = useState([]);
  const [isGlossaryOpen, setIsGlossaryOpen] = useState(false);

  const totalHizbQuarters = 240;

  const fetchHizbQuarter = async (hizbNumber) => {
    try {
      const arabicRes = await fetch(
        `https://api.alquran.cloud/v1/hizbQuarter/${hizbNumber}/quran-uthmani`
      );
      const translationRes = await fetch(
        `https://api.alquran.cloud/v1/hizbQuarter/${hizbNumber}/id.indonesian`
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
            <h2 className="text-xl font-bold text-green-800 mb-4">
              Hizb Quarter {selectedHizb}
            </h2>
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
            <li>
              <strong>Hizb</strong> dalam Al-Qur'an adalah salah satu pembagian Al-Qur'an untuk mempermudah pembacaan dan penghafalan. Satu Hizb terdiri dari setengah bagian dari satu Juz. Karena Al-Qur'an terdiri dari 30 Juz, maka ada 60 Hizb dalam Al-Qur'an. Pembagian Hizb ini digunakan untuk mempermudah pembacaan, tadarus, atau penghafalan dengan tujuan agar lebih terstruktur dan mudah diikuti.
            </li>
            <li>
              <strong>Hizb Quarter</strong> (atau Rub' al-Hizb) adalah pembagian lebih lanjut dari Hizb. Setiap Hizb terbagi menjadi empat bagian yang disebut Rub' al-Hizb, yang berarti perempat Hizb. Dengan pembagian ini, satu Hizb dibagi menjadi empat Rub' al-Hizb, dan karena ada 60 Hizb dalam Al-Qur'an, totalnya ada 240 Rub' al-Hizb. Pembagian ini memberikan fleksibilitas bagi pembaca Al-Qur'an untuk membaca dalam potongan yang lebih kecil, misalnya seperempat Hizb dalam sehari, sehingga lebih mudah dikelola dalam waktu tadarus atau penghafalan.
            </li>
          </ul>
        </div>
      )}
      <Menu />
    </div>
  );
}

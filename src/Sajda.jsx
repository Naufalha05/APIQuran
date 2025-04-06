import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faBookOpen,
  faMagnifyingGlass,
  faPersonPraying,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
export default function Sajda() {
  const [sajdaData, setSajdaData] = useState([]);
  const [selectedSurah, setSelectedSurah] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const arabRes = await fetch("https://api.alquran.cloud/v1/sajda/quran-uthmani");
      const transRes = await fetch("https://api.alquran.cloud/v1/sajda/en.asad");

      const arabData = await arabRes.json();
      const transData = await transRes.json();

      const sajdaAyahs = arabData.data.ayahs.map((ayah, index) => ({
        ...ayah,
        translation: transData.data.ayahs[index]?.text,
      }));

      setSajdaData(sajdaAyahs);
    };

    fetchData();
  }, []);

  const groupedBySurah = sajdaData.reduce((acc, ayah) => {
    const key = `${ayah.surah.number} - ${ayah.surah.englishName}`;
    if (!acc[key]) acc[key] = [];
    acc[key].push(ayah);
    return acc;
  }, {});

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
            <FontAwesomeIcon icon={faPersonPraying} />
            <Link to="/doa">Prayer</Link>
          </li>
        </ul>
      </nav>

      <div className="flex flex-col md:flex-row mt-6 px-4 gap-6">
        <div className="w-full md:w-1/3 bg-white rounded-xl shadow p-4 max-h-[80vh] overflow-y-auto">
          <h2 className="text-lg font-bold mb-4 text-green-700">Surah dengan Ayat Sajdah</h2>
          <ul className="space-y-2">
            {Object.keys(groupedBySurah).map((surahKey) => (
              <li
                key={surahKey}
                onClick={() => setSelectedSurah(surahKey)}
                className={`cursor-pointer px-3 py-2 rounded text-sm ${
                  selectedSurah === surahKey ? "bg-green-100 font-bold" : "hover:bg-green-50"
                }`}
              >
                {surahKey}
              </li>
            ))}
          </ul>
        </div>
        <div className="w-full md:w-2/3 bg-white rounded-xl shadow p-4 max-h-[80vh] overflow-y-auto">
          {selectedSurah ? (
            <>
              <h2 className="text-lg font-bold text-green-700 mb-4">{selectedSurah}</h2>
              <div className="space-y-6">
                {groupedBySurah[selectedSurah].map((ayah, idx) => (
                  <div key={ayah.number} className="border-b pb-4">
                    <p
                      className="text-right text-2xl text-gray-900 font-lateef leading-loose"
                      dir="rtl"
                    >
                      {ayah.text}
                    </p>
                    <p className="text-sm text-gray-700 mt-1">
                      {ayah.numberInSurah}. {ayah.translation}
                    </p>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <p className="text-gray-500 text-center mt-10">Pilih surah untuk melihat ayat sajdah</p>
          )}
        </div>
      </div>
    </div>
  );
}

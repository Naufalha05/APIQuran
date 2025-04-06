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
export default function Baca() {
  const [surahs, setSurahs] = useState([]);
  const [selectedSurahIndex, setSelectedSurahIndex] = useState(null);
  const [arabAyahs, setArabAyahs] = useState([]);
  const [translationAyahs, setTranslationAyahs] = useState([]);

  useEffect(() => {
    fetch("https://api.alquran.cloud/v1/quran/en.asad")
      .then((res) => res.json())
      .then((data) => setSurahs(data.data.surahs))
      .catch((err) => console.error("Error fetching surahs:", err));
  }, []);

  const handleSurahClick = async (index) => {
    setSelectedSurahIndex(index);

    const arabRes = await fetch("https://api.alquran.cloud/v1/quran/quran-uthmani");
    const translationRes = await fetch("https://api.alquran.cloud/v1/quran/en.asad");

    const arabData = await arabRes.json();
    const translationData = await translationRes.json();

    const arab = arabData.data.surahs[index].ayahs;
    const trans = translationData.data.surahs[index].ayahs;

    setArabAyahs(arab);
    setTranslationAyahs(trans);
  };

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

      <div className="flex flex-col md:flex-row mt-6 px-4 gap-6">
        <div className="w-full md:w-1/3 bg-white rounded-xl shadow p-4 max-h-[80vh] overflow-y-auto">
          <h2 className="text-lg font-bold mb-4 text-green-700">Daftar Surah</h2>
          <ul className="space-y-2">
            {surahs.map((surah, idx) => (
              <li
                key={surah.number}
                onClick={() => handleSurahClick(idx)}
                className="cursor-pointer hover:bg-green-100 px-3 py-2 rounded text-sm flex justify-between items-center"
              >
                <span>{surah.englishName}</span>
                <span className="text-xs text-gray-600">({surah.ayahs.length} ayat)</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="w-full md:w-2/3 bg-white rounded-xl shadow p-4 max-h-[80vh] overflow-y-auto">
          {selectedSurahIndex !== null ? (
            <>
              <h2 className="text-lg font-bold text-green-700 mb-4">
                {surahs[selectedSurahIndex].englishName} (
                {surahs[selectedSurahIndex].name})
              </h2>
              <div className="space-y-4">
                {arabAyahs.map((ayah, idx) => (
                  <div key={ayah.number} className="border-b pb-3">
                    <p className="text-right text-2xl font-semibold text-gray-900 leading-loose font-lateef" dir="rtl">
                      {ayah.text}
                    </p>
                    <p className="text-sm text-gray-700 mt-1">
                      {idx + 1}. {translationAyahs[idx]?.text}
                    </p>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <p className="text-gray-500 text-center mt-10">Pilih surah untuk melihat ayat</p>
          )}
        </div>
      </div>
    </div>
  );
}

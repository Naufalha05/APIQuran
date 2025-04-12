import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faHome, faBookOpen, faMagnifyingGlass, faStarAndCrescent, } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Cari() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const searchAyahs = async () => {
    if (!query) return;
    setLoading(true);
    try {
      const response = await fetch(
        `http://api.alquran.cloud/v1/search/${query}/all/id.indonesian`
      );
      const data = await response.json();
      if (data.data && data.data.matches) {
        setResults(data.data.matches);
      } else {
        setResults([]);
      }
    } catch (error) {
      console.error("Error fetching search results:", error);
      setResults([]);
    }
    setLoading(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") searchAyahs();
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('mossfix.jpeg')" }}
    >
      <nav className="fixed top-0 left-0 right-0 bg-green-700 bg-opacity-90 text-white px-6 py-4 shadow-md flex justify-between items-center z-50">
        <div className="flex items-center gap-2">
          <img src="fix.png" alt="logo" className="w-8 h-6" />
          <h1 className="text-xl font-bold font-quattro">Al-Qur'an Digital</h1>
        </div>
        <ul className="flex gap-6 text-sm font-medium font-bold">
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

      <div className="pt-24 px-4 flex justify-center">
        <div className="bg-white/10 backdrop-blur-md rounded-xl p-10 w-full max-w-6xl shadow-lg font-optimaAlt">
          <h1 className="text-3xl font-bold text-green-700 mb-6 text-center drop-shadow-md">
            Silahkan Cari Kata Tertentu
          </h1>
          <div className="flex gap-2 mb-6">
            <input
              type="text"
              className="flex-grow border border-gray-300 rounded-xl px-4 py-2"
              placeholder="Contoh: kebenaran, nabi, rahmat..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <button
              onClick={searchAyahs}
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-xl"
            >
              Cari
            </button>
          </div>
          {loading ? (
            <p className="text-center text-gray-600">🔄 Sedang mencari...</p>
          ) : (
            <div className="space-y-4 max-h-[60vh] overflow-y-auto px-2">
              {results.length > 0 ? (
                results.map((ayah, idx) => (
                  <div
                    key={idx}
                    className="bg-white/70 backdrop-blur-sm p-4 rounded-lg shadow-md"
                  >
                    <p className="text-sm text-gray-600 mb-1">
                      {ayah.surah.name} ({ayah.surah.number}:{ayah.numberInSurah})
                    </p>
                    <p className="text-lg text-gray-900">{ayah.text}</p>
                  </div>
                ))
              ) : query ? (
                <p className="text-center text-gray-500">
                  ❌ Tidak ada hasil ditemukan.
                </p>
              ) : null}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

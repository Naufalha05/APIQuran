import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faBookOpen,
  faMagnifyingGlass,
  faStarAndCrescent,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: "url('mossfix.jpeg')",
      }}
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
        <div className="bg-white/10 backdrop-blur-md rounded-xl p-10 w-full max-w-6xl shadow-lg">
          <div className="text-center mb-10 text-black">
            <h2 className="text-4xl font-bold mb-2 drop-shadow-md font-optimaAlt">
            Welcome to the Al-Qur'an Digital
            </h2>
            <p className="text-lg drop-shadow-md max-w-2xl mx-auto font-optimaAlt">
            This website helps you read, search for chapters, and other things related to the Quran digitally.. 🌙
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 justify-items-center">
            {[
              { title: "Chapter", img: "surah.jpg", link: "/baca" },
              { title: "Sajda", img: "sajda1.jpg", link: "/sajda" },
              { title: "Juz", img: "juz.jpg", link: "/juz" },
              { title: "Manzil", img: "manzil.jpg", link: "/manzil" },
              { title: "Ruku'", img: "ruku.jpg", link: "/ruku" },
              { title: "Hizb", img: "hizb1.jpg", link: "/hizb" },
            ].map((card, i) => (
              <Link
                key={i}
                to={card.link}
                className="bg-white/20 backdrop-blur-sm rounded-xl shadow-md p-4 w-64 hover:scale-105 transform transition duration-300 ease-in-out text-black no-underline"
              >
                <img
                  src={card.img}
                  alt={card.title}
                  className="w-full h-40 object-cover rounded-lg mb-2"
                />
                <h3 className="text-green-700 font-semibold text-center">
                  {card.title}
                </h3>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

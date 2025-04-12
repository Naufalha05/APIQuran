import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faBookOpen, faMagnifyingGlass, faStarAndCrescent } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="min-h-screen">
      <nav className="fixed top-0 left-0 right-0 bg-green-700 bg-opacity-90 text-white px-6 py-4 shadow-md flex justify-between items-center z-50">
        <div className="flex items-center gap-2">
          <img src="fix.png" alt="logo" className="w-8 h-6" />
          <h1 className="text-xl font-bold font-optimaAlt">SaQu</h1>
        </div>
        <ul className="hidden md:flex gap-6 text-sm font-medium font-bold">
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
      <section className="relative w-full h-screen">
        <img
          src="moslem.jpeg"
          alt="Al-Quran"
          className="w-full h-full object-cover"
        />
        <div className="absolute top-0 left-0 right-0 bottom-0 flex justify-center items-center bg-black bg-opacity-40">
          <h2 className="text-5xl text-white font-bold  font-optimaAlt text-center drop-shadow-md">Sahabat Qur'an</h2>
        </div>
      </section>
      <section className="py-16 bg-gray-100">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-3xl font-bolognia font-bold text-green-700 mb-6">Tentang Sahabat Qur'an</h3>
          <p className="text-lg text-gray-700">
            Sahabat Qur'an adalah platform untuk memudahkan umat Muslim dalam mengakses Al-Qur'an secara digital.
            Dengan tampilan yang bersih dan mudah diakses, kami berharap dapat membantu Anda lebih mudah dalam membaca dan memahami Al-Qur'an, dimanapun Anda berada.
            Tujuan dari website ini adalah untuk menyediakan Al-Qur'an yang interaktif dan mudah diakses oleh semua kalangan.
          </p>
        </div>
      </section>
      <section className="py-16 bg-white">
        <div className="text-center mb-12">
          <h3 className="text-3xl font-bold font-bolognia text-green-700">Fitur Sahabat Qur'an</h3>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-8 px-4">
          {[ 
            { 
              title: "Chapter", 
              img: "surah.jpg", 
              link: "/baca", 
              description: "Jelajahi dan baca berbagai surah dari Al-Qur'an. Setiap mengandung petunjuk hidup bagi umat Islam." 
            },
            { 
              title: "Sajda", 
              img: "sajda1.jpg", 
              link: "/sajda", 
              description: "Pelajari posisi-posisi sajda dalam Al-Qur'an yang memiliki makna dan hikmah tertentu." 
            },
            { 
              title: "Juz", 
              img: "juz.jpg", 
              link: "/juz", 
              description: "Navigasi melalui 30 bagian (Juz) Al-Qur'an untuk memudahkan dalam pembacaan." 
            },
            { 
              title: "Manzil", 
              img: "manzil.jpg", 
              link: "/manzil", 
              description: "Manzil membagi Al-Qur'an ke dalam bagian yang lebih kecil, memudahkan pembacaan harian." 
            },
            { 
              title: "Ruku'", 
              img: "ruku.jpg", 
              link: "/ruku", 
              description: "Pelajari bagian-bagian ruku’ dalam Al-Qur'an, tempat-tempat yang disarankan untuk melakukan sujud." 
            },
            { 
              title: "Hizb", 
              img: "hizb1.jpg", 
              link: "/hizb", 
              description: "Hizb membagi Al-Qur'an menjadi unit kecil untuk memudahkan dalam menghafal dan membaca." 
            }
          ].map((card, i) => (
            <Link
              key={i}
              to={card.link}
              className="bg-white shadow-lg rounded-xl overflow-hidden transform transition duration-300 ease-in-out hover:scale-105 hover:shadow-xl"
            >
              <img
                src={card.img}
                alt={card.title}
                className="w-full h-40 object-cover"
              />
              <div className="p-6 text-center">
                <h4 className="text-xl font-semibold font-playfair text-green-700">{card.title}</h4>
                <p className="text-sm text-gray-600 mt-2">{card.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}

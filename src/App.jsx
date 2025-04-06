import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Home from "./Home";
import Baca from "./Baca";
import Sajda from "./Sajda";
import Juz from "./Juz";
import Manzil from "./Manzil";
import Ruku from "./Ruku";
import Hizb from "./Hizb";
import Cari from "./Cari";
import AsmaulHusna from "./AsmaulHusna";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="/home" element={<Home />} />
        <Route path="/sajda" element={<Sajda />} />
        <Route path="/cari" element={<Cari />} />
        <Route path="/asmaulhusna" element={<AsmaulHusna />} />
        <Route path="/baca" element={<Baca />} />
        <Route path="/juz" element={<Juz />} />
        <Route path="/manzil" element={<Manzil />} />
        <Route path="/ruku" element={<Ruku />} />
        <Route path="/hizb" element={<Hizb />} />
      </Routes>
    </Router>
  );
}

export default App;

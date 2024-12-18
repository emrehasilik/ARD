// src/components/Header.jsx
import React from "react";
import { useLocation } from "react-router-dom";

const Header = () => {
  const location = useLocation();

  // Sayfa başlıklarını belirlemek için bir mapping yapıyoruz
  const pageTitles = {
    "/basvurular": "Başvurular",
    "/avukatlar": "Avukatlar",
    "/davalar": "Davalar",
    "/hak-ihlalleri": "Hak İhlalleri",
    "/medya-taramasi": "Hak İhlal İzleme > Medya Taraması",
    "/stk-verileri": "Hak İhlal İzleme > STK Verileri",
    "/baro-komisyonlari": "Hak İhlal İzleme > Baro Komisyonları",
    "/kamu-kurumlari": "Hak İhlal İzleme > Kamu Kurumları",
  };

  // Anlık yol için başlık belirleniyor
  const title = pageTitles[location.pathname] || "Sayfa";

  return (
    <div className="bg-gray-100 p-4 shadow flex justify-between items-center">
      <h1 className="text-2xl font-bold text-gray-700">{title}</h1>
    </div>
  );
};

export default Header;

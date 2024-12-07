// src/components/Application.jsx
import React, { useState } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header"; // Header bileşeni içe aktarılıyor
import AddApplication from "./AddApplication";

const Application = () => {
  const [showAddApplication, setShowAddApplication] = useState(false);
  const [applications, setApplications] = useState([]);
  const [selectedDetails, setSelectedDetails] = useState(null);

  const handleSaveApplication = (data) => {
    setApplications([...applications, data]);
    setShowAddApplication(false);
  };

  const handleShowDetails = (details) => {
    setSelectedDetails(details);
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <Sidebar />

      {/* Sağ İçerik Alanı */}
      <div className="flex-1 flex flex-col">
        {/* Header Bileşeni */}
        <Header />

        {/* İçerik Bölümü */}
        <div className="bg-gray-200 flex-1 p-8">
          <div className="flex justify-end mb-4">
            <button
              className="px-4 py-2 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600"
              onClick={() => setShowAddApplication(true)}
            >
              Başvuru Ekle
            </button>
          </div>
          <div className="text-gray-700">
            <table className="table-auto w-full border border-gray-300">
              <thead className="bg-gray-100">
                <tr>
                  <th className="border border-gray-300 px-4 py-2">T.C. Kimlik No</th>
                  <th className="border border-gray-300 px-4 py-2">Başvuruyu Yapan</th>
                  <th className="border border-gray-300 px-4 py-2">Başvuru Türü</th>
                  <th className="border border-gray-300 px-4 py-2">Detaylar</th>
                </tr>
              </thead>
              <tbody>
                {applications.map((app, index) => (
                  <tr
                    key={index}
                    className={index % 2 === 0 ? "bg-white" : "bg-gray-100"}
                  >
                    <td className="border border-gray-300 px-4 py-2">{app.tcKimlikNo}</td>
                    <td className="border border-gray-300 px-4 py-2">{`${app.adi} ${app.soyadi}`}</td>
                    <td className="border border-gray-300 px-4 py-2">{app.basvuruTuru}</td>
                    <td className="border border-gray-300 px-4 py-2">
                      <button
                        className="text-blue-500 hover:underline"
                        onClick={() => handleShowDetails(app.detaylar)}
                      >
                        Dava Detayları
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {selectedDetails && (
              <div className="mt-4 p-4 bg-white shadow rounded">
                <h3 className="text-lg font-bold mb-2">Dava Detayları</h3>
                <p><strong>Başvuru No:</strong> {selectedDetails.basvuruNo}</p>
                <p><strong>Başvuran Türü:</strong> {selectedDetails.basvuranTuru}</p>
                <p><strong>Başvuru Tarihi:</strong> {selectedDetails.basvuruTarihi}</p>
                <p><strong>Takip Eden Avukat:</strong> {selectedDetails.takipAvukat}</p>
                <p><strong>Yakınma/İhlal Nedeni:</strong> {selectedDetails.ihlalNedeni}</p>
                <p><strong>Başvuruyu Alan:</strong> {selectedDetails.basvuruyuAlan}</p>
                <p><strong>Dosya Açıklaması:</strong> {selectedDetails.dosyaAciklama}</p>
                {selectedDetails.davaBilgileri && (
                  <div>
                    <h4 className="font-semibold mt-2">Dava Bilgileri:</h4>
                    <p><strong>Dosya Numarası:</strong> {selectedDetails.davaBilgileri.dosyaNumarasi}</p>
                    <p><strong>Mahkeme:</strong> {selectedDetails.davaBilgileri.mahkeme}</p>
                    <p><strong>Mahkeme Dosya No:</strong> {selectedDetails.davaBilgileri.mahkemeDosyaNo}</p>
                    <p><strong>Sonucu Açıklama:</strong> {selectedDetails.davaBilgileri.sonucuAciklama}</p>
                    <p><strong>Sonucu Aşama:</strong> {selectedDetails.davaBilgileri.sonucuAsama}</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* AddApplication Bileşeni - Butona basıldığında açılır */}
      {showAddApplication && (
        <AddApplication
          onClose={() => setShowAddApplication(false)}
          onSave={handleSaveApplication}
        />
      )}
    </div>
  );
};

export default Application;

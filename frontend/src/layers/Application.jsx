import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import AddApplication from "../components/AddApplication";
import { AiOutlineClose } from "react-icons/ai"; // React Icons'dan kapatma simgesi

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

        {/* İçerik ve Detay Bölümü */}
        <div className="flex-1 flex flex-row bg-gray-200 p-8">
          {/* Tablonun Bulunduğu Bölüm */}
          <div className="flex-1 max-h-full overflow-y-auto">
            <div className="flex justify-end mb-4">
              <button
                className="px-4 py-2 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600"
                onClick={() => setShowAddApplication(true)}
              >
                Başvuru Ekle
              </button>
            </div>

            <div className="text-gray-700 max-h-[520px] overflow-y-auto">
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
            </div>
          </div>

          {/* Detay Bölümü */}
          <div className="w-1/3 bg-white shadow-lg rounded-lg p-4 ml-4 overflow-y-auto max-h-[570px]">
            {selectedDetails ? (
              <div>
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-bold text-gray-800">Başvuru Bilgileri</h3>
                  <button
                    className="w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600"
                    onClick={() => setSelectedDetails(null)}
                  >
                    <AiOutlineClose size={20} />
                  </button>
                </div>
                <div className="grid grid-cols-1 gap-4 text-gray-700 text-sm">
                  <p><strong>Başvuran Türü:</strong> {selectedDetails.basvuranTuru}</p>
                  <p><strong>Başvuru Tarihi:</strong> {selectedDetails.basvuruTarihi}</p>
                  <p><strong>Başvuruyu Alan:</strong> {selectedDetails.basvuruyuAlan}</p>
                  <p><strong>Takip Eden Avukat:</strong> {selectedDetails.takipAvukat}</p>
                  <p><strong>İhlal Nedeni:</strong> {selectedDetails.ihlalNedeni}</p>
                  <p><strong>Açıklama:</strong> {selectedDetails.dosyaAciklama}</p>
                </div>
                {selectedDetails.davaBilgileri && (
                  <div className="mt-4">
                    <h4 className="text-lg font-semibold text-gray-800 mb-2">Dava Bilgileri</h4>
                    <p><strong>Dosya Numarası:</strong> {selectedDetails.davaBilgileri.dosyaNumarasi}</p>
                    <p><strong>Mahkeme:</strong> {selectedDetails.davaBilgileri.mahkeme}</p>
                    <p><strong>Mahkeme Dosya Numarası:</strong> {selectedDetails.davaBilgileri.mahkemeDosyaNo}</p>
                    <p><strong>Sonuç Açıklama:</strong> {selectedDetails.davaBilgileri.sonucuAciklama}</p>
                    <p><strong>Sonuç Aşama:</strong> {selectedDetails.davaBilgileri.sonucuAsama}</p>
                  </div>
                )}
              </div>
            ) : (
              <p className="text-gray-500">Detayları görmek için bir başvuru seçin.</p>
            )}
          </div>
        </div>
      </div>

      {/* AddApplication Bileşeni */}
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

import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import AddApplication from "../components/AddApplication";
import { AiOutlineClose } from "react-icons/ai"; // React Icons'dan kapatma simgesi
import useApplicationStore from "../stores/ApplicationStore"; // Zustand Store'u import et

const Application = () => {
  const [showAddApplication, setShowAddApplication] = useState(false);
  const [selectedDetails, setSelectedDetails] = useState(null);
  const [statuses, setStatuses] = useState({});
  const [notification, setNotification] = useState(""); // Bildirim için state

  // Zustand Store'dan veriler ve fonksiyonları alıyoruz
  const { applications, addApplication } = useApplicationStore();

  const handleSaveApplication = (data) => {
    addApplication(data); // Veriyi store'a ekle
    setShowAddApplication(false);
    setNotification("Başvuru Başarıyla Eklendi");
    setTimeout(() => setNotification(""), 3000); // Bildirimi 2 saniye sonra kaldır
  };

  const handleShowDetails = (details) => {
    setSelectedDetails(details);
  };

  const handleStatusChange = (tcKimlikNo, status) => {
    // Zustand Store'dan güncelleme fonksiyonunu çağırıyoruz
    useApplicationStore.getState().updateApplicationStatus(tcKimlikNo, status);
    setStatuses((prevStatuses) => ({ ...prevStatuses, [tcKimlikNo]: status }));
  };
  

  const getStatusClass = (status) => {
    switch (status) {
      case "Onaylandı":
        return "text-green-500 font-semibold";
      case "Reddedildi":
        return "text-red-500 font-semibold";
      default:
        return "text-gray-500 font-semibold";
    }
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <Sidebar />

      {/* Sağ İçerik Alanı */}
      <div className="flex-1 flex flex-col">
        {/* Header Bileşeni */}
        <Header />

        {/* Bildirim */}
        {notification && (
          <div className="fixed bottom-4 right-4 bg-green-500 text-white px-4 py-2 rounded shadow-lg">
            {notification}
          </div>
        )}

        {/* İçerik ve Detay Bölümü */}
        <div className="flex-1 flex flex-col bg-gray-200 p-8">
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

            <div className="text-gray-700 max-h-[520px] w-full overflow-y-auto">
              <table className="table-auto w-full border border-gray-300">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="border border-gray-300 px-4 py-2">T.C. Kimlik No</th>
                    <th className="border border-gray-300 px-4 py-2">Başvuruyu Yapan</th>
                    <th className="border border-gray-300 px-4 py-2">İhlal/Yakınma Nedeni</th>
                    <th className="border border-gray-300 px-4 py-2">Detaylar</th>
                    <th className="border border-gray-300 px-4 py-2">Durum</th>
                    <th className="border border-gray-300 px-4 py-2">İşlem</th>
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
                      <td className="border border-gray-300 px-4 py-2">{app.ihlalNedeni}</td>
                      <td className="border border-gray-300 px-4 py-2">
                        <button
                          className="text-blue-500 hover:underline"
                          onClick={() => handleShowDetails(app.detaylar)}
                        >
                          Dava Detayları
                        </button>
                      </td>
                      <td className={`border border-gray-300 px-4 py-2 ${getStatusClass(statuses[app.tcKimlikNo] || "Bekliyor")}`}>
                        {statuses[app.tcKimlikNo] || "Bekliyor"}
                      </td>
                      <td className="border border-gray-300 px-4 py-2">
                        <div className="grid grid-cols-2 gap-2">
                          <button
                            className="px-2 py-1 bg-green-500 text-white rounded hover:bg-green-600"
                            onClick={() => handleStatusChange(app.tcKimlikNo, "Onaylandı")}
                          >
                            Onayla
                          </button>
                          <button
                            className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                            onClick={() => handleStatusChange(app.tcKimlikNo, "Reddedildi")}
                          >
                            Reddet
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Detay Bölümü Tablo Altında */}
          {selectedDetails && (
            <div className="w-full bg-white shadow-lg rounded-lg p-4 mt-4 overflow-y-auto max-h-[250px]">
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
                  <p><strong>Başvuru Numarası:</strong> {selectedDetails.basvuruNumarasi}</p>
                  <p><strong>Başvuran Türü:</strong> {selectedDetails.basvuranTuru}</p>
                  <p><strong>Başvuru Tarihi:</strong> {selectedDetails.basvuruTarihi}</p>
                  <p><strong>Başvuruyu Alan:</strong> {selectedDetails.basvuruyuAlan}</p>
                  <p><strong>Takip Eden Avukat:</strong> {selectedDetails.takipAvukat}</p>
                  <p><strong>Açıklama:</strong> {selectedDetails.dosyaAciklama}</p>
                </div>
                {selectedDetails.davaBilgileri && (
                  <div className="mt-4 grid grid-cols-1 gap-4 text-gray-700 text-sm">
                    <h3 className="text-xl font-bold text-gray-800">Dava Bilgileri</h3>
                    <p><strong>Dosya Numarası:</strong> {selectedDetails.davaBilgileri.dosyaNumarasi}</p>
                    <p><strong>Mahkeme:</strong> {selectedDetails.davaBilgileri.mahkeme}</p>
                    <p><strong>Mahkeme Dosya Numarası:</strong> {selectedDetails.davaBilgileri.mahkemeDosyaNo}</p>
                    <p><strong>Sonuç Açıklama:</strong> {selectedDetails.davaBilgileri.sonucuAciklama}</p>
                    <p><strong>Sonuç Aşama:</strong> {selectedDetails.davaBilgileri.sonucuAsama}</p>
                  </div>
                )}
              </div>
            </div>
          )}
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

import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import AddLawyer from "../components/AddLawyer";
import Header from "../components/Header";
import useLawyerStore from "../stores/LawyerStore"; // Store'u ekle

const Lawyer = () => {
  const [showAddLawyer, setShowAddLawyer] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  // Zustand Store'dan gerekli veriler ve fonksiyonları al
  const { lawyers, addLawyer, removeLawyer, getLawyer } = useLawyerStore();

  const handleSaveLawyer = (lawyerData) => {
    addLawyer(lawyerData); // Store'a yeni avukat ekle
    setShowAddLawyer(false);
  };

  const filteredLawyers = lawyers.filter((lawyer) => {
    const lowerCaseSearchTerm = searchTerm.toLowerCase();
    const fullName = `${lawyer.name} ${lawyer.surname}`.toLowerCase();
    return (
      lawyer.tcKimlikNo.toLowerCase().includes(lowerCaseSearchTerm) ||
      lawyer.name.toLowerCase().includes(lowerCaseSearchTerm) ||
      lawyer.surname.toLowerCase().includes(lowerCaseSearchTerm) ||
      fullName.includes(lowerCaseSearchTerm)
    );
  });

  useEffect(() => {
    // Örnek kullanım: İlk avukatı konsola yazdır
    if (lawyers.length > 0) {
      console.log(getLawyer(lawyers[0].tcKimlikNo));
    }
  }, [lawyers, getLawyer]);

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <Sidebar />

      {/* Sağ İçerik Alanı */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <Header />

        {/* İçerik Alanı */}
        <div className="bg-gray-200 flex-1 p-8">
          <div className="flex justify-between mb-4">
            <input
              type="text"
              placeholder="Avukat Ara"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 flex-grow mr-4"
            />
            <button
              className="px-4 py-2 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600"
              onClick={() => setShowAddLawyer(true)}
            >
              Avukat Ekle
            </button>
          </div>

          {/* Avukatlar Tablosu */}
          <div className="text-gray-700">
            <table className="table-auto w-full border border-gray-300">
              <thead className="bg-gray-100">
                <tr>
                  <th className="border border-gray-300 px-4 py-2">T.C. Kimlik No</th>
                  <th className="border border-gray-300 px-4 py-2">Ad</th>
                  <th className="border border-gray-300 px-4 py-2">Soyad</th>
                  <th className="border border-gray-300 px-4 py-2">Telefon</th>
                  <th className="border border-gray-300 px-4 py-2">E-posta</th>
                  <th className="border border-gray-300 px-4 py-2">İşlem</th>
                </tr>
              </thead>
              <tbody>
                {filteredLawyers.map((lawyer, index) => (
                  <tr
                    key={index}
                    className={index % 2 === 0 ? "bg-white" : "bg-gray-100"}
                  >
                    <td className="border border-gray-300 px-4 py-2">{lawyer.tcKimlikNo}</td>
                    <td className="border border-gray-300 px-4 py-2">{lawyer.name}</td>
                    <td className="border border-gray-300 px-4 py-2">{lawyer.surname}</td>
                    <td className="border border-gray-300 px-4 py-2">{lawyer.phone}</td>
                    <td className="border border-gray-300 px-4 py-2">{lawyer.email}</td>
                    <td className="border border-gray-300 px-4 py-2">
                      <button
                        className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                        onClick={() => removeLawyer(lawyer.tcKimlikNo)}
                      >
                        Sil
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* AddLawyer Modal */}
      {showAddLawyer && (
        <AddLawyer
          onClose={() => setShowAddLawyer(false)}
          onSave={handleSaveLawyer}
        />
      )}
    </div>
  );
};

export default Lawyer;

import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import useApplicationStore from "../stores/ApplicationStore";
import CaseEdit from "../components/CaseEdit";
import CaseDetails from "../components/CaseDetails";

const Case = () => {
  const { applications, updateApplication, removeApplication } = useApplicationStore();
  const [selectedDetails, setSelectedDetails] = useState(null); // Detayları göstermek için state
  const [editingCase, setEditingCase] = useState(null); // Düzenleme için state

  // Onaylanan başvuruları filtreliyoruz
  const approvedCases = applications.filter(
    (app) => app.status === "Onaylandı"
  );

  const handleShowDetails = (caseItem) => {
    setSelectedDetails(caseItem.detaylar); // Detayları ayarla
  };

  const handleEdit = (caseItem) => {
    setEditingCase(caseItem);
  };

  const handleSave = (updatedCase) => {
    updateApplication(updatedCase.tcKimlikNo, updatedCase);
    setEditingCase(null);
    setSelectedDetails(null); // Düzenleme sonrası detayları kapat
  };

  const handleDelete = (tcKimlikNo) => {
    removeApplication(tcKimlikNo);
    setSelectedDetails(null); // Silindikten sonra detayları kapat
  };

  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <div className="bg-gray-200 flex-1 p-8">
          <h2 className="text-2xl font-bold mb-4">Dava Listesi</h2>
          {approvedCases.length === 0 ? (
            <p className="text-gray-600">Henüz onaylanan bir dava yok.</p>
          ) : (
            <div>
              <table className="table-auto w-full border border-gray-300">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="border border-gray-300 px-4 py-2">T.C. Kimlik No</th>
                    <th className="border border-gray-300 px-4 py-2">Ad Soyad</th>
                    <th className="border border-gray-300 px-4 py-2">İhlal Nedeni</th>
                    <th className="border border-gray-300 px-4 py-2">Detaylar</th>
                    <th className="border border-gray-300 px-4 py-2">Takip Eden Avukat</th>
                    <th className="border border-gray-300 px-4 py-2">İşlem</th>
                  </tr>
                </thead>
                <tbody>
                  {approvedCases.map((caseItem, index) => (
                    <tr
                      key={index}
                      className={index % 2 === 0 ? "bg-white" : "bg-gray-100"}
                    >
                      <td className="border border-gray-300 px-4 py-2">{caseItem.tcKimlikNo}</td>
                      <td className="border border-gray-300 px-4 py-2">{`${caseItem.adi} ${caseItem.soyadi}`}</td>
                      <td className="border border-gray-300 px-4 py-2">{caseItem.ihlalNedeni}</td>
                      <td className="border border-gray-300 px-4 py-2">
                        <button
                          className="text-blue-500 hover:underline"
                          onClick={() => handleShowDetails(caseItem)}
                        >
                          Detaylar
                        </button>
                      </td>
                      <td className="border border-gray-300 px-4 py-2">{caseItem.detaylar.takipAvukat}</td>
                      <td className="border border-gray-300 px-4 py-2">
                        <div className="flex space-x-2">
                          <button
                            className="px-2 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                            onClick={() => handleEdit(caseItem)}
                          >
                            Düzenle
                          </button>
                          <button
                            className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                            onClick={() => handleDelete(caseItem.tcKimlikNo)}
                          >
                            Sil
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* Detaylar Bileşeni */}
              <CaseDetails
                selectedDetails={selectedDetails}
                onClose={() => setSelectedDetails(null)}
              />
            </div>
          )}
        </div>
      </div>

      {editingCase && (
        <CaseEdit
          caseItem={editingCase}
          onSave={handleSave}
          onCancel={() => setEditingCase(null)}
        />
      )}
    </div>
  );
};

export default Case;

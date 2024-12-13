// src/layers/Case.jsx
import React from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import useApplicationStore from "../stores/ApplicationStore";

const Case = () => {
  const { applications } = useApplicationStore(); // Zustand Store'dan başvuruları çekiyoruz

  // Onaylanan başvuruları filtreliyoruz
  const approvedCases = applications.filter(
    (app) => app.status === "Onaylandı"
  );

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
          <h2 className="text-2xl font-bold mb-4">Dava Listesi</h2>

          {approvedCases.length === 0 ? (
            <p className="text-gray-600">Henüz onaylanan bir dava yok.</p>
          ) : (
            <table className="table-auto w-full border border-gray-300">
              <thead className="bg-gray-100">
                <tr>
                  <th className="border border-gray-300 px-4 py-2">T.C. Kimlik No</th>
                  <th className="border border-gray-300 px-4 py-2">Ad Soyad</th>
                  <th className="border border-gray-300 px-4 py-2">İhlal Nedeni</th>
                  <th className="border border-gray-300 px-4 py-2">Başvuru Tarihi</th>
                  <th className="border border-gray-300 px-4 py-2">Takip Eden Avukat</th>
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
                    <td className="border border-gray-300 px-4 py-2">{caseItem.detaylar.basvuruTarihi}</td>
                    <td className="border border-gray-300 px-4 py-2">{caseItem.detaylar.takipAvukat}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default Case;

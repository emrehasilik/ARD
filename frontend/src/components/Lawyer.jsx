// src/components/Lawyer.jsx
import React, { useState } from "react";
import Sidebar from "./Sidebar";
import AddLawyer from "./AddLawyer";
import Header from "./Header";

const Lawyer = () => {
    const [showAddLawyer, setShowAddLawyer] = useState(false);
    const [lawyers, setLawyers] = useState([]);

    const handleSaveLawyer = (lawyerData) => {
        setLawyers([...lawyers, lawyerData]);
        setShowAddLawyer(false);
    };

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
                    <div className="flex justify-end mb-4">
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
                                </tr>
                            </thead>
                            <tbody>
                                {lawyers.map((lawyer, index) => (
                                    <tr
                                        key={index}
                                        className={index % 2 === 0 ? "bg-white" : "bg-gray-100"}
                                    >
                                        <td className="border border-gray-300 px-4 py-2">{lawyer.tcKimlikNo}</td>
                                        <td className="border border-gray-300 px-4 py-2">{lawyer.name}</td>
                                        <td className="border border-gray-300 px-4 py-2">{lawyer.surname}</td>
                                        <td className="border border-gray-300 px-4 py-2">{lawyer.phone}</td>
                                        <td className="border border-gray-300 px-4 py-2">{lawyer.email}</td>
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

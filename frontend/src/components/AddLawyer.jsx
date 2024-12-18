// src/components/AddLawyer.jsx
import React, { useState } from "react";

const AddLawyer = ({ onClose, onSave }) => {
    const [formData, setFormData] = useState({
        name: "",
        surname: "",
        phone: "",
        email: "",
        specialization: "",
    });

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setFormData({
            ...formData,
            [id]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(formData); // Form verilerini üst bileşene gönder
        onClose(); // Formu kapat
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center overflow-auto">
            <div className="bg-white p-8 rounded shadow-lg w-3/4 max-h-[90vh] overflow-y-auto">
                <h2 className="text-xl font-bold mb-4">Avukat Ekle</h2>
                <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-2 gap-4 mb-8">

                        {/* T.C. Kimlik No */}
                        <div>
                            <label className="block text-gray-700 mb-2" htmlFor="tcKimlikNo">
                                T.C. Kimlik No
                            </label>
                            <input
                                type="text"
                                id="tcKimlikNo"
                                className="w-full p-2 border border-gray-300 rounded"
                                placeholder="T.C. Kimlik Numaranızı girin"
                                maxLength="11"
                                onInput={(e) => {
                                    e.target.value = e.target.value.replace(/[^0-9]/g, '').slice(0, 11);
                                }}
                                value={formData.tcKimlikNo}
                                onChange={handleInputChange}
                            />
                        </div>

                        {/* İsim */}
                        <div>
                            <label className="block text-gray-700 mb-2" htmlFor="name">
                                İsim
                            </label>
                            <input
                                type="text"
                                id="name"
                                className="w-full p-2 border border-gray-300 rounded"
                                placeholder="Avukatın ismini girin"
                                value={formData.name}
                                onChange={handleInputChange}
                            />
                        </div>

                        {/* Soyisim */}
                        <div>
                            <label className="block text-gray-700 mb-2" htmlFor="surname">
                                Soyisim
                            </label>
                            <input
                                type="text"
                                id="surname"
                                className="w-full p-2 border border-gray-300 rounded"
                                placeholder="Avukatın soyismini girin"
                                value={formData.surname}
                                onChange={handleInputChange}
                            />
                        </div>

                        {/* Telefon */}
                        <div>
                            <label className="block text-gray-700 mb-2" htmlFor="phone">
                                Telefon
                            </label>
                            <input
                                type="text"
                                id="phone"
                                className="w-full p-2 border border-gray-300 rounded"
                                placeholder="Telefon numarasını girin"
                                maxLength="10"
                                onInput={(e) => {
                                    e.target.value = e.target.value.replace(/[^0-9]/g, '').slice(0, 11);
                                }}
                                value={formData.phone}
                                onChange={handleInputChange}
                            />
                        </div>
                        {/* E-posta */}
                        <div>
                            <label className="block text-gray-700 mb-2" htmlFor="email">
                                E-posta
                            </label>
                            <input
                                type="email"
                                id="email"
                                className="w-full p-2 border border-gray-300 rounded"
                                placeholder="E-posta adresini girin"
                                value={formData.email}
                                onChange={handleInputChange}
                            />
                        </div>


                    </div>

                    {/* Butonlar */}
                    <div className="flex justify-end">
                        <button
                            type="button"
                            className="mr-4 bg-gray-300 text-gray-700 px-4 py-2 rounded"
                            onClick={onClose}
                        >
                            İptal
                        </button>
                        <button
                            type="submit"
                            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                        >
                            Kaydet
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddLawyer;

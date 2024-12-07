// src/components/AddApplication.jsx

import React, { useState } from "react";

const AddApplication = ({ onClose, onSave }) => {
    const [formData, setFormData] = useState({
        tcKimlikNo: "",
        adi: "",
        soyadi: "",
        basvuruTuru: "",
        detaylar: {
            basvuranTuru: "",
            basvuruTarihi: "",
            takipAvukat: "",
            ihlalNedeni: "",
            basvuruyuAlan: "",
            dosyaAciklama: "",
            davaBilgileri: {
                dosyaNumarasi: "",
                mahkeme: "",
                mahkemeDosyaNo: "",
                sonucuAciklama: "",
                sonucuAsama: "",
            },
        },
    });

    const [isCourtInfoAvailable, setIsCourtInfoAvailable] = useState(false); // Checkbox state'i

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        if (id in formData.detaylar) {
            setFormData({
                ...formData,
                detaylar: {
                    ...formData.detaylar,
                    [id]: value,
                },
            });
        } else {
            setFormData({
                ...formData,
                [id]: value,
            });
        }
    };

    const handleCourtInfoChange = (e) => {
        const { id, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            detaylar: {
                ...prevData.detaylar,
                davaBilgileri: {
                    ...prevData.detaylar.davaBilgileri,
                    [id]: value,
                },
            },
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault(); // Formun default davranışını engelliyoruz
        onSave(formData);
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center overflow-auto">
            <div className="bg-white p-8 rounded shadow-lg w-3/4 max-h-[90vh] overflow-y-auto">
                <h2 className="text-xl font-bold mb-4">Başvuru Ekle</h2>
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


                        {/* Adı */}
                        <div>
                            <label className="block text-gray-700 mb-2" htmlFor="adi">
                                Adı
                            </label>
                            <input
                                type="text"
                                id="adi"
                                className="w-full p-2 border border-gray-300 rounded"
                                placeholder="Adınızı girin"
                                value={formData.adi}
                                onChange={handleInputChange}
                            />
                        </div>

                        {/* Soyadı */}
                        <div>
                            <label className="block text-gray-700 mb-2" htmlFor="soyadi">
                                Soyadı
                            </label>
                            <input
                                type="text"
                                id="soyadi"
                                className="w-full p-2 border border-gray-300 rounded"
                                placeholder="Soyadınızı girin"
                                value={formData.soyadi}
                                onChange={handleInputChange}
                            />
                        </div>

                        {/* Başvuran Türü */}
                        <div>
                            <label className="block text-gray-700 mb-2" htmlFor="basvuranTuru">
                                Başvuran Türü
                            </label>
                            <input
                                type="text"
                                id="basvuranTuru"
                                className="w-full p-2 border border-gray-300 rounded"
                                placeholder="Başvuran türünü girin"
                                value={formData.detaylar.basvuranTuru}
                                onChange={handleInputChange}
                            />
                        </div>

                        {/* Başvuru Tarihi */}
                        <div>
                            <label className="block text-gray-700 mb-2" htmlFor="basvuruTarihi">
                                Başvuru Tarihi
                            </label>
                            <input
                                type="date"
                                id="basvuruTarihi"
                                className="w-full p-2 border border-gray-300 rounded"
                                value={formData.detaylar.basvuruTarihi}
                                onChange={handleInputChange}
                            />
                        </div>

                        {/* Başvuruyu Alan */}
                        <div>
                            <label className="block text-gray-700 mb-2" htmlFor="basvuruyuAlan">
                                Başvuruyu Alan
                            </label>
                            <input
                                type="text"
                                id="basvuruyuAlan"
                                className="w-full p-2 border border-gray-300 rounded"
                                placeholder="Başvuruyu alan kişiyi girin"
                                value={formData.detaylar.basvuruyuAlan}
                                onChange={handleInputChange}
                            />
                        </div>


                        {/* Takip Eden Avukat */}
                        <div>
                            <label className="block text-gray-700 mb-2" htmlFor="takipAvukat">
                                Takip Eden Avukat
                            </label>
                            <input
                                type="text"
                                id="takipAvukat"
                                className="w-full p-2 border border-gray-300 rounded"
                                placeholder="Avukat adı"
                                value={formData.detaylar.takipAvukat}
                                onChange={handleInputChange}
                            />
                        </div>


                        {/* İhlal Nedeni */}
                        <div>
                            <label className="block text-gray-700 mb-2" htmlFor="ihlalNedeni">
                                İhlal Nedeni
                            </label>
                            <input
                                type="text"
                                id="ihlalNedeni"
                                className="w-full p-2 border border-gray-300 rounded"
                                placeholder="İhlal nedeni"
                                value={formData.detaylar.ihlalNedeni}
                                onChange={handleInputChange}
                            />
                        </div>

                        {/* Başvuru Türü */}
                        <div>
                            <label className="block text-gray-700 mb-2" htmlFor="basvuruTuru">
                                Başvuru Türü
                            </label>
                            <input
                                type="text"
                                id="basvuruTuru"
                                className="w-full p-2 border border-gray-300 rounded"
                                placeholder="Başvuru türünü girin"
                                value={formData.basvuruTuru}
                                onChange={handleInputChange}
                            />
                        </div>


                        {/* Dosya Ekle */}
                        <div>
                            <label className="block text-gray-700 mb-2" htmlFor="dosyaAciklama">
                                Dosya Açıklaması
                            </label>

                            <textarea
                                id="dosyaAciklama"
                                className="w-full p-2 border border-gray-300 rounded"
                                placeholder="Dosya açıklamasını girin"
                                value={formData.detaylar.dosyaAciklama}
                                onChange={handleInputChange}
                            />
                            <div className="mt-2 flex justify-end">
                                <button
                                    type="button"
                                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                                >
                                    Dosya Ekle
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-8">


                        {/* Dava Bilgileri Bölümü */}
                        <div className="col-span-2">
                            <input
                                type="checkbox"
                                id="davaBilgileri"
                                className="mr-2"
                                checked={isCourtInfoAvailable}
                                onChange={() => setIsCourtInfoAvailable(!isCourtInfoAvailable)}
                            />
                            <label htmlFor="davaBilgileri" className="text-purple-600 font-semibold">
                                Dava Bilgileri Mevcut
                            </label>

                            <div className="border border-gray-300 rounded mt-4 p-4">
                                {/* Dosya Numarası */}
                                <div className="mb-4">
                                    <label className="block text-gray-700 mb-2" htmlFor="dosyaNumarasi">
                                        Dosya Numarası
                                    </label>
                                    <input
                                        type="text"
                                        id="dosyaNumarasi"
                                        className="w-full p-2 border border-gray-300 rounded"
                                        placeholder="Dosya numarasını girin"
                                        disabled={!isCourtInfoAvailable}
                                        value={formData.detaylar.davaBilgileri.dosyaNumarasi}
                                        onChange={handleCourtInfoChange}
                                    />
                                </div>

                                {/* Mahkeme */}
                                <div className="mb-4">
                                    <label className="block text-gray-700 mb-2" htmlFor="mahkeme">
                                        Mahkeme
                                    </label>
                                    <input
                                        type="text"
                                        id="mahkeme"
                                        className="w-full p-2 border border-gray-300 rounded"
                                        placeholder="Mahkeme adı"
                                        disabled={!isCourtInfoAvailable}
                                        value={formData.detaylar.davaBilgileri.mahkeme}
                                        onChange={handleCourtInfoChange}
                                    />
                                </div>

                                {/* Mahkeme Dosya No */}
                                <div className="mb-4">
                                    <label className="block text-gray-700 mb-2" htmlFor="mahkemeDosyaNo">
                                        Mahkeme Dosya No
                                    </label>
                                    <input
                                        type="text"
                                        id="mahkemeDosyaNo"
                                        className="w-full p-2 border border-gray-300 rounded"
                                        placeholder="Mahkeme dosya no"
                                        disabled={!isCourtInfoAvailable}
                                        value={formData.detaylar.davaBilgileri.mahkemeDosyaNo}
                                        onChange={handleCourtInfoChange}
                                    />
                                </div>

                                {/* Sonucu Açıklama */}
                                <div className="mb-4">
                                    <label className="block text-gray-700 mb-2" htmlFor="sonucuAciklama">
                                        Sonucu Açıklama
                                    </label>
                                    <input
                                        type="text"
                                        id="sonucuAciklama"
                                        className="w-full p-2 border border-gray-300 rounded"
                                        placeholder="Sonucu açıklama"
                                        disabled={!isCourtInfoAvailable}
                                        value={formData.detaylar.davaBilgileri.sonucuAciklama}
                                        onChange={handleCourtInfoChange}
                                    />
                                </div>

                                {/* Sonucu Aşama */}
                                <div className="mb-4">
                                    <label className="block text-gray-700 mb-2" htmlFor="sonucuAsama">
                                        Sonucu Aşama
                                    </label>
                                    <input
                                        type="text"
                                        id="sonucuAsama"
                                        className="w-full p-2 border border-gray-300 rounded"
                                        placeholder="Sonucu aşama"
                                        disabled={!isCourtInfoAvailable}
                                        value={formData.detaylar.davaBilgileri.sonucuAsama}
                                        onChange={handleCourtInfoChange}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Form Butonları */}
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

export default AddApplication;

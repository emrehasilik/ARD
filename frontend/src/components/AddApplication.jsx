// src/components/AddApplication.jsx

import React, { useState, useEffect } from "react";
import useLawyerStore from "../stores/LawyerStore"; // Lawyer Store'u import et

const AddApplication = ({ onClose, onSave }) => {
    const [formData, setFormData] = useState({
        tcKimlikNo: "",
        adi: "",
        soyadi: "",
        ihlalNedeni: "",
        detaylar: {
            basvuruNumarasi: "",
            basvuranTuru: "",
            basvuruTarihi: "",
            takipAvukat: "",
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


    useEffect(() => {
        const today = new Date().toISOString().split("T")[0];
        setFormData((prevFormData) => ({
            ...prevFormData,
            detaylar: {
                ...prevFormData.detaylar,
                basvuruTarihi: today,
            },
        }));
    }, []);

    const { lawyers } = useLawyerStore(); // Lawyer Store'dan avukatları al
    const [isCourtInfoAvailable, setIsCourtInfoAvailable] = useState(false); // Checkbox state'i
    const [isSelfApplicant, setIsSelfApplicant] = useState(false); // Başvuran Türü checkbox durumu
    const [isCustomReason, setIsCustomReason] = useState(false); // İhlal Nedeni checkbox durumu
    const [errorMessage, setErrorMessage] = useState("");

    const fieldNames = {
        tcKimlikNo: "T.C. Kimlik Numarası",
        adi: "Adı",
        soyadi: "Soyadı",
        ihlalNedeni: "İhlal/Yakınma Nedeni",
        "detaylar.basvuranTuru": "Başvuran Türü",
        "detaylar.takipAvukat": "Takip Eden Avukat",
        "detaylar.ihlalNedeni": "İhlal Nedeni",
        "detaylar.basvuruyuAlan": "Başvuruyu Alan",
        "detaylar.dosyaAciklama": "Dosya Açıklaması",
    };

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

    const validateForm = () => {
        const requiredFields = [
            "tcKimlikNo",
            "adi",
            "soyadi",
            "ihlalNedeni",
            "detaylar.basvuranTuru",
            "detaylar.takipAvukat",
            "detaylar.basvuruyuAlan",
            "detaylar.dosyaAciklama",
        ];

        for (const field of requiredFields) {
            const keys = field.split(".");
            let value = formData;

            for (const key of keys) {
                value = value[key];
            }

            if (!value) {
                return `Lütfen ${fieldNames[field]} alanını doldurun.`;
            }
        }

        return "";
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
        e.preventDefault();
        const error = validateForm();

        if (error) {
            setErrorMessage(error);
            return;
        }

        onSave(formData);
        setErrorMessage("");
        setFormData({
            tcKimlikNo: "",
            adi: "",
            soyadi: "",
            ihlalNedeni: "",
            detaylar: {
                basvuruNumarasi: "",
                basvuranTuru: "",
                takipAvukat: "",
                basvuruyuAlan: "",
                dosyaAciklama: "",
            },
        });
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
                            <select
                                id="basvuranTuru"
                                className="w-full p-2 border border-gray-300 rounded"
                                value={formData.detaylar.basvuranTuru}
                                onChange={handleInputChange}
                                disabled={isSelfApplicant}
                            >
                                <option value="">Seçin</option>
                                <option value="STK">STK</option>
                                <option value="Basın/Medya">Basın/Medya</option>
                                <option value="Kamu Kuruluşu">Kamu Kuruluşu</option>
                                <option value="Baro Komisyonu">Baro Komisyonu</option>
                            </select>
                            <div className="mt-2">
                                <input
                                    type="checkbox"
                                    id="isSelfApplicant"
                                    className="mr-2"
                                    checked={isSelfApplicant}
                                    onChange={() => {
                                        setIsSelfApplicant(!isSelfApplicant);
                                        setFormData({
                                            ...formData,
                                            detaylar: {
                                                ...formData.detaylar,
                                                basvuranTuru: isSelfApplicant ? "" : "Mağdur/Kendisi",
                                            },
                                        });
                                    }}
                                />
                                <label htmlFor="isSelfApplicant" className="text-gray-700">
                                    Mağdur/Kendisi
                                </label>
                            </div>
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
                            <select
                                id="takipAvukat"
                                className="w-full p-2 border border-gray-300 rounded"
                                value={formData.detaylar.takipAvukat}
                                onChange={handleInputChange}
                            >
                                <option value="">Avukat Seçin</option>
                                {lawyers.map((lawyer) => (
                                    <option key={lawyer.tcKimlikNo} value={lawyer.name}>
                                        {lawyer.name} {lawyer.surname}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* İhlal Nedeni */}
                        <div>
                            <label className="block text-gray-700 mb-2" htmlFor="ihlalNedeni">
                                İhlal/Yakınma Nedeni
                            </label>
                            <select
                                id="ihlalNedeni"
                                className="w-full p-2 border border-gray-300 rounded"
                                value={formData.ihlalNedeni}
                                onChange={handleInputChange}
                                disabled={isCustomReason}
                            >
                                <option value="">Seçin</option>
                                <option value="Aile ve Özel Yaşam Hakkı">Aile ve Özel Yaşam Hakkı</option>
                                <option value="Ayrımcılık">Ayrımcılık</option>
                                <option value="Basın Özgürlüğü">Basın Özgürlüğü</option>
                                <option value="Kadına Karşı Şiddet ve Taciz">Kadına Karşı Şiddet ve Taciz</option>
                                <option value="Çocuğa Karşı Şiddet ve Taciz">Çocuğa Karşı Şiddet ve Taciz</option>
                                <option value="Örgütlenme Özgürlüğü">Örgütlenme Özgürlüğü</option>
                                <option value="İşkence ve Kötü Muamele">İşkence ve Kötü Muamele</option>
                                <option value="Eğitim Hakkı">Eğitim Hakkı</option>
                                <option value="Düşünce ve İfade Özgürlüğü">Düşünce ve İfade Özgürlüğü</option>
                            </select>
                            <div className="mt-2">
                                <input
                                    type="checkbox"
                                    id="isCustomReason"
                                    className="mr-2"
                                    checked={isCustomReason}
                                    onChange={() => {
                                        setIsCustomReason(!isCustomReason);
                                        setFormData({
                                            ...formData,
                                            detaylar: {
                                                ...formData.detaylar,
                                                ihlalNedeni: isCustomReason ? "" : "Diğer",
                                            },
                                        });
                                    }}
                                />
                                <label htmlFor="isCustomReason" className="text-gray-700">
                                    Yukarıdakilerden hiçbirisi ihlal/yakınma nedenim değildir.
                                </label>
                            </div>
                        </div>

                        {/* Başvuru Numarası */}
                        <div>
                            <label className="block text-gray-700 mb-2" htmlFor="basvuruNumarasi">
                                Başvuru Numarası
                            </label>
                            <input
                                type="text"
                                id="basvuruNumarasi"
                                className="w-full p-2 border border-gray-300 rounded"
                                placeholder="Başvuru numarası girin"
                                value={formData.basvuruNumarasi}
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
                    {errorMessage && <div className="text-red-500 mb-4">{errorMessage}</div>}


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

"use client";

import React, { useState, useEffect } from "react";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { getAdreData } from "../api/users/action"; // تأكد من صحة مسار ملف الـ action عندك

interface Specialty {
  id: string;
  name: string;
  image: string;
  isCustomPill?: boolean;
  desc:string;
}

interface Notebook {
  id: number;
  name: string;
  url: string;
  type: string;
  date_post: string | null;
  img:string;
}

export default function DepartmentsPage() {
  const [selectedSpecialty, setSelectedSpecialty] = useState<Specialty | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [downloading, setDownloading] = useState<string | null>(null);
  
  // حقول حالة لتخزين البيانات الحقيقية وحالة التحميل
  const [notebooks, setNotebooks] = useState<Notebook[]>([]);
  const [loading, setLoading] = useState(true);

  // جلب البيانات من السيرفر عند فتح الصفحة
  useEffect(() => {
    async function loadData() {
      const data = await getAdreData();
      // تحويل البيانات لتتوافق مع الـ Interface
      const formattedData = data.map((item: any) => ({
        id: item.id,
        name: item.name,
        url: item.url,
        type: item.type,
        date_post: item.date_post ? new Date(item.date_post).toLocaleDateString("ar-JO") : null,
        img:item.img,
      }));
      setNotebooks(formattedData);
      setLoading(false);
    }
    loadData();
  }, []);

  // 8 Specialties mapped to existing images in public directory
  const specialties: Specialty[] = [
    { id: "rt", name: "RT", image: "/RT.jpg" ,desc:"خصص يركز على تعليم الطلاب كيفية تقييم ومعالجة المرضى الذين يعانون من اضطرابات الهاز التنفسي يشمل البرنامج دراسة علم التشريح والفسيولوجيا التنفسية والأمراض التنفسية وتقنيات العلاج الانفسي مثل التهوية الميكانيكية والعلاج بالأكسجين" },
    { id: "rad", name: "RAD", image: "/RAd.jpg", desc: "تخصص يركز على تدريب الطلاب على استخدام الأجهزة والتقنيات الحديثة لتصوير وتشخيص الأمراض يشمل البرنامج دراسة علم الأشعة وأنوا التصوير من الأشعة السينية والرنين المغناطيسي والتصوير المقطعي وبالإضافة إلى فهم كيفية التعامل مع المرضى وضمان السلامة أثناء الفحوصات" },
    { id: "pt", name: "PT", image: "/PT.jpg", desc:"تخصص يركز على تقييم وعلاج المشكلات الحركية الناتجة عن الإصابات أو الأمراض يهدف إلى تحسين الحركة وتخفيف الألم واستعادة الوظائف الطبيعية باستخدام التمارين العلاجية والعلاج اليدوي والتحفيز الكهربائي يشمل البرنامج دراسة التشريح والفسيولوجيا وطرق التأهيل المختلفة" },
    { id: "ot", name: "OT", image: "/OT.jpg",desc :"خصص يركز على تقييم ومعالجة المرضى الذين يعانون من صعوبة في أداء الأنشطة اليومية بسبب إصابات أو إعلاقات يشمل دراسة التشريح والفسيولوجيا والاضطرابات الحركية والإدراكية وإضافة إلى تقنيات التأهيل لمساعدتهم على تحسين استقلاليتهم وجودة حياتهم"},
    { id: "dt", name: "DT", image: "/DT.jpg",desc:"خصص يركز على تشخيص وعلاج اضطرابات السمع والتحدث ويشمل تدريب الطلاب على تقنيات التواصل مع المرضى الذين يعانون من مشاكل في السمع والنطق أو اللغة يتعلم الطلاب طرق التأهيل باستخدام أدوات وتقنيات حديثة لتحسين قدرة المرضى على التواصل بشكل فعال" },
    { id: "slp", name: "SLP", image: "/SLP.jpg",desc:"تخصص يركز على تعليم الطلاب كيفية تقييم احتياجات المرضى الغذائية وتصميم خطط غذائية مخصصة لهم يشمل البرنامج دراسة علم التغذية والأيض والأمراض التي تتطلب أنظمة غذائية خاصة بالإضافة إلى تقنيات العلاج الغذائي لتحسين صحة المرضى وعلاج الأمراض المرتبطة بالتغذية" },
    { id: "mls", name: "MLS", image: "/MLS.jpg" ,desc:"تخصص يركز على تعليم الطلاب كيفية إجراء الفحوصات المخبرية وتحليل العينات لتشخيص الأمراض يشمل البرنامج دراسة الأحياء الدقيقة والكيمياء الحيوية وعلم الدم مع التركيز على استخدام المعدات المخبرية المتقدمة وتفسير النتائج لتحديد العلاجات المناسبة" },
    {id:"a",name:"خريطة الجامعة",image:"/map.jpeg",desc:""},
    {id:"b",name:"العلامات بالرموز",image:"/mark.jpeg",desc:""},
    {id:"c",name:"رموز المباني",image:"/sym.jpeg",desc:""},
    
  ];

  // فحص البحث بناءً على اسم المادة القادم من قاعدة البيانات الحقيقية
  const filteredNotebooks = notebooks.filter((nb) =>
    nb.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    nb.type.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Helper function to trigger browser download for the specialty image
  const handleDownload = async (imageUrl: string, filename: string) => {
    try {
      setDownloading(filename);
      const response = await fetch(imageUrl);
      if (!response.ok) throw new Error("Network response was not ok");
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Failed to download image", error);
      window.open(imageUrl, "_blank");
    } finally {
      setDownloading(null);
    }
  };

  return (
    <div dir="rtl" className="flex flex-col min-h-screen bg-white text-zinc-900 dark:bg-zinc-950 dark:text-zinc-50">


      {/* Main Page Layout */}
      <main className="flex-grow py-12 px-6 md:px-12 mx-auto max-w-7xl w-full">
        {/* Title: اختر تخصصك */}
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-extrabold text-brand-purple dark:text-purple-400 mb-2">
            اختر تخصصك
          </h1>
          <div className="h-1 w-20 bg-brand-purple mx-auto rounded-full"></div>
        </div>

        {/* 2. Top Specialty Buttons Bar */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-12">
          {specialties.map((spec) => (
            <button
              key={spec.id}
              onClick={() => setSelectedSpecialty(spec)}
              className={`
                transition-all duration-300 font-bold active:scale-95 shadow-md hover:shadow-lg
                ${
                  spec.isCustomPill
                    ? "px-6 py-3 rounded-full bg-brand-purple text-white hover:bg-purple-800 text-sm md:text-base"
                    : "px-3 h-14 md:px-6 md:h-16 rounded-2xl bg-brand-purple text-white hover:bg-purple-800 text-base md:text-lg flex items-center justify-center"
                }
              `}
            >
              {spec.name}
            </button>
          ))}
        </div>

        {/* 3. Search Bar: ابحث عن المادة */}
        <div className="w-full max-w-xl mx-auto mb-12 relative">
          <div className="relative">
            <input
              type="text"
              placeholder="ابحث عن مادة أو تصنيف..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-6 py-4 rounded-full border border-zinc-200 focus:outline-none focus:ring-2 focus:ring-brand-purple bg-zinc-50/50 dark:bg-zinc-900 dark:border-zinc-800 dark:text-zinc-100 placeholder-zinc-400 dark:placeholder-zinc-600 text-right text-lg transition-all focus:bg-white dark:focus:bg-zinc-950 focus:shadow-md"
            />
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400 dark:text-zinc-500">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
        </div>

        {/* 4. Notebooks Grid (عرض البيانات الحية) */}
        {loading ? (
          <div className="text-center py-20 text-gray-500">جاري تحميل المواد من قاعدة البيانات...</div>
        ) : filteredNotebooks.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center mb-16">
            {filteredNotebooks.map((nb) => (
              <a
                href={nb.url}
                target="_blank"
                rel="noopener noreferrer"
                key={nb.id}
                className="w-full max-w-sm rounded-[24px] border-2 border-brand-purple overflow-hidden flex flex-col bg-white dark:bg-zinc-900 shadow-lg shadow-purple-900/5 hover:shadow-xl hover:shadow-purple-900/10 transition-all duration-300 hover:-translate-y-1 group cursor-pointer"
              >
                <div className="p-6 flex-grow flex flex-col justify-between">
                  <img src={nb.img} />
                </div>

                {/* البار السفلي للكرت باللون البنفسجي */}
                <div className="bg-brand-purple py-3.5 px-4 text-center font-bold text-white text-lg tracking-wide border-t-2 border-brand-purple flex justify-center items-center gap-2">
                  <span>{nb.name}</span>
                  
                </div>
              </a>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-zinc-50 dark:bg-zinc-900 rounded-3xl border border-zinc-100 dark:border-zinc-800/50 mb-16">
            <svg className="w-16 h-16 mx-auto text-zinc-300 dark:text-zinc-700 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 13.5h3.86a2.25 2.25 0 012.008 1.24l.885 1.77a2.25 2.25 0 002.007 1.24h1.98a2.25 2.25 0 002.007-1.24l.885-1.77a2.25 2.25 0 012.007-1.24h3.86m-18 0h18a2.25 2.25 0 012.25 2.25v4.5A2.25 2.25 0 0118 22.5H6a2.25 2.25 0 01-2.25-2.25v-4.5m13.5-9a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
            </svg>
            <p className="text-zinc-500 dark:text-zinc-400 text-lg">لم يتم العثور على أي مواد تطابق بحثك حالياً.</p>
          </div>
        )}

        {/* 5. Bottom Teal Banner Button: هيا نبدأ */}
        <div className="flex justify-center mb-6">
          <button className="w-full max-w-4xl py-6 rounded-3xl bg-[#1a5b66] text-white hover:bg-[#144851] text-3xl font-extrabold tracking-widest shadow-xl transition-all duration-300 active:scale-98">
            هيا نبدأ
          </button>
        </div>
      </main>

      {/* 6. Lightbox Modal Overlay for Specialty Image Display */}
      {selectedSpecialty && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-4 animate-in fade-in duration-200"
          onClick={() => setSelectedSpecialty(null)}
        >
          <div
            className="relative bg-white dark:bg-zinc-900 rounded-3xl max-w-3xl w-full p-6 shadow-2xl flex flex-col items-center border border-zinc-100 dark:border-zinc-800 animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between w-full mb-4 border-b border-zinc-100 dark:border-zinc-800 pb-3">
              <h3 className="text-xl font-bold text-brand-purple dark:text-purple-400">
                قسم: {selectedSpecialty.name}
              </h3>
              <button
                onClick={() => setSelectedSpecialty(null)}
                className="text-zinc-400 hover:text-zinc-600 dark:text-zinc-500 dark:hover:text-zinc-300 transition-colors"
                aria-label="Close Modal"
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <p className=" text-[#236371] m-2">{selectedSpecialty.desc}</p>

            {/* Display Specialty Image */}
            <div className="w-full relative max-h-[60vh] overflow-auto flex justify-center items-center bg-zinc-50 dark:bg-zinc-950 rounded-xl mb-6 border border-zinc-100 dark:border-zinc-800">
              <img
                src={selectedSpecialty.image}
                alt={`خطة قسم ${selectedSpecialty.name}`}
                className="max-h-[50vh] object-contain rounded-lg shadow-sm"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = `https://picsum.photos/seed/${selectedSpecialty.id}/800/600`;
                }}
              />
            </div>

            {/* Modal Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full">
              <button
                onClick={() => handleDownload(selectedSpecialty.image, `specialty_${selectedSpecialty.id}.jpg`)}
                disabled={downloading !== null}
                className="flex items-center justify-center gap-2 w-full sm:w-auto px-8 py-3 rounded-full bg-brand-purple text-white hover:bg-purple-800 font-bold shadow-md transition-all active:scale-95 disabled:opacity-75"
              >
                {downloading ? (
                  <>
                    <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span>جاري التحميل...</span>
                  </>
                ) : (
                  <>
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                    <span>تحميل الصورة</span>
                  </>
                )}
              </button>

              <button
                onClick={() => setSelectedSpecialty(null)}
                className="flex items-center justify-center gap-2 w-full sm:w-auto px-8 py-3 rounded-full bg-zinc-200 text-zinc-800 hover:bg-zinc-300 dark:bg-zinc-800 dark:text-zinc-200 dark:hover:bg-zinc-700 font-bold transition-all active:scale-95"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>خروج</span>
              </button>
            </div>
          </div>
        </div>
      )}


    </div>
  );
}
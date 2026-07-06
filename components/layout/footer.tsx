"use client"; 

import React, { useState } from "react";

import { addContactMessage } from "@/app/api/users/action";

export function Footer() {
  const [isopen, setisopen] = useState(false);


  const handleSubmit = async (formData: FormData) => {
    await addContactMessage(formData);
    setisopen(false); 
    alert("تم إرسال رسالتك بنجاح!");
  };

  return (
    <>
      <footer className="w-full bg-brand-purple py-6 mt-auto dark:bg-purple-950/70 border-t border-purple-800/20" id="footer">
        <div className="mx-auto max-w-7xl px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-white text-sm">
          <div className="flex items-center gap-2">
            <span className="font-bold tracking-wider">ADRENALINE</span>
            <span className="text-white/60">|</span>
            <span>© {new Date().getFullYear()} جميع الحقوق محفوظة</span>
            <span className="text-white/40">|</span>
           <span className="text-white/80">
           تطوير وبناء {" "}
            <a 
             href="http://mo77momw.github.io/portfolio" 
             target="_blank" 
             rel="noopener noreferrer" 
             className="underline hover:text-purple-300 transition-colors font-medium"
             >
             Mohammed Tariq
            </a>
           </span>
          </div>
          <div className="flex gap-6 text-white/80">
         
            <button 
              onClick={() => setisopen(true)} 
              className="hover:text-white transition-colors cursor-pointer bg-transparent border-none"
            >
              اتصل بنا
            </button>

          </div>
          <a
        href="https://www.instagram.com/adrenaline.aabu?igsh=ajcyeGhpeDdoam51" 
        target="_blank" 
        rel="noopener noreferrer" 
        className="group flex items-center gap-2 px-4 py-2 rounded-2xl bg-gradient-to-tr from-[#f9ce34] via-[#ee2a7b] to-[#6228d7] text-white font-medium shadow-md hover:shadow-xl hover:scale-105 transition-all duration-300"
      >
       
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="transition-transform duration-350 group-hover:rotate-12"
        >
          <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
          <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
        </svg>

        
        <span className="text-sm font-bold tracking-wide select-none">
          تابعنا على إنستغرام
        </span>
      </a>
        </div>
      </footer>


      {isopen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 animate-fade-in">
          <div dir="rtl" className="max-w-md w-full p-6 bg-white border rounded-3xl shadow-xl text-right relative">
            
  
            <button 
              onClick={() => setisopen(false)} 
              className="absolute top-4 left-4 text-gray-400 hover:text-gray-600 font-bold text-lg"
            >
              ✕
            </button>

            <h2 className="text-2xl font-black mb-6 text-[#891593]">تواصل معنا</h2>
            
            <form action={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-bold mb-1 text-gray-700">الاسم</label>
                <input 
                  type="text" 
                  name="name" 
                  required 
                  className="w-full px-4 py-2 border rounded-xl bg-gray-50 text-gray-900 outline-none focus:border-[#891593]" 
                  placeholder="اكتب اسمك الكريم هنا..." 
                />
              </div>
              <div>
                <label className="block text-sm font-bold mb-1 text-gray-700">الرسالة</label>
                <textarea 
                  name="message" 
                  required 
                  rows={5} 
                  className="w-full px-4 py-2 border rounded-xl bg-gray-50 text-gray-900 outline-none resize-none focus:border-[#891593]" 
                  placeholder="اكتب تفاصيل استفسارك هنا..." 
                />
              </div>
              <button 
                type="submit" 
                className="w-full text-white font-bold py-2.5 rounded-xl shadow transition hover:opacity-90" 
                style={{ backgroundColor: "#891593" }}
              >
                إرسال الرسالة
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
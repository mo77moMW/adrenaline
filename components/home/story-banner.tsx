"use client"
import React from "react";
import Image from "next/image";
import { useState } from "react";

export function StoryBanner() {
  const [isopen, setisopen] = useState(false);
  return (
    <section className="py-12 md:py-20 px-4 md:px-12 bg-white dark:bg-zinc-950">
      <div className="mx-auto max-w-6xl relative rounded-3xl overflow-hidden aspect-[2.4/1] md:aspect-[3/1] shadow-xl shadow-purple-900/5 group" onClick={()=>{setisopen(true)}}>

        {/* الصورة الخلفية للبانر */}
        <Image
          src="/dm&dff.jpg"
          alt="قصة ادريانو و ادرينا"
          fill
          priority
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          sizes="(max-w-1200px) 100vw, 1200px"
        />

        {/* طبقة تظليل داكنة مع تدرج لضمان وضوح النص */}
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/70 via-zinc-950/45 to-zinc-950/20" />

        {/* النص في المنتصف مع تأثير الزجاج (Glassmorphism) */}
        <div className="absolute inset-0 flex items-center justify-center p-6 text-center">
          <div className="bg-white/10 backdrop-blur-md border border-white/20 px-8 py-4 sm:px-12 sm:py-6 rounded-2xl md:rounded-3xl shadow-lg max-w-lg transition-transform duration-300 group-hover:scale-105">
            <h3 className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight drop-shadow-md select-none">
              قصة ادريانو و ادرينا
            </h3>
            <p className="text-white/80 text-xs sm:text-sm md:text-base font-medium mt-2 drop-shadow-sm select-none">
              رحلة مشوقة في عالم الطب والعلوم
            </p>
          </div>
        </div>

      </div>

{isopen && (
  <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fade-in" onClick={() => setisopen(false)}>
   
    <div 
      dir="rtl" 
      className="bg-white dark:bg-zinc-900 border-[#891593] border-2 rounded-3xl p-6 md:p-8 max-w-lg w-full shadow-2xl text-center relative max-h-[90vh] overflow-y-auto"
      onClick={(e) => e.stopPropagation()}
    >

      <button 
        onClick={() => setisopen(false)} 
        className="absolute top-4 left-4 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 text-xl font-bold cursor-pointer transition-colors"
      >
        ✕
      </button>


      <h3 className="text-2xl font-black text-[#891593] mb-4">
        قصة أدرينو وأدريانا
      </h3>
      

      <p className="whitespace-pre-line text-zinc-700 dark:text-zinc-300 text-sm md:text-base leading-relaxed font-medium">
  {`في مساء هادئ، كانا طفلين عاديين.

  فجأة.. 
  ومض ضوء أخضر شق السماء! 
  من كوكب أدرينالين أُرسلت رسالة حية. 
  لم يكن دمارًا بل كان اختيارًا!
  
  الزمن تجمد.. 
  الكتاب الفضائي فتح صفحاته.
  عظام تتشكل من جديد، عضلات تنمو، وأعين تتوهج!
  
  الطفولة تلاشت وبدأ التحول.. 
  تم تفعيل الجينات الأدرينالينية! 
  أنتما الآن حملة إرث كوكب أدرينالين. 
  
  منذ تلك اللحظة لم يعودا طفلين.. 
  وهنا تبدأ الأسطورة!
  
   أدرينو وأدريانا هما الهوية البصرية للجنة الأكاديمية ✨`}

  <a href="https://www.instagram.com/adreno.adriana?igsh=MTJiMDUyZXVlaTJ5eg==" className="block mt-4 pt-4 border-t border-zinc-100 dark:border-zinc-800 text-[#891593] font-bold">
      تابع صفحتهم على الانستغرام 
  </a>
</p>
    </div>
  </div>
)}
    </section>
  );
}

import React from "react";

export function AdrilaeneGrid() {
  // بيانات تجريبية للمربعات لجعلها تبدو كتصميم احترافي
  const cards = [
    { id: 1, title: "الورش الطبية", desc: "تدريب عملي للأطباء", gradient: "from-purple-500/10 to-indigo-500/10" },
    { id: 2, title: "الملخصات العلمية", desc: "تبسيط المحتوى الأكاديمي", gradient: "from-blue-500/10 to-teal-500/10" },
    { id: 3, title: "بنك الأسئلة", desc: "أسئلة للتقييم الذاتي", gradient: "from-rose-500/10 to-orange-500/10" },
    { id: 4, title: "المؤتمرات", desc: "تغطية الفعاليات الطبية", gradient: "from-emerald-500/10 to-teal-500/10" },
    { id: 5, title: "المكتبة الشاملة", desc: "أحدث المراجع الطبية الموثوقة والكتب الدراسية لجميع المراحل", gradient: "from-violet-500/20 to-fuchsia-500/20", isTall: true },
    { id: 6, title: "حالات سريرية", desc: "تحليل حالات واقعية", gradient: "from-amber-500/10 to-yellow-500/10" },
    { id: 7, title: "أدوات الطبيب", desc: "تطبيقات وأدوات مساعدة", gradient: "from-cyan-500/10 to-blue-500/10" },
  ];

  return (
    <section className="py-16 md:py-24 bg-slate-50 dark:bg-zinc-900/50" id="departments">
      <div className="mx-auto max-w-7xl px-4 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">

          {/* شبكة الصور/البطاقات */}
          <div className="lg:col-span-11 grid grid-cols-12 gap-4 sm:gap-6">

            {/* العمود الأيسر (Left Column) */}
            <div className="col-span-12 sm:col-span-5 flex flex-col gap-4 sm:gap-6">

              {/* بطاقة 1 */}
              <div className="group relative overflow-hidden rounded-3xl border border-zinc-200/80 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900 aspect-[4/3]">
                <img src="p10.jpeg" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" alt="الورش الطبية" />
              </div>

              {/* بطاقة 2 */}
              <div className="group relative overflow-hidden rounded-3xl border border-zinc-200/80 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900 aspect-[4/3]">
                <img src="p11.jpeg" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" alt="الملخصات العلمية" />
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-teal-500/5 opacity-100 transition-transform duration-500" />
              </div>

              {/* صف بطاقتين صغيرتين (بطاقة 3 و 4) */}
              <div className="grid grid-cols-2 gap-4 sm:gap-6">
                <div className="group relative overflow-hidden rounded-2xl border border-zinc-200/80 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900 aspect-square">
                  <img src="p14.jpeg" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" alt="بنك الأسئلة" />
                </div>

                <div className="group relative overflow-hidden rounded-2xl border border-zinc-200/80 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900 aspect-square">
                  <img src="p4.jpeg" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" alt="المؤتمرات" />
                </div>
              </div>

            </div>

            {/* العمود الأيمن (Right Column) */}
            <div className="col-span-12 sm:col-span-7 flex flex-col gap-4 sm:gap-6">

              {/* بطاقة 5 (الطويلة) */}
              <div className="group relative overflow-hidden rounded-3xl border border-zinc-200/80 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900 sm:flex-1 min-h-[300px]">
                <img src="p15.jpg" className="w-full h-[650px] object-cover transition-transform duration-500 group-hover:scale-105" alt="المكتبة الشاملة" />
              </div>

              {/* صف بطاقتين (بطاقة 6 و 7) */}
              <div className="grid grid-cols-2 gap-4 sm:gap-6">
                <div className="group relative overflow-hidden rounded-3xl border border-zinc-200/80 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900 aspect-[4/3]">
                  <img src="p12.jpeg" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" alt="حالات سريرية" />
                </div>

                <div className="group relative overflow-hidden rounded-3xl border border-zinc-200/80 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900 aspect-[4/3]">
                  <img src="p13.jpeg" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" alt="أدوات الطبيب" />
                </div>
              </div>

            </div>

          </div>

          {/* النص العمودي "ADRILAENE" (يظهر فقط في الشاشات الكبيرة) */}
          <div className="hidden lg:col-span-1 lg:flex flex-col items-center justify-center relative select-none">
            <h2
              className="text-7xl xl:text-8xl font-black text-brand-purple/10 dark:text-purple-950/30 tracking-widest"
              style={{
                writingMode: "vertical-rl",
                textTransform: "uppercase",
                transform: "rotate(180deg)",
              }}
            >
              ADRILAENE
            </h2>
          </div>

        </div>
      </div>
    </section>
  );
}

import React from "react";

export function AboutUs() {
  return (
    <section className="py-16 md:py-24 bg-white dark:bg-zinc-950" id="about">
      <div className="mx-auto max-w-4xl px-6 text-center">
        {/* العنوان */}
        <h2 className="text-3xl md:text-5xl font-extrabold text-brand-purple tracking-tight mb-8 dark:text-purple-400">
          من نحن
        </h2>

        {/* النص التعريفي */}
        <div className="max-w-2xl mx-auto">
          <p className="text-lg md:text-xl text-zinc-700 dark:text-zinc-300 leading-relaxed font-normal">
            منصة أدرينالين هي مبادرة طلابية وأكاديمية رائدة تهدف إلى تبسيط العلوم الطبية وتوفير مصادر تعليمية وتدريبية متكاملة لطلاب الكليات الطبية والأطباء حديثي التخرج.
          </p>
          <p className="text-lg md:text-xl text-zinc-700 dark:text-zinc-300 leading-relaxed font-normal mt-4">
            نسعى من خلال أنشطتنا وفعالياتنا إلى سد الفجوة بين التعليم الأكاديمي والخبرة العملية في بيئة تفاعلية وداعمة، مما يساعد الأطباء في بدء مسيرتهم المهنية بثقة واحترافية عالية.
          </p>
        </div>
      </div>
    </section>
  );
}

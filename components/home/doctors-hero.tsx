import React from "react";
import Image from "next/image";

export function DoctorsHero() {
  return (
    <section className="py-12 md:py-20 flex flex-col items-center justify-center text-center px-4">
      {/* العنوان الرئيسي */}
      <h2 className="text-4xl md:text-6xl font-extrabold text-brand-purple tracking-tight mb-8 dark:text-purple-400">
       لك من ادرينالين نبضٌ، ومنك للخطى ركنٌ
      </h2>

      {/* الرسوم التوضيحية للأطباء */}
      <div className="relative w-full max-w-lg md:max-w-xl aspect-square overflow-hidden rounded-3xl transition-transform hover:scale-[1.01] duration-500">
        <Image
          src="/hi.png"
          alt="مرحبا بالأطباء"
          fill
          priority
          className="object-contain"
          sizes="(max-w-768s) 100vw, 576px"
        />
      </div>
    </section>
  );
}

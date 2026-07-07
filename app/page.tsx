

import React from "react";
import { Header } from "@/components/layout/header";
import { DoctorsHero } from "@/components/home/doctors-hero";
import { Roadmap } from "@/components/home/roadmap";
import { AdrilaeneGrid } from "@/components/home/adrilaene-grid";
import { AboutUs } from "@/components/home/about-us";
import { StoryBanner } from "@/components/home/story-banner";
import { Footer } from "@/components/layout/footer";
import { Newnews } from "@/components/home/newnews";
import { News } from "./news/news";

import prisma from "@/lib/db";

export default async function Home() {
  const dbstps = await prisma.news.findMany();
  return (
    <div className="flex flex-col min-h-screen bg-white text-zinc-900 dark:bg-zinc-950 dark:text-zinc-50">
      {/* 1. رأس الصفحة والتنقل */}
      

      {/* المحتوى الرئيسي */}
      <main className="flex-grow">
        
        {/* 2. مرحبا بالأطباء (Hero Section) */}
        <DoctorsHero />

        {/* 3. من هم ادرينالين (Roadmap) */}
        <Roadmap />

        {/* 4. شبكة المكونات والأقسام (Adrilaene Grid) */}
        <AdrilaeneGrid />

        {/* 5. من نحن (About Section) */}
        

        {/* 6. قصة ادريانو و ادرينا (Story Banner) */}
        <StoryBanner />

        <News initialNews={dbstps} limit={3} />

      </main>

      {/* 7. تذييل الصفحة (Footer) */}
      
    </div>
  );
}

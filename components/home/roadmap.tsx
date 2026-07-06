"use client";

import { title } from "process";
import React, { useState } from "react";
import { DetailsCard } from "../detailsCard";

interface StepItem {
  id: string;
  label: string; // اسم ملف الصورة أو الـ Label
  x: number;
  y: number;
  title: string;
  desc: string;
  img:string;
}

export function Roadmap() {
  const desktopSteps = [
    { id: "start", label: "اللجنة الأكاديمية", x: 92, y: 20 ,title:"اللجنة الأكاديمية" ,desc:'لجنة مختصة بالشؤون الدراسية، من تلخيص المواد وتفريغها وتدقيقها، وضع الأسئلة، وتنظيم المحتوى الأكاديمي بشكل عاميهدف عمل اللجنة إلى إنشاء مكتبة خاصة لتكون مرجعًا لكل الطلاب',img:"a.jpeg"},
    { id: "first-effect", label: "اللجنة الإعلامية" , x: 75, y: 65 ,title:"اللجنة الإعلامية" ,desc:'اللجنة المسؤولة عن النشر الإعلامي للفريق ويتضمن الهوية البصرية للفريق ، وهي حلقة الوصل بين الفريق والطلاب تهدف إلى توثيق أنشطة الفريق ، وتقديم محتوى علمي طبي مفيد ، ونشر المحتوى الأكاديمي على أوسع نطاق ، ونقل رسالة الفريق بأسلوب احترافي وجذّاب مُتقبل للشباب',img:"s.jpg"},
    { id: "hope", label: "اللجنة الميدانية" , x: 58, y: 25 ,title:"اللجنة الميدانية" ,desc:'اللجنة المسؤولة عن الحضور الميداني للفريق عن طريق التخطيط للفعاليات وتنفيذها وتنظيمها تهدف إلى إبراز المعاني التي من أجلها تأسس الفريق',img:"m.jpg" },
    { id: "activities", label: "اللجنة الثقافية", x: 42, y: 75,title:"اللجنة الثقافية" ,desc:'هي لجنة داخلية تم استحداثها داخل الفريق بهدف خلق مساحة للحوار البنّاء وتبادل المعرفة والخبرات بين الأعضاء. تهدف اللجنة إلى رفع الوعي في مختلف المجالات، وتعزيز التفكير النقدي، وتشجيع النقاشات الهادفة التي تثري الأعضاء على المستوى الشخصي والمهني.',img:"th.jpg" },
    { id: "pictures", label: "من نحن", x: 25, y: 35,title:"من نحن" ,desc:"أدرينالين فريق طلابي أكاديمي احتوى نخبة من طلبة كلية العلوم الطبية التطبيقية ، جمعنا الشغف بالعلم والإيمان بالمسؤولية تجاه وطننا ومجتمعنا ، لنشكل فريقاً أكاديمياً يسعى للريادة وتطوير المهارات الطبيةولا يتّبع أي توجه أو تيار سياسي أو ديني",img:"logo.PNG" },
    { id: "adriano", label: "رؤيتنا و اهدافنا", x: 8, y: 60,title:"رؤيتنا و اهدافنا" ,desc:`رؤيتنا:
المساهمة في بناء جيل طلابي واعد، يقود عجلة الابتكار والإبداع، ويصنع الفارق في الفكر الريادي والتطوير الصحي المستدام.

الأهداف:
- تفعيل الدور الريادي للشباب وتمكينهم في قيادة المجتمع.
- تطوير وتنمية المهارات الأكاديمية والشخصية لطلبة الجامعة في مختلف المجالات.
- نشر الوعي الصحي والثقافة الطبية بأساليب مبتكرة وقريبة من الشباب.
- ترسيخ ثقافة العمل التطوعي كقيمة أساسية لبناء المجتمع.`,img:"logo.png" },
  ];

  const mobileSteps = [
    { id: "start", label: "اللجنة الأكاديمية", x: 75, y: 10 ,title:"اللجنة الأكاديمية" ,desc:'لجنة مختصة بالشؤون الدراسية، من تلخيص المواد وتفريغها وتدقيقها، وضع الأسئلة، وتنظيم المحتوى الأكاديمي بشكل عاميهدف عمل اللجنة إلى إنشاء مكتبة خاصة لتكون مرجعًا لكل الطلاب',img:"a.jpeg"},
    { id: "first-effect", label: "اللجنة الإعلامية" , x: 25, y: 26,title:"اللجنة الإعلامية" ,desc:'اللجنة المسؤولة عن النشر الإعلامي للفريق ويتضمن الهوية البصرية للفريق ، وهي حلقة الوصل بين الفريق والطلاب تهدف إلى توثيق أنشطة الفريق ، وتقديم محتوى علمي طبي مفيد ، ونشر المحتوى الأكاديمي على أوسع نطاق ، ونقل رسالة الفريق بأسلوب احترافي وجذّاب مُتقبل للشباب',img:"s.jpg"  },
    { id: "hope", label: "اللجنة الميدانية" , x: 25, y: 42,title:"اللجنة الميدانية" ,desc:'اللجنة المسؤولة عن الحضور الميداني للفريق عن طريق التخطيط للفعاليات وتنفيذها وتنظيمها تهدف إلى إبراز المعاني التي من أجلها تأسس الفريق',img:"m.jpg" },
    { id: "activities", label: "اللجنة الثقافية", x: 75, y: 58,title:"اللجنة الثقافية" ,desc:'هي لجنة داخلية تم استحداثها داخل الفريق بهدف خلق مساحة للحوار البنّاء وتبادل المعرفة والخبرات بين الأعضاء. تهدف اللجنة إلى رفع الوعي في مختلف المجالات، وتعزيز التفكير النقدي، وتشجيع النقاشات الهادفة التي تثري الأعضاء على المستوى الشخصي والمهني.',img:"th.jpg" },
    { id: "pictures", label: "من نحن", x: 75, y: 74,title:"من نحن" ,desc:"أدرينالين فريق طلابي أكاديمي احتوى نخبة من طلبة كلية العلوم الطبية التطبيقية ، جمعنا الشغف بالعلم والإيمان بالمسؤولية تجاه وطننا ومجتمعنا ، لنشكل فريقاً أكاديمياً يسعى للريادة وتطوير المهارات الطبيةولا يتّبع أي توجه أو تيار سياسي أو ديني",img:"logo.PNG" },
    { id: "adriano", label: "رؤيتنا و اهدافنا", x: 25, y: 90 ,title:"رؤيتنا و اهدافنا" ,desc:`رؤيتنا:
المساهمة في بناء جيل طلابي واعد، يقود عجلة الابتكار والإبداع، ويصنع الفارق في الفكر الريادي والتطوير الصحي المستدام.

الأهداف:
- تفعيل الدور الريادي للشباب وتمكينهم في قيادة المجتمع.
- تطوير وتنمية المهارات الأكاديمية والشخصية لطلبة الجامعة في مختلف المجالات.
- نشر الوعي الصحي والثقافة الطبية بأساليب مبتكرة وقريبة من الشباب.
- ترسيخ ثقافة العمل التطوعي كقيمة أساسية لبناء المجتمع.`,img:"logo.png"},
  ];
  const [isopen,setisopen]=useState(false)
 const [activeStep, setActiveStep] = useState<StepItem | null>(null);
  return (
    <section className="py-16 md:py-24 bg-white dark:bg-zinc-950 overflow-hidden" id="roadmap" >
      <div className="mx-auto w-full max-w-6xl px-6 flex flex-col items-center">
        
        {/* العنوان */}
        <h2 className="text-3xl md:text-5xl font-extrabold text-brand-purple tracking-tight mb-16 dark:text-purple-400">
          من هم ادرينالين
        </h2>

        {/* عرض الشاشات الكبيرة (Desktop View) */}
        <div className="hidden md:block relative w-full aspect-[2.5/1] mx-auto mt-8">
          {/* الخط المتقطع للمسار */}
          <svg
            viewBox="0 0 1000 400"
            className="absolute inset-0 w-full h-full text-brand-purple dark:text-purple-500 opacity-60 pointer-events-none"
            style={{ zIndex: 0 }}
          >
            <path
              d="M 920 80 L 750 260 L 580 100 L 420 300 L 250 140 L 80 240"
              fill="none"
              stroke="currentColor"
              strokeWidth="4"
              strokeDasharray="12 12"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>

          {/* دوائر المسار */}
          {desktopSteps.map((step) => (
            <div
              key={step.id}
              className="absolute -translate-x-1/2 -translate-y-1/2"
              style={{ left: `${step.x}%`, top: `${step.y}%`, zIndex: 1 }} onClick={()=>setActiveStep(step)}
            >
              
              <div className="group relative flex h-28 w-28 items-center justify-center rounded-full bg-brand-purple text-white font-bold text-lg xl:text-xl shadow-lg shadow-purple-900/20 transition-all duration-300 hover:scale-110 hover:bg-brand-purple/90 active:scale-95 cursor-pointer dark:bg-purple-800 dark:hover:bg-purple-700">
                {/* تأثير نبض خفيف خلف الدائرة */}
                <div className="absolute inset-0 rounded-full bg-brand-purple animate-ping opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                <span className="text-center select-none  rounded-full" >{step.label}</span>
              </div>
            </div>
          ))}
        </div>

        {/* عرض الشاشات الصغيرة للهواتف (Mobile View) */}
        <div className="block md:hidden relative w-full max-w-sm aspect-[1/2] mx-auto mt-4">
          {/* الخط المتقطع للمسار على الموبايل */}
          <svg
            viewBox="0 0 400 800"
            className="absolute inset-0 w-full h-full text-brand-purple dark:text-purple-500 opacity-60 pointer-events-none"
            style={{ zIndex: 0 }}
          >
            <path
              d="M 300 80 L 100 208 L 100 336 L 300 464 L 300 592 L 100 720"
              fill="none"
              stroke="currentColor"
              strokeWidth="3.5"
              strokeDasharray="10 10"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>

          {/* دوائر المسار على الموبايل */}
          {mobileSteps.map((step) => (
            <div
              key={step.id}
              className="absolute -translate-x-1/2 -translate-y-1/2"
              style={{ left: `${step.x}%`, top: `${step.y}%`, zIndex: 1 }}  onClick={()=>setActiveStep(step)}
            >
              <div className="group relative flex h-20 w-20 items-center justify-center rounded-full bg-brand-purple text-white font-bold text-base shadow-md shadow-purple-900/20 transition-all duration-300 hover:scale-110 hover:bg-brand-purple/90 active:scale-95 cursor-pointer dark:bg-purple-800 dark:hover:bg-purple-700">
                {/* تأثير نبض خفيف خلف الدائرة */}
                <div className="absolute inset-0 rounded-full bg-brand-purple/20 animate-ping opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                <span className="text-center select-none  rounded-full" >{step.label}</span>
              </div>
            </div>
          ))}
        </div>

      </div>
      {activeStep && (
        <>
          
          <div 
            className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm transition-opacity duration-300"
            onClick={() => setActiveStep(null)} // سكر لما يضغط برا
          />
          
          <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-[90%] ">
          <DetailsCard title={activeStep.title} desc={activeStep.desc} img={activeStep.img}/>
          </div>
        </>
      )}
    </section>
  );
}

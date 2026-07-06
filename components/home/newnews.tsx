import Link from "next/link";
import { useEffect, useState } from "react";

interface news{
    id:number;
    title:string;
    desc: string;
    url:string
    
}
interface NewnewsProps {
  limit?: number;
}

export function Newnews({ limit }: NewnewsProps){
    const [news,setnews]=useState<news[]>([]);
    useEffect(()=>{
       
        const makedata :news[]=[{id:1,title:"اعلان فوز البرازيل ",desc:"فاز البرازيل على اليابان في الدقيقة 96 بعد تسجيل نجم ارسنال و المنتخل البرازيلي جابريال مارتنيلي هدف الثاني للبرازيل بالمبارة لتصبح البارزيل ثاني المتأهلين لدور 16 بعد فوزها على اليابن 2-1",url:"https://www.al3ahed.com/gpa"}
            ,{id:2,title:"اعلان فوز الوحدات ",desc:"فاز البرازيل على اليابان في الدقيقة 96 بعد تسجيل نجم ارسنال و المنتخل البرازيلي جابريال مارتنيلي هدف الثاني للبرازيل بالمبارة لتصبح البارزيل ثاني المتأهلين لدور 16 بعد فوزها على اليابن 2-1",url:"https://www.al3ahed.com/gpa"}
            ,{id:3,title:"اعلان فوز فرنسا 70-2 ",desc:"فاز البرازيل على اليابان في الدقيقة 96 بعد تسجيل نجم ارسنال و المنتخل البرازيلي جابريال مارتنيلي هدف الثاني للبرازيل بالمبارة لتصبح البارزيل ثاني المتأهلين لدور 16 بعد فوزها على اليابن 2-1",url:"https://www.al3ahed.com/gpa"}
            ,{id:4,title:"اعلان فوز عمان ",desc:"فاز البرازيل على اليابان في الدقيقة 96 بعد تسجيل نجم ارسنال و المنتخل البرازيلي جابريال مارتنيلي هدف الثاني للبرازيل بالمبارة لتصبح البارزيل ثاني المتأهلين لدور 16 بعد فوزها على اليابن 2-1",url:"https://www.al3ahed.com/gpa"}
            ,{id:5,title:"اعلان فوز البراجواي ",desc:"فاز البرازيل على اليابان في الدقيقة 96 بعد تسجيل نجم ارسنال و المنتخل البرازيلي جابريال مارتنيلي هدف الثاني للبرازيل بالمبارة لتصبح البارزيل ثاني المتأهلين لدور 16 بعد فوزها على اليابن 2-1",url:"https://www.al3ahed.com/gpa"}
        ]
        setnews(makedata);
    },[])
    const sortedNews = [...news].sort((a, b) => b.id - a.id);
    const displayedNews = limit ? sortedNews.slice(0, limit) : sortedNews;
    
    return(
        <>
        <h1 className="text-[#891593] text-3xl  md:text-5xl font-black mb-12 text-center " >أخر الاخبار</h1>
        <Link href={"/news"}> see all</Link>
        {displayedNews.map((item)=>(
            <Link href={`${item.url}`} key={item.id} className=" flex flex-col border-y-2 border-[#236371]  py-6 px-6 gap-2 ">
                
                    <h1 className="text-[#891593] text-3xl font-black" >{item.title} </h1>
                    <p className="text-[#236371] line-clamp-1">{item.desc}  </p>
            </Link>
        ))}

        </>
    )
}
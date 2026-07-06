import prisma from "@/lib/db";
import { notFound } from "next/navigation";
import { Header } from "@/components/layout/header";

interface Detalis{
    params:Promise<{id:number}>
}
function renderTextWithLinks(text:string){
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    const parts = text.split(urlRegex);
    return parts.map((part, index) => {
   
    if (urlRegex.test(part)) {
      return (
        <a 
          key={index} 
          href={part} 
          target="_blank" 
          rel="noopener noreferrer" 
          className="text-blue-600 hover:underline font-medium break-all"
        >
          {part}
        </a>
      );
    }
   
    return part;
  });
}

export default async function DetalisNews({params}:Detalis) {

    const { id }= await params;

    const newsitem= await prisma.news.findUnique({
        where:{id:Number(id)},
    });

    if(!newsitem){
        notFound();
    }
    return(
        <>
        <Header />
         <div  className=" flex flex-col  border-[#236371]  py-6 px-6 gap-2 ">
                    <h1 className="text-[#891593] text-3xl font-black" >{newsitem.title} </h1>
                    <p className="text-[#236371] whitespace-pre-line ">{renderTextWithLinks(newsitem.desc)}  </p>
            </div>
        </>
    )
}
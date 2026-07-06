import Link from "next/link";

interface News{
    id:number;
    title:string;
    desc:string;
    
}
interface NewsProps {
  initialNews: News[];
  limit?: number; 
}


export function News({ initialNews, limit }: NewsProps){
    const sortedNews = [...initialNews].sort((a, b) => b.id - a.id);
    const displayedNews = limit ? sortedNews.slice(0, limit) : sortedNews;
    return(
        <>
        <h1 className="text-[#891593] text-3xl  md:text-5xl font-black mb-12 text-center mt-6 " >أخر الاخبار</h1>
        {limit&&(
            <Link href="/news" className="text-zinc-500 hover:text-[#891593] block text-left mx-8 mb-4">
          مشاهدة الكل ←
        </Link>
        )}
        {displayedNews.map((item)=>(
            <Link href={`news/${item.id}`} key={item.id} className=" flex flex-col border-t-2 border-[#236371]  py-6 px-6 gap-2 ">
                
                    <h1 className="text-[#891593] text-3xl font-black" >{item.title} </h1>
                    <p className="text-[#236371] line-clamp-1 ">{item.desc}</p>
            </Link>
        ))}
        </>
    )
}
import { useState } from "react";

interface details{
    title:string;
    desc:string;
    img:string;
}
export function DetailsCard({title,desc,img }:details){
    const [detail,setdetail]=useState<details[]>([]);
   return( <>
    <div className="flex flex-col items-center justify-center bg-white border-[#891593] border-2 p-12 rounded-2xl gap-4 ">
        <h1 className="text-[#891593] font-black md:text-4xl">{title}</h1>
        <div className="md:flex md:flex-row items-center gap-1">
        <img src={`${img}`} className="h-64 w-48 self-start"/>

        <p className="text-[#891593] md:text-2xl whitespace-pre-line ">{desc}</p>
        </div>

        
        
    </div>
    </>)
}
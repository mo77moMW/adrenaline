import prisma from "@/lib/db"
import { News } from "./news"
import { Header } from "@/components/layout/header";
export default async function NewsPage(){

    const dbstps =await prisma.news.findMany();
    return(
        <>
        <Header />
        <News initialNews={dbstps} />
        </>
    )
}
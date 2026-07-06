"use server";

import prisma from "@/lib/db";
import { revalidatePath } from "next/cache";

// 1. جلب كل البيانات من جدول adre_db مرتبة من الأحدث للأقدم
export async function getAdreData() {
  try {
    return await prisma.adre_db.findMany({
      orderBy: {
        id: "desc",
      },
    });
  } catch (error) {
    console.error("Failed to fetch data from Neon:", error);
    return [];
  }
}

// 2. إضافة مادة جديدة (جاهزة لاستقبال حقل الصورة)
export async function addAdreItem(formData: FormData) {
  const name = formData.get("name") as string;
  const url = formData.get("url") as string;
  const type = formData.get("type") as string;
  const img = formData.get("img") as string;

  // التحقق من الحقول الأساسية
  if (!name || !url || !type) return;

  try {
    await prisma.adre_db.create({
      data: {
        name: name,
        url: url,
        type: type,
        img: img || "https://picsum.photos/200", // صورة افتراضية مؤقتة حتى نركب Uploadthing
        date_post: new Date(),
      },
    });

    // تحديث الكاش للصفحات لكي تظهر البيانات فوراً
    revalidatePath("/");
    revalidatePath("/dashboard");
  } catch (error) {
    console.error("Failed to add item:", error);
  }
}

// 3. تعديل مادة موجودة حالياً
export async function updateAdreItem(
  id: number, 
  data: { name: string; url: string; type: string; img: string }
) {
  if (!id) return;

  try {
    await prisma.adre_db.update({
      where: { id },
      data: {
        name: data.name,
        url: data.url,
        type: data.type,
        img: data.img,
      },
    });

    revalidatePath("/");
    revalidatePath("/dashboard");
  } catch (error) {
    console.error("Failed to update item:", error);
  }
}

// 4. حذف مادة نهائياً من قاعدة البيانات
export async function deleteAdreItem(id: number) {
  if (!id) return;

  try {
    await prisma.adre_db.delete({
      where: { id },
    });

    revalidatePath("/");
    revalidatePath("/dashboard");
  } catch (error) {
    console.error("Failed to delete item:", error);
  }
}

// --- 📰 أكشنز الأخبار (الجديدة) ---
export async function getNewsData() {
  return await prisma.news.findMany({ orderBy: { id: "desc" } });
}
export async function addNewsItem(formData: FormData) {
  const title = formData.get("title") as string;
  const desc = formData.get("desc") as string;
  const url = formData.get("url") as string; // رابط الصورة
  await prisma.news.create({ data: { title, desc, url } });
  revalidatePath("/dashboard");
}
export async function deleteNewsItem(id: number) {
  await prisma.news.delete({ where: { id } });
  revalidatePath("/dashboard");
}

// --- ✉️ أكشنز تواصل معنا (الجديدة) ---
export async function getContactMessages() {
  return await prisma.contactMessage.findMany({ orderBy: { id: "desc" } });
}
export async function addContactMessage(formData: FormData) {
  const name = formData.get("name") as string;
  const message = formData.get("message") as string;
  await prisma.contactMessage.create({ data: { name, message } });
}
export async function deleteContactMessage(id: number) {
  await prisma.contactMessage.delete({ where: { id } });
  revalidatePath("/dashboard");
}
import { NextResponse } from "next/server";

// بيانات وهمية لمحاكاة قاعدة البيانات
const mockUsers = [
  { id: 1, name: "محمد أحمد", email: "mohamad@example.com", role: "Developer" },
  { id: 2, name: "سارة علي", email: "sara@example.com", role: "Designer" },
  { id: 3, name: "خالد عمر", email: "khaled@example.com", role: "Product Manager" },
];

export async function GET() {
  // هنا يمكنك مستقبلاً جلب البيانات من قاعدة البيانات (مثل Prisma أو Mongoose)
  return NextResponse.json(mockUsers);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const newUser = {
      id: Date.now(),
      name: body.name || "مستخدم جديد",
      email: body.email || "new@example.com",
      role: body.role || "User",
    };

    // في الحقيقة هنا ستقوم بحفظه في قاعدة البيانات
    return NextResponse.json({ message: "تم إضافة المستخدم بنجاح", user: newUser }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "حدث خطأ في معالجة الطلب" }, { status: 400 });
  }
}

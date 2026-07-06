import { addContactMessage } from "../api/users/action";

export default function ContactUs() {
  return (
    <div dir="rtl" className="max-w-md mx-auto my-12 p-6 bg-white border rounded-3xl shadow-sm text-right">
      <h2 className="text-2xl font-black mb-6 text-[#891593]">تواصل معنا</h2>
      <form action={async (formData) => {
        "use server";
        await addContactMessage(formData);
      }} className="space-y-4">
        <div>
          <label className="block text-sm font-bold mb-1">الاسم</label>
          <input type="text" name="name" required className="w-full px-4 py-2 border rounded-xl bg-gray-50 outline-none" placeholder="اكتب اسمك الكريم هنا..." />
        </div>
        <div>
          <label className="block text-sm font-bold mb-1">الرسالة</label>
          <textarea name="message" required rows={5} className="w-full px-4 py-2 border rounded-xl bg-gray-50 outline-none resize-none" placeholder="اكتب تفاصيل استفسارك هنا..." />
        </div>
        <button type="submit" className="w-full text-white font-bold py-2.5 rounded-xl shadow transition" style={{ backgroundColor: "#891593" }}>
          إرسال الرسالة
        </button>
      </form>
    </div>
  );
}
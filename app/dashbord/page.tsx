"use client";

import React, { useState, useEffect } from "react";
import { 
  getAdreData, addAdreItem, deleteAdreItem,
  getNewsData, addNewsItem, deleteNewsItem,
  getContactMessages, deleteContactMessage
} from "../api/users/action"; 
import { UploadButton } from "@/lib/uploadthing";

interface AdreItem { id: number; name: string; url: string; type: string; img: string; }
interface NewsItem { id: number; title: string; desc: string; url: string; }
interface MessageItem { id: number; name: string; message: string; createdAt: any; }

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState<'items' | 'news' | 'messages'>('items');
  const [items, setItems] = useState<AdreItem[]>([]);
  const [news, setNews] = useState<NewsItem[]>([]);
  const [messages, setMessages] = useState<MessageItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploadedImgUrl, setUploadedImgUrl] = useState("");

  useEffect(() => {
    refreshData();
  }, [activeTab]);

  const refreshData = async () => {
    setLoading(true);
    if (activeTab === 'items') {
      const data = await getAdreData();
      setItems(data as any);
    } else if (activeTab === 'news') {
      const data = await getNewsData();
      setNews(data as any);
    } else {
      const data = await getContactMessages();
      setMessages(data as any);
    }
    setLoading(false);
  };

  return (
    <div dir="rtl" className="min-h-screen bg-white text-gray-800 p-6 md:p-12 font-sans">
      <div className="max-w-7xl mx-auto">
        
        {/* هيدر لوحة التحكم */}
        <div className="flex flex-col md:flex-row justify-between items-center border-b-2 border-gray-100 pb-6 mb-4 gap-4">
          <div>
            <h1 className="text-3xl font-extrabold" style={{ color: "#891593" }}>لوحة تحكم النظام</h1>
            <p className="text-gray-500 mt-1">إدارة شاملة للمواد، الأخبار، ورسائل تواصل معنا الواردة</p>
          </div>
          <div className="bg-gray-50 px-4 py-2 rounded-2xl font-bold" style={{ color: "#236371" }}>
            {activeTab === 'items' && `إجمالي المواد: ${items.length}`}
            {activeTab === 'news' && `إجمالي الأخبار: ${news.length}`}
            {activeTab === 'messages' && `إجمالي الرسائل: ${messages.length}`}
          </div>
        </div>

        {/* 🎛️ أزرار التحكم بالتبويبات الثلاثة */}
        <div className="flex flex-wrap gap-3 mb-8">
          <button onClick={() => setActiveTab('items')} className={`px-5 py-2.5 rounded-xl font-bold transition-all ${activeTab === 'items' ? 'text-white bg-[#891593]' : 'bg-gray-100 text-gray-600'}`}>📚 المواد</button>
          <button onClick={() => setActiveTab('news')} className={`px-5 py-2.5 rounded-xl font-bold transition-all ${activeTab === 'news' ? 'text-white bg-[#891593]' : 'bg-gray-100 text-gray-600'}`}>📰 الأخبار</button>
          <button onClick={() => setActiveTab('messages')} className={`px-5 py-2.5 rounded-xl font-bold transition-all ${activeTab === 'messages' ? 'text-white bg-[#891593]' : 'bg-gray-100 text-gray-600'}`}>✉️ رسائل تواصل معنا</button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          
          {/* 📥 شاشة الإدخال (تختفي في تبويب الرسائل لأنه للقراءة فقط) */}
          <div className={`lg:col-span-1 bg-white p-6 rounded-3xl border-2 shadow-sm ${activeTab === 'messages' ? 'hidden lg:hidden' : ''}`} style={{ borderColor: "#236371" }}>
            <h2 className="text-xl font-bold mb-4" style={{ color: "#236371" }}>✦ إضافة جديد</h2>
            
            {activeTab === 'items' ? (
              <form action={async (formData) => { await addAdreItem(formData); refreshData(); setUploadedImgUrl(""); (document.getElementById("form-a") as HTMLFormElement).reset(); }} id="form-a" className="space-y-4">
                <input type="text" name="name" required className="w-full px-4 py-2 border rounded-xl" placeholder="اسم المادة" />
                <input type="url" name="url" required className="w-full px-4 py-2 border rounded-xl text-left" placeholder="رابط URL" />
                <input type="text" name="type" required className="w-full px-4 py-2 border rounded-xl" placeholder="النوع" />
                <div className="p-4 rounded-xl border border-dashed flex flex-col items-center gap-2">
                  <UploadButton endpoint="imageUploader" onClientUploadComplete={(res) => { if (res && res[0]) setUploadedImgUrl(res[0].url); }} onUploadError={(err) => alert(err.message)} />
                  <input type="hidden" name="img" value={uploadedImgUrl} />
                  {uploadedImgUrl && <img src={uploadedImgUrl} className="w-16 h-16 object-cover rounded" />}
                </div>
                <button type="submit" className="w-full text-white font-bold py-3 rounded-xl" style={{ backgroundColor: "#891593" }}>حفظ المادة</button>
              </form>
            ) : (
              <form action={async (formData) => { await addNewsItem(formData); refreshData(); setUploadedImgUrl(""); (document.getElementById("form-n") as HTMLFormElement).reset(); }} id="form-n" className="space-y-4">
                <input type="text" name="title" required className="w-full px-4 py-2 border rounded-xl" placeholder="عنوان الخبر" />
                <textarea name="desc" required rows={4} className="w-full px-4 py-2 border rounded-xl resize-none whitespace-pre-line" placeholder="وصف وتفاصيل الخبر..." />
                <div className="p-4 rounded-xl border border-dashed flex flex-col items-center gap-2">
                  <UploadButton endpoint="imageUploader" onClientUploadComplete={(res) => { if (res && res[0]) setUploadedImgUrl(res[0].url); }} onUploadError={(err) => alert(err.message)} />
                  <input type="hidden" name="url" value={uploadedImgUrl} />
                  {uploadedImgUrl && <img src={uploadedImgUrl} className="w-16 h-16 object-cover rounded" />}
                </div>
                <button type="submit" className="w-full text-white font-bold py-3 rounded-xl" style={{ backgroundColor: "#891593" }}>حفظ ونشر الخبر</button>
              </form>
            )}
          </div>

          {/* 📊 جداول العرض الحية */}
          <div className={`bg-white rounded-3xl border border-gray-200 overflow-hidden shadow-sm ${activeTab === 'messages' ? 'lg:col-span-3' : 'lg:col-span-2'}`}>
            {loading ? (
              <div className="text-center py-20 font-bold" style={{ color: "#236371" }}>جاري مزامنة وجلب البيانات الحية...</div>
            ) : activeTab === 'items' ? (
              /* جدول المواد */
              <table className="w-full text-right border-collapse">
                <thead><tr className="text-white text-sm" style={{ backgroundColor: "#236371" }}><th className="p-4">الصورة</th><th className="p-4">الاسم</th><th className="p-4">التصنيف</th><th className="p-4">العمليات</th></tr></thead>
                <tbody className="divide-y divide-gray-100">
                  {items.map((item) => (
                    <tr key={item.id} className="hover:bg-gray-50/80"><td className="p-4"><img src={item.img} className="w-12 h-12 object-cover rounded-xl" /></td><td className="p-4 font-bold">{item.name}</td><td className="p-4"><span className="text-xs px-2.5 py-1 rounded-full font-bold bg-purple-50" style={{ color: "#891593" }}>{item.type}</span></td><td className="p-4"><button onClick={async () => { if(confirm("حذف؟")){ await deleteAdreItem(item.id); refreshData(); } }} className="text-xs font-bold text-red-600 bg-red-50 px-3 py-1.5 rounded-lg">حذف</button></td></tr>
                  ))}
                </tbody>
              </table>
            ) : activeTab === 'news' ? (
              /* جدول الأخبار */
              <table className="w-full text-right border-collapse">
                <thead><tr className="text-white text-sm" style={{ backgroundColor: "#236371" }}><th className="p-4">الصورة</th><th className="p-4">العنوان</th><th className="p-4">الوصف</th><th className="p-4">العمليات</th></tr></thead>
                <tbody className="divide-y divide-gray-100">
                  {news.map((item) => (
                    <tr key={item.id} className="hover:bg-gray-50/80"><td className="p-4"><img src={item.url} className="w-12 h-12 object-cover rounded-xl" /></td><td className="p-4 font-bold">{item.title}</td><td className="p-4 text-sm truncate max-w-[200px]">{item.desc}</td><td className="p-4"><button onClick={async () => { if(confirm("حذف؟")){ await deleteNewsItem(item.id); refreshData(); } }} className="text-xs font-bold text-red-600 bg-red-50 px-3 py-1.5 rounded-lg">حذف</button></td></tr>
                  ))}
                </tbody>
              </table>
            ) : (
              /* ✉️ جدول استعراض رسائل تواصل معنا الواردة */
              messages.length === 0 ? (
                <div className="text-center py-20 text-gray-400">لا يوجد أي رسائل واردة حالياً.</div>
              ) : (
                <table className="w-full text-right border-collapse">
                  <thead><tr className="text-white text-sm" style={{ backgroundColor: "#236371" }}><th className="p-4">اسم المرسل</th><th className="p-4">نص الرسالة</th><th className="p-4">العمليات</th></tr></thead>
                  <tbody className="divide-y divide-gray-100">
                    {messages.map((msg) => (
                      <tr key={msg.id} className="hover:bg-gray-50/80">
                        <td className="p-4 font-bold text-purple-900">{msg.name}</td>
                        <td className="p-4 text-sm text-gray-700 whitespace-pre-line max-w-xl">{msg.message}</td>
                        <td className="p-4">
                          <button onClick={async () => { if(confirm("هل تريد حذف الرسالة؟")){ await deleteContactMessage(msg.id); refreshData(); } }} className="text-xs font-bold text-red-600 bg-red-50 px-3 py-1.5 rounded-lg">حذف الرسالة</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
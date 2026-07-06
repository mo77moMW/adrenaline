import React from "react";

interface UserCardProps {
  name: string;
  email: string;
  role: string;
}

export function UserCard({ name, email, role }: UserCardProps) {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-zinc-100 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900">
      {/* خلفية تجميلية خفيفة */}
      <div className="absolute -right-4 -top-4 h-16 w-16 rounded-full bg-blue-500/5 blur-xl transition-all duration-500 group-hover:bg-blue-500/10" />
      
      <div className="flex flex-col gap-4">
        {/* الصورة الرمزية والاسم */}
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 font-semibold text-white">
            {name.charAt(0)}
          </div>
          <div>
            <h3 className="font-semibold text-zinc-900 dark:text-white">{name}</h3>
            <span className="inline-block rounded-full bg-blue-50/50 px-2.5 py-0.5 text-xs font-medium text-blue-600 dark:bg-blue-950/40 dark:text-blue-400">
              {role}
            </span>
          </div>
        </div>

        {/* البريد الإلكتروني */}
        <div className="border-t border-zinc-100 pt-3 dark:border-zinc-800/80">
          <p className="text-sm text-zinc-500 dark:text-zinc-400">البريد الإلكتروني:</p>
          <p className="text-sm font-medium text-zinc-700 dark:text-zinc-300 break-all">{email}</p>
        </div>
      </div>
    </div>
  );
}

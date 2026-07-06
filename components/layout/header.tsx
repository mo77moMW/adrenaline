"use client";

import React, { useState } from "react";
import Link from "next/link";

export function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: "الصفحة الرئيسية", href: "/" },
    { name: "الأقسام", href: "/departments" },
    { name: "تواصل معنا", href: "/#footer" },
    { name: "أدرنالين", href: "/#roadmap" },
    { name: "GPA", href: "/gpa" },
  ];

  return (
    <header className="w-full bg-white py-4 px-6 md:px-12 dark:bg-zinc-950 sticky top-0 z-50 shadow-sm/50">
      <div className="mx-auto max-w-7xl flex items-center justify-between w-full">

        {/* زر القائمة للهواتف (Mobile Menu Button) / Spacer on Desktop */}
        <div className="flex md:w-[160px] justify-start">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className=" sm:hidden flex h-10 w-10 items-center justify-center rounded-xl border border-zinc-200 text-zinc-700 hover:bg-zinc-50 dark:border-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-900"
            aria-label="Toggle Menu"
          >
            {isOpen ? (
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>

        {/* القائمة للحواسيب (PC Pill Navbar) */}
        <nav className="hidden md:block ">
          <ul className="flex items-center justify-center gap-1 rounded-full bg-brand-purple px-6 py-2.5 shadow-lg shadow-purple-900/10 dark:bg-purple-900/40">
            {navLinks.map((link) => (
              <li key={link.name}>
                <Link
                  href={link.href}
                  className="px-4 py-1.5 text-sm font-medium text-white/90 rounded-full transition-all hover:text-white hover:bg-white/10"
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* الشعار (Logo) */}
        <div className="flex md:w-[160px] justify-end">
          <Link href="/" className="flex items-center gap-3 group">
            <img src="logo.png" className="h-16" alt="Logo" />
          </Link>
        </div>
      </div>

      {/* القائمة المنسدلة للهواتف (Mobile Dropdown Menu) */}
      {isOpen && (
        <div className="md:hidden mt-4 rounded-2xl border border-zinc-100 bg-white p-4 shadow-xl dark:border-zinc-800/80 dark:bg-zinc-900 animate-in slide-in-from-top duration-200">
          <ul className="flex flex-col gap-2">
            {navLinks.map((link) => (
              <li key={link.name}>
                <Link
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="block w-full rounded-xl px-4 py-3 text-sm font-medium text-zinc-700 hover:bg-brand-purple/5 hover:text-brand-purple dark:text-zinc-300 dark:hover:bg-purple-950/20 dark:hover:text-purple-400"
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}

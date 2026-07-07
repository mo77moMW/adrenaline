"use client";

import React, { useState, useEffect } from "react";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

interface Course {
  id: string;
  credit: number;
  grade: string;
  isRepeated: boolean;
  previousGrade: string;
}

const gradesMapping: Record<string, number> = {
    'A+': 4.0,
    'A': 3.75,
    'A-': 3.5,
    'B+': 3.25,
    'B': 3.0,
    'B-': 2.75,
    'C+': 2.5,
    'C': 2.25,
    'C-': 2.0,
    'D+': 1.75,
    'D': 1.5,
    'F': 0.75
};

export default function GPACalculatorPage() {
  // GPA Inputs state
  const [previousGpa, setPreviousGpa] = useState("");
  const [previousCredits, setPreviousCredits] = useState("");
  const [semesterHoursInput, setSemesterHoursInput] = useState("");
  const [coursesCountInput, setCoursesCountInput] = useState("");

  // Courses state - initialized with 3 default courses as shown in the mockup
  const [courses, setCourses] = useState<Course[]>([
    { id: "1", credit: 3, grade: "", isRepeated: false, previousGrade: "" },
    { id: "2", credit: 3, grade: "", isRepeated: false, previousGrade: "" },
    { id: "3", credit: 3, grade: "", isRepeated: false, previousGrade: "" },
  ]);

  // Results state
  const [semesterGpa, setSemesterGpa] = useState<string | null>(null);
  const [cumulativeGpa, setCumulativeGpa] = useState<string | null>(null);
  const [totalSemesterCredits, setTotalSemesterCredits] = useState(0);
  const [totalCumulativeCredits, setTotalCumulativeCredits] = useState(0);
  const [hasCalculated, setHasCalculated] = useState(false);

  // Sync inputs count when courses length changes manually (+ or - buttons)
  useEffect(() => {
    setCoursesCountInput(courses.length.toString());
    const sumCredits = courses.reduce((sum, c) => sum + (c.credit || 0), 0);
    setSemesterHoursInput(sumCredits.toString());
  }, [courses.length]);

  // Update hours and count when user edits top hours / courses counts
  const handleTopHoursChange = (val: string) => {
    setSemesterHoursInput(val);
    distributeHours(val, coursesCountInput);
  };

  const handleTopCoursesChange = (val: string) => {
    setCoursesCountInput(val);
    distributeHours(semesterHoursInput, val);
  };

  // Automated distribution algorithm
  const distributeHours = (hoursStr: string, countStr: string) => {
    const hours = parseInt(hoursStr) || 0;
    const count = parseInt(countStr) || 0;

    if (hours > 0 && count > 0) {
      const base = Math.floor(hours / count);
      const remainder = hours % count;

      const newCourses = Array.from({ length: count }, (_, i) => {
        const credit = i < remainder ? base + 1 : base;
        return {
          id: (i + 1).toString(),
          credit: credit,
          grade: "",
          isRepeated: false,
          previousGrade: "",
        };
      });

      setCourses(newCourses);
    }
  };

  // Modify individual course field
  const handleCourseChange = (id: string, field: keyof Course, value: any) => {
    setCourses((prevCourses) => {
      const updated = prevCourses.map((c) => {
        if (c.id === id) {
          const updatedCourse = { ...c, [field]: value };
          // If repeating is set to false, reset previous grade
          if (field === "isRepeated" && !value) {
            updatedCourse.previousGrade = "";
          }
          return updatedCourse;
        }
        return c;
      });

      // Recalculate total hours based on individual course changes without regenerating
      const sumCredits = updated.reduce((sum, c) => sum + (c.credit || 0), 0);
      setSemesterHoursInput(sumCredits.toString());
      return updated;
    });
  };

  // Add course row (+)
  const addCourse = () => {
    const nextId = (courses.length > 0 ? Math.max(...courses.map((c) => parseInt(c.id) || 0)) + 1 : 1).toString();
    const newCourse: Course = {
      id: nextId,
      credit: 3, // Default to 3 hours
      grade: "",
      isRepeated: false,
      previousGrade: "",
    };
    setCourses([...courses, newCourse]);
  };

  // Remove last course row (-)
  const removeCourse = () => {
    if (courses.length > 1) {
      setCourses(courses.slice(0, -1));
    }
  };

  // Calculation Logic
  const handleCalculate = () => {
    let semCredits = 0;
    let semWeightedSum = 0;
    let activeSemCoursesCount = 0;

    courses.forEach((course) => {
      const gradeVal = gradesMapping[course.grade];
      if (gradeVal !== undefined && course.credit > 0) {
        semCredits += course.credit;
        semWeightedSum += course.credit * gradeVal;
        activeSemCoursesCount++;
      }
    });

    if (activeSemCoursesCount === 0) {
      // No grades entered
      setSemesterGpa(null);
      setCumulativeGpa(null);
      setHasCalculated(false);
      return;
    }

    const semGpaResult = semCredits > 0 ? semWeightedSum / semCredits : 0;
    setSemesterGpa(semGpaResult.toFixed(2));
    setTotalSemesterCredits(semCredits);

    // Calculate Cumulative GPA
    if (previousGpa && previousCredits) {
      const prevG = parseFloat(previousGpa) || 0;
      const prevC = parseFloat(previousCredits) || 0;

      // Adjust previous totals based on repeated courses
      let adjustedPrevCredits = prevC;
      let adjustedPrevWeighted = prevG * prevC;

      courses.forEach((course) => {
        if (course.isRepeated && gradesMapping[course.previousGrade] !== undefined) {
          const oldGradeVal = gradesMapping[course.previousGrade];
          // Subtract old credit hours and old points from the cumulative totals
          adjustedPrevCredits = Math.max(0, adjustedPrevCredits - course.credit);
          adjustedPrevWeighted = Math.max(0, adjustedPrevWeighted - course.credit * oldGradeVal);
        }
      });

      const totalNewCredits = adjustedPrevCredits + semCredits;
      const totalNewWeighted = adjustedPrevWeighted + semWeightedSum;
      const cumGpaResult = totalNewCredits > 0 ? totalNewWeighted / totalNewCredits : 0;

      setCumulativeGpa(cumGpaResult.toFixed(2));
      setTotalCumulativeCredits(totalNewCredits);
    } else {
      // If no previous GPA is provided, cumulative matches semester
      setCumulativeGpa(semGpaResult.toFixed(2));
      setTotalCumulativeCredits(semCredits);
    }

    setHasCalculated(true);

    // Scroll to results nicely
    setTimeout(() => {
      document.getElementById("results-section")?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  // Reset fields
  const handleReset = () => {
    setPreviousGpa("");
    setPreviousCredits("");
    setSemesterHoursInput("9");
    setCoursesCountInput("3");
    setCourses([
      { id: "1", credit: 3, grade: "", isRepeated: false, previousGrade: "" },
      { id: "2", credit: 3, grade: "", isRepeated: false, previousGrade: "" },
      { id: "3", credit: 3, grade: "", isRepeated: false, previousGrade: "" },
    ]);
    setSemesterGpa(null);
    setCumulativeGpa(null);
    setHasCalculated(false);
  };

  // General standing evaluator
  const getGpaStanding = (gpaVal: number) => {
    if (gpaVal >= 3.75) return { text: "ممتاز", color: "text-emerald-600 dark:text-emerald-400" };
    if (gpaVal >= 3.00) return { text: "جيد جداً", color: "text-teal-600 dark:text-teal-400" };
    if (gpaVal >= 2.50) return { text: "جيد", color: "text-sky-600 dark:text-sky-400" };
    if (gpaVal >= 2.00) return { text: "مقبول", color: "text-amber-600 dark:text-amber-400" };
    if (gpaVal >= 1.00) return { text: "ضعيف", color: "text-orange-600 dark:text-orange-400" };
    return { text: "راسب", color: "text-rose-600 dark:text-rose-400" };
  };

  return (
    <div dir="rtl" className="flex flex-col min-h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-50 font-sans selection:bg-brand-purple/20">


      {/* Main Page Layout */}
      <main className="flex-grow py-12 px-4 md:px-12 mx-auto max-w-7xl w-full">
        {/* Title */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-extrabold text-brand-purple dark:text-purple-400 mb-2">
            حساب المعدل التراكمي والفصلي (GPA)
          </h1>
          <div className="h-1 w-20 bg-brand-purple mx-auto rounded-full"></div>
          <p className="text-zinc-500 dark:text-zinc-400 text-sm mt-3 max-w-md mx-auto">
            احسب معدلك الفصلي والتراكمي بسهولة مع دعم ميزة المواد المعادة والتوزيع التلقائي لساعات الفصل الحالي.
          </p>
        </div>

        {/* 2. Top Inputs Block (Matches mockup structure) */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-end bg-white dark:bg-zinc-900/60 p-6 rounded-3xl border border-zinc-100 dark:border-zinc-800 shadow-md shadow-purple-900/5 max-w-5xl mx-auto w-full mb-10">
          {/* Cumulative GPA */}
          <div className="flex flex-col items-center w-full">
            <label className="text-xs md:text-sm font-bold text-zinc-700 dark:text-zinc-300 mb-2 text-center h-10 flex items-center justify-center">
              معدلك التراكمي
            </label>
            <input
              type="number"
              step="0.01"
              min="0"
              max="4"
              placeholder="0.00"
              value={previousGpa}
              onChange={(e) => setPreviousGpa(e.target.value)}
              className="w-full text-center px-4 py-3 rounded-full border border-purple-200 dark:border-purple-900/60 focus:outline-none focus:ring-2 focus:ring-brand-purple bg-white dark:bg-zinc-950 text-zinc-950 dark:text-zinc-50 font-semibold shadow-inner"
            />
          </div>

          {/* Passed Credits Excluding Current Semester */}
          <div className="flex flex-col items-center w-full">
            <label className="text-xs md:text-sm font-bold text-zinc-700 dark:text-zinc-300 mb-2 text-center h-10 flex flex-col items-center justify-center leading-tight">
              <span>عدد الساعات المقطوعة</span>
              <span className="text-[10px] font-normal text-zinc-400">بدون ساعات الفصل الحالي</span>
            </label>
            <input
              type="number"
              min="0"
              placeholder="0"
              value={previousCredits}
              onChange={(e) => setPreviousCredits(e.target.value)}
              className="w-full text-center px-4 py-3 rounded-full border border-purple-200 dark:border-purple-900/60 focus:outline-none focus:ring-2 focus:ring-brand-purple bg-white dark:bg-zinc-950 text-zinc-950 dark:text-zinc-50 font-semibold shadow-inner"
            />
          </div>

          {/* Hours this Semester / Courses Count */}
          <div className="md:col-span-2 flex flex-col items-center w-full">
            <div className="grid grid-cols-2 gap-2 w-full text-center h-10 items-center justify-center">
              <label className="text-xs md:text-sm font-bold text-zinc-700 dark:text-zinc-300 leading-tight">
                عدد ساعات هذا الفصل
              </label>
              <label className="text-xs md:text-sm font-bold text-zinc-700 dark:text-zinc-300 leading-tight">
                عدد المواد
              </label>
            </div>
            <div className="flex items-center gap-3 w-full">
              <input
                type="number"
                min="0"
                placeholder="0"
                value={semesterHoursInput}
                onChange={(e) => handleTopHoursChange(e.target.value)}
                className="w-full text-center px-4 py-3 rounded-full border border-purple-200 dark:border-purple-900/60 focus:outline-none focus:ring-2 focus:ring-brand-purple bg-white dark:bg-zinc-950 text-zinc-950 dark:text-zinc-50 font-semibold shadow-inner"
              />
              <span className="text-2xl font-bold text-brand-purple dark:text-purple-400 select-none">/</span>
              <input
                type="number"
                min="0"
                placeholder="0"
                value={coursesCountInput}
                onChange={(e) => handleTopCoursesChange(e.target.value)}
                className="w-full text-center px-4 py-3 rounded-full border border-purple-200 dark:border-purple-900/60 focus:outline-none focus:ring-2 focus:ring-brand-purple bg-white dark:bg-zinc-950 text-zinc-950 dark:text-zinc-50 font-semibold shadow-inner"
              />
            </div>
          </div>
        </div>

        {/* 3. Course Rows Container */}
        <div className="mt-8 space-y-4 max-w-5xl mx-auto">
          {courses.map((course, idx) => (
            <div
              key={course.id}
              className="w-full bg-brand-purple dark:bg-purple-950/70 rounded-[24px] p-5 shadow-lg shadow-purple-950/10 text-white transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl"
            >
              {/* Course Card Grid (Exactly matching mockup labels and ordering) */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 items-center">
                {/* 1. Credit Hours */}
                <div className="flex flex-col items-center w-full">
                  <label className="text-[13px] font-bold mb-2 text-center text-white/95">
                    عدد الساعات
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="10"
                    value={course.credit || ""}
                    onChange={(e) => handleCourseChange(course.id, "credit", parseInt(e.target.value) || 0)}
                    className="w-full text-center px-4 py-2.5 rounded-full bg-white dark:bg-zinc-900 text-zinc-950 dark:text-zinc-50 border-none outline-none font-semibold focus:ring-2 focus:ring-brand-teal text-sm shadow-sm"
                  />
                </div>

                {/* 2. Grade in Symbol */}
                <div className="flex flex-col items-center w-full">
                  <label className="text-[13px] font-bold mb-2 text-center text-white/95">
                    العلامة بالرمز
                  </label>
                  <select
                    value={course.grade}
                    onChange={(e) => handleCourseChange(course.id, "grade", e.target.value)}
                    className="w-full text-center px-4 py-2.5 rounded-full bg-white dark:bg-zinc-900 text-zinc-950 dark:text-zinc-50 border-none outline-none font-semibold focus:ring-2 focus:ring-brand-teal text-sm shadow-sm appearance-none cursor-pointer"
                  >
                    <option value="" className="text-zinc-400">اختر</option>
                    {Object.keys(gradesMapping).map((grade) => (
                      <option key={grade} value={grade} className="text-zinc-950 dark:text-zinc-50 font-semibold">{grade}</option>
                    ))}
                  </select>
                </div>

                {/* 3. Is Repeated? */}
                <div className="flex flex-col items-center w-full">
                  <label className="text-[13px] font-bold mb-2 text-center text-white/95">
                    هل المادة معادة
                  </label>
                  <select
                    value={course.isRepeated ? "yes" : "no"}
                    onChange={(e) => handleCourseChange(course.id, "isRepeated", e.target.value === "yes")}
                    className="w-full text-center px-4 py-2.5 rounded-full bg-white dark:bg-zinc-900 text-zinc-950 dark:text-zinc-50 border-none outline-none font-semibold focus:ring-2 focus:ring-brand-teal text-sm shadow-sm appearance-none cursor-pointer"
                  >
                    <option value="no" className="text-zinc-950 dark:text-zinc-50 font-semibold">لا</option>
                    <option value="yes" className="text-zinc-950 dark:text-zinc-50 font-semibold">نعم</option>
                  </select>
                </div>

                {/* 4. Previous Grade */}
                <div className="flex flex-col items-center w-full">
                  <label
                    className={`text-[13px] font-bold mb-2 text-center transition-colors duration-200 ${
                      course.isRepeated ? "text-white/95" : "text-white/40"
                    }`}
                  >
                    العلامة السابقة
                  </label>
                  <select
                    value={course.previousGrade}
                    disabled={!course.isRepeated}
                    onChange={(e) => handleCourseChange(course.id, "previousGrade", e.target.value)}
                    className={`w-full text-center px-4 py-2.5 rounded-full border-none outline-none font-semibold transition-all text-sm appearance-none cursor-pointer shadow-sm
                      ${
                        course.isRepeated
                          ? "bg-white dark:bg-zinc-900 text-zinc-950 dark:text-zinc-50 focus:ring-2 focus:ring-brand-teal"
                          : "bg-white/30 dark:bg-zinc-800/40 text-white/30 cursor-not-allowed"
                      }`}
                  >
                    <option value="" className="text-zinc-400">-</option>
                    {Object.keys(gradesMapping).map((grade) => (
                      <option key={grade} value={grade} className="text-zinc-950 dark:text-zinc-50 font-semibold">{grade}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* 4. Controls Block (Matches mockup center buttons + and -) */}
        <div className="flex items-center justify-center gap-4 mt-8 mb-10 max-w-5xl mx-auto w-full">
          {/* Add Button */}
          <button
            onClick={addCourse}
            className="w-12 h-12 rounded-xl bg-brand-teal text-white flex items-center justify-center font-bold text-2xl shadow-md hover:bg-teal-600 transition-all hover:scale-105 active:scale-95 cursor-pointer"
            title="إضافة مادة"
          >
            <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
            </svg>
          </button>

          {/* Remove Button */}
          <button
            onClick={removeCourse}
            className="w-12 h-12 rounded-xl bg-red-500 text-white flex items-center justify-center font-bold text-2xl shadow-md hover:bg-red-600 transition-all hover:scale-105 active:scale-95 cursor-pointer"
            title="إزالة مادة"
          >
            <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M20 12H4" />
            </svg>
          </button>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 max-w-5xl mx-auto w-full mb-16">
          <button
            onClick={handleCalculate}
            className="w-full sm:w-64 py-4 rounded-full bg-brand-purple text-white hover:bg-purple-800 text-lg font-bold shadow-lg shadow-purple-900/20 transition-all active:scale-98 cursor-pointer text-center"
          >
            احسب المعدل
          </button>
          <button
            onClick={handleReset}
            className="w-full sm:w-64 py-4 rounded-full bg-zinc-200 text-zinc-800 hover:bg-zinc-300 dark:bg-zinc-800 dark:text-zinc-200 dark:hover:bg-zinc-700 text-lg font-bold transition-all active:scale-98 cursor-pointer text-center"
          >
            إعادة تعيين الحقول
          </button>
        </div>

        {/* 5. Custom Premium Results Dashboard */}
        {hasCalculated && semesterGpa !== null && (
          <section
            id="results-section"
            className="max-w-5xl mx-auto w-full bg-white dark:bg-zinc-900 rounded-3xl p-6 md:p-8 border border-purple-100 dark:border-purple-950/40 shadow-xl shadow-purple-900/5 animate-in fade-in slide-in-from-bottom duration-500"
          >
            <h2 className="text-xl md:text-2xl font-bold text-zinc-800 dark:text-zinc-100 text-center mb-6">
              لوحة نتائج المعدل الأكاديمي
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center border-b border-zinc-100 dark:border-zinc-800 pb-8 mb-8">
              {/* Semester GPA Ring */}
              <div className="flex flex-col items-center p-4 bg-purple-50/50 dark:bg-purple-950/10 rounded-2xl border border-purple-100/50 dark:border-purple-950/20">
                <span className="text-sm font-semibold text-zinc-500 dark:text-zinc-400 mb-4">
                  المعدل التراكمي الفصلي
                </span>

                {/* SVG Progress Circle */}
                <div className="relative w-36 h-36 flex items-center justify-center">
                  <svg className="w-full h-full transform -rotate-90">
                    <circle
                      cx="72"
                      cy="72"
                      r="60"
                      className="text-zinc-200 dark:text-zinc-800"
                      strokeWidth="10"
                      fill="transparent"
                      stroke="currentColor"
                    />
                    <circle
                      cx="72"
                      cy="72"
                      r="60"
                      className="text-brand-purple dark:text-purple-400 transition-all duration-1000 ease-out"
                      strokeWidth="10"
                      fill="transparent"
                      stroke="currentColor"
                      strokeDasharray={376.99}
                      strokeDashoffset={376.99 - (376.99 * parseFloat(semesterGpa)) / 4.0}
                      strokeLinecap="round"
                    />
                  </svg>
                  <div className="absolute flex flex-col items-center justify-center">
                    <span className="text-3xl font-extrabold text-brand-purple dark:text-purple-400">
                      {semesterGpa}
                    </span>
                    <span className="text-[10px] text-zinc-400 mt-0.5">من 4.00</span>
                  </div>
                </div>

                <div className="mt-4 flex items-center gap-1.5">
                  <span className="text-xs text-zinc-500 dark:text-zinc-400">التقدير الفصلي:</span>
                  <span className={`text-sm font-bold ${getGpaStanding(parseFloat(semesterGpa)).color}`}>
                    {getGpaStanding(parseFloat(semesterGpa)).text}
                  </span>
                </div>
              </div>

              {/* Cumulative GPA Ring */}
              <div className="flex flex-col items-center p-4 bg-teal-50/50 dark:bg-teal-950/10 rounded-2xl border border-teal-100/50 dark:border-teal-950/20">
                <span className="text-sm font-semibold text-zinc-500 dark:text-zinc-400 mb-4">
                  المعدل التراكمي الكلي
                </span>

                {/* SVG Progress Circle */}
                <div className="relative w-36 h-36 flex items-center justify-center">
                  <svg className="w-full h-full transform -rotate-90">
                    <circle
                      cx="72"
                      cy="72"
                      r="60"
                      className="text-zinc-200 dark:text-zinc-800"
                      strokeWidth="10"
                      fill="transparent"
                      stroke="currentColor"
                    />
                    <circle
                      cx="72"
                      cy="72"
                      r="60"
                      className="text-brand-teal dark:text-teal-400 transition-all duration-1000 ease-out"
                      strokeWidth="10"
                      fill="transparent"
                      stroke="currentColor"
                      strokeDasharray={376.99}
                      strokeDashoffset={376.99 - (376.99 * (parseFloat(cumulativeGpa || "0"))) / 4.0}
                      strokeLinecap="round"
                    />
                  </svg>
                  <div className="absolute flex flex-col items-center justify-center">
                    <span className="text-3xl font-extrabold text-brand-teal dark:text-teal-400">
                      {cumulativeGpa}
                    </span>
                    <span className="text-[10px] text-zinc-400 mt-0.5">من 4.00</span>
                  </div>
                </div>

                <div className="mt-4 flex items-center gap-1.5">
                  <span className="text-xs text-zinc-500 dark:text-zinc-400">التقدير التراكمي:</span>
                  <span className={`text-sm font-bold ${getGpaStanding(parseFloat(cumulativeGpa || "0")).color}`}>
                    {getGpaStanding(parseFloat(cumulativeGpa || "0")).text}
                  </span>
                </div>
              </div>
            </div>

            {/* GPA Breakdown Metrics */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-zinc-50 dark:bg-zinc-950 p-4 rounded-xl text-center">
                <span className="block text-[11px] font-semibold text-zinc-400 dark:text-zinc-500 mb-1">
                  ساعات الفصل الحالي
                </span>
                <span className="text-lg font-bold text-zinc-800 dark:text-zinc-200">
                  {totalSemesterCredits} ساعة
                </span>
              </div>

              <div className="bg-zinc-50 dark:bg-zinc-950 p-4 rounded-xl text-center">
                <span className="block text-[11px] font-semibold text-zinc-400 dark:text-zinc-500 mb-1">
                  الساعات التراكمية الكلية
                </span>
                <span className="text-lg font-bold text-zinc-800 dark:text-zinc-200">
                  {totalCumulativeCredits} ساعة
                </span>
              </div>

              <div className="bg-zinc-50 dark:bg-zinc-950 p-4 rounded-xl text-center">
                <span className="block text-[11px] font-semibold text-zinc-400 dark:text-zinc-500 mb-1">
                  المعدل السابق
                </span>
                <span className="text-lg font-bold text-zinc-800 dark:text-zinc-200">
                  {previousGpa ? parseFloat(previousGpa).toFixed(2) : "غير محدد"}
                </span>
              </div>

              <div className="bg-zinc-50 dark:bg-zinc-950 p-4 rounded-xl text-center flex flex-col items-center justify-center">
                <span className="block text-[11px] font-semibold text-zinc-400 dark:text-zinc-500 mb-1">
                  حالة التغير في المعدل
                </span>
                {previousGpa && cumulativeGpa ? (
                  (() => {
                    const diff = parseFloat(cumulativeGpa) - parseFloat(previousGpa);
                    if (diff > 0) {
                      return (
                        <div className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-bold text-sm">
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 10l7-7m0 0l7 7m-7-7v18" />
                          </svg>
                          <span>+{diff.toFixed(2)}</span>
                          <span className="text-[10px] font-normal">(ارتفاع)</span>
                        </div>
                      );
                    } else if (diff < 0) {
                      return (
                        <div className="flex items-center gap-1 text-rose-600 dark:text-rose-400 font-bold text-sm">
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                          </svg>
                          <span>{diff.toFixed(2)}</span>
                          <span className="text-[10px] font-normal">(انخفاض)</span>
                        </div>
                      );
                    } else {
                      return <span className="text-zinc-500 font-bold text-sm">ثابت</span>;
                    }
                  })()
                ) : (
                  <span className="text-zinc-400 text-xs">لا يوجد معدل سابق للمقارنة</span>
                )}
              </div>
            </div>
          </section>
        )}
      </main>


    </div>
  );
}

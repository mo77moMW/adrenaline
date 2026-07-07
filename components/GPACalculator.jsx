'use client';
import { useState } from 'react';

const gradesMapping = {
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
  
export default function GPACalculator() {
  const [courses, setCourses] = useState([{ name: '', credit: 0, grade: '' }]);
  const [previousGpa, setPreviousGpa] = useState('');
  const [previousCredits, setPreviousCredits] = useState('');
  const [semesterGpa, setSemesterGpa] = useState(null);
  const [cumulativeGpa, setCumulativeGpa] = useState(null);




  const handleCourseChange = (index, field, value) => {
    const updatedCourses = [...courses];
    updatedCourses[index][field] = field === 'credit' ? parseFloat(value) : value;
    setCourses(updatedCourses);
  };

  const addCourse = () => {
    setCourses([...courses, { name: '', credit: 0, grade: '' }]);
  };

  const removeCourse = (index) => {
    const updatedCourses = courses.filter((_, i) => i !== index);
    setCourses(updatedCourses);
  };

  const calculateGpa = () => {
    let totalCredits = 0;
    let weightedSum = 0;

    courses.forEach((course) => {
      const gradeValue = gradesMapping[course.grade];
      if (gradeValue !== undefined) {
        totalCredits += course.credit;
        weightedSum += course.credit * gradeValue;
      }
    });

    const semesterGpaResult = totalCredits > 0 ? (weightedSum / totalCredits).toFixed(2) : 0;
    setSemesterGpa(semesterGpaResult);

    if (previousGpa && previousCredits) {
      const totalPreviousWeighted = previousGpa * parseFloat(previousCredits);
      const totalNewCredits = totalCredits + parseFloat(previousCredits);
      const cumulativeGpaResult =
        totalNewCredits > 0
          ? ((weightedSum + totalPreviousWeighted) / totalNewCredits).toFixed(2)
          : 0;

      setCumulativeGpa(cumulativeGpaResult);
    } else {
      setCumulativeGpa(semesterGpaResult);
    }
  };

  return (
    <div className="w-full bg-[#88BBCE] py-24 px-6 sm:px-12 lg:px-20">
      {/* Title */}
      <h2 className="text-center bg-[#2B6A9C] text-white text-lg sm:text-2xl lg:text-3xl font-bold py-3 rounded-lg">
        حاسبة المعدل التراكمي
      </h2>

      {/* Previous GPA Inputs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6 bg-[#E9EDF1] p-4 rounded-lg">
        <div>
          <label className="block text-[#0B0B43] font-semibold mb-2">المعدل التراكمي السابق</label>
          <input
            type="number"
            value={previousGpa}
            onChange={(e) => setPreviousGpa(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#115587]"
            placeholder="أدخل المعدل السابق"
          />
        </div>
        <div>
          <label className="block text-[#0B0B43] font-semibold mb-2">عدد الساعات السابقة</label>
          <input
            type="number"
            value={previousCredits}
            onChange={(e) => setPreviousCredits(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#115587]"
            placeholder="أدخل عدد الساعات السابقة"
          />
        </div>
      </div>

      {/* Courses List */}
      <div className="mt-8 space-y-6">
        {courses.map((course, index) => (
          <div key={index} className="bg-[#E9EDF1] p-4 rounded-lg shadow-md space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-center">
              {/* Course Name */}
              <div>
                <label className="block text-[#0B0B43] font-semibold mb-2">اسم المادة</label>
                <input
                  type="text"
                  value={course.name}
                  onChange={(e) => handleCourseChange(index, 'name', e.target.value)}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#115587]"
                  placeholder="أدخل اسم المادة"
                />
              </div>

              {/* Course Credit */}
              <div>
                <label className="block text-[#0B0B43] font-semibold mb-2">عدد الساعات</label>
                <input
                  type="number"
                  value={course.credit}
                  onChange={(e) => handleCourseChange(index, 'credit', e.target.value)}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#115587]"
                  placeholder="أدخل عدد الساعات"
                />
              </div>

              {/* Course Grade */}
              <div>
                <label className="block text-[#0B0B43] font-semibold mb-2">الدرجة</label>
                <select
                  value={course.grade}
                  onChange={(e) => handleCourseChange(index, 'grade', e.target.value)}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#115587]"
                >
                  <option value="">اختر الدرجة</option>
                  {Object.keys(gradesMapping).map((grade) => (
                    <option key={grade} value={grade}>
                      {grade}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Remove Button */}
            {courses.length > 1 && (
              <button
                onClick={() => removeCourse(index)}
                className="text-sm text-red-500 hover:underline"
              >
                إزالة المادة
              </button>
            )}
          </div>
        ))}
      </div>

      {/* Buttons */}
      <div className="flex justify-between mt-8">
        <button
          onClick={addCourse}
          className="bg-[#2B6A9C] text-white px-6 py-2 rounded-lg text-sm sm:text-base font-semibold hover:bg-[#115587] transition duration-200"
        >
          إضافة مادة
        </button>
        <button
          onClick={calculateGpa}
          className="bg-[#0B0B43] text-white px-6 py-2 rounded-lg text-sm sm:text-base font-semibold hover:bg-[#0A092E] transition duration-200"
        >
          احسب المعدل
        </button>
      </div>

      {/* GPA Results */}
      {semesterGpa !== null && (
        <div className="mt-8 space-y-4">
          <div className="bg-[#2B6A9C] text-white text-center py-4 rounded-lg shadow-md">
            <p className="text-lg sm:text-xl lg:text-2xl font-bold">المعدل التراكمي الفصلي:</p>
            <p className="text-2xl sm:text-3xl lg:text-4xl font-bold mt-2">{semesterGpa}</p>
          </div>
          <div className="bg-[#0B0B43] text-white text-center py-4 rounded-lg shadow-md">
            <p className="text-lg sm:text-xl lg:text-2xl font-bold">المعدل التراكمي الكلي:</p>
            <p className="text-2xl sm:text-3xl lg:text-4xl font-bold mt-2">{cumulativeGpa}</p>
          </div>
        </div>
      )}
    </div>
  );
}

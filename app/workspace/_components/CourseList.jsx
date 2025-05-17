"use client";
import React, { useState } from "react";

const CourseList = () => {
  const [courseList, setCourseList] = useState([]);

  return (
    <div className="mt-6"   >
      <h2 className="text-3xl font-bold text-indigo-700 mb-6">📚 Course List</h2>

      <div className="flex justify-center">
        <div className="bg-gradient-to-br from-white to-indigo-100 p-8 rounded-2xl shadow-xl text-center max-w-md w-full">
          {courseList.length === 0 ? (
            <div className="">
              <img
                src="https://cdn-icons-png.flaticon.com/512/4076/4076549.png"
                alt="No courses"
                className="w-24 h-24 mx-auto mb-6 opacity-90"
              />
              <p className="text-indigo-600 text-lg font-medium">
                Looks like you haven't <br/>
                created any courses yet!
              </p>
            </div>
          ) : (
            <div className="text-green-600 font-medium text-lg">
              List of all Courses ✅
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CourseList;

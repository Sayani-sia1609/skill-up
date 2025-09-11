import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";

// Example student data
const students = [
  {
    id: 1,
    name: "Aarav Singh",
    skills: ["React", "Node.js", "UI/UX"],
    match: 92,
    summary: "Frontend developer with a passion for clean design and user experience. Built multiple web apps for college clubs.",
  },
  {
    id: 2,
    name: "Priya Patel",
    skills: ["Python", "Data Analysis", "Machine Learning"],
    match: 88,
    summary: "Data enthusiast with hands-on experience in ML projects and Kaggle competitions. Strong analytical skills.",
  },
  {
    id: 3,
    name: "Rohan Mehta",
    skills: ["Java", "Spring Boot", "APIs"],
    match: 85,
    summary: "Backend developer skilled in building scalable REST APIs and microservices. Internship at fintech startup.",
  },
];

export const EmployerSwipeDeck = () => {
  const [index, setIndex] = useState(0);
  const [shortlisted, setShortlisted] = useState<number[]>([]);

  const handleSwipe = (direction: "left" | "right") => {
    if (direction === "right") {
      setShortlisted([...shortlisted, students[index].id]);
    }
    setIndex((prev) => prev + 1);
  };

  const currentStudent = students[index];

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh]">
      <AnimatePresence>
        {currentStudent && (
          <motion.div
            key={currentStudent.id}
            initial={{ x: 0, opacity: 1 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -400, opacity: 0 }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            onDragEnd={(_, info) => {
              if (info.offset.x > 100) handleSwipe("right");
              else if (info.offset.x < -100) handleSwipe("left");
            }}
            className="bg-white rounded-lg shadow-md p-6 w-full max-w-md mb-6 select-none"
          >
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-xl font-semibold text-gray-900">{currentStudent.name}</h2>
              <span className="text-sm bg-blue-100 text-blue-700 px-2 py-1 rounded-full font-medium">{currentStudent.match}% Match</span>
            </div>
            <div className="flex flex-wrap gap-2 mb-4">
              {currentStudent.skills.map((skill) => (
                <span key={skill} className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-xs font-medium">
                  {skill}
                </span>
              ))}
            </div>
            <p className="text-gray-600 text-sm mb-4">{currentStudent.summary}</p>
            <Button className="w-full bg-blue-500 text-white rounded-lg mt-2 hover:bg-blue-600 transition">View Full Profile</Button>
          </motion.div>
        )}
      </AnimatePresence>
      {!currentStudent && (
        <div className="text-center mt-10">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">No more students to review.</h3>
          <p className="text-gray-500">You have shortlisted {shortlisted.length} students.</p>
        </div>
      )}
    </div>
  );
};

export default EmployerSwipeDeck;

import { useState } from "react";

const educationLevels = [
  "10th",
  "12th",
  "Diploma",
  "ITI",
  "Graduation"
];

const predefinedAvatars = [
  "/avatars/avatar1.png",
  "/avatars/avatar2.png",
  "/avatars/avatar3.png",
  "/avatars/avatar4.png"
];

export default function StudentInfoForm({ onSubmit }) {
  const [form, setForm] = useState({
    educationLevel: "",
    grade: "",
    institute: "",
    skills: "",
    bio: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto p-6 bg-white dark:bg-indigo-950 rounded-xl shadow border border-gray-200 dark:border-indigo-800">
      <div>
        <label className="block font-medium mb-1 text-black dark:text-indigo-100">Education Level</label>
        <select name="educationLevel" value={form.educationLevel} onChange={handleChange} required className="w-full p-2 border rounded bg-white dark:bg-indigo-900 text-black dark:text-indigo-100">
          <option value="">Select</option>
          {educationLevels.map(level => (
            <option key={level} value={level}>{level}</option>
          ))}
        </select>
      </div>
      <div>
        <label className="block font-medium mb-1 text-black dark:text-indigo-100">Grade</label>
        <input name="grade" value={form.grade} onChange={handleChange} required className="w-full p-2 border rounded bg-white dark:bg-indigo-900 text-black dark:text-indigo-100" />
      </div>
      <div>
        <label className="block font-medium mb-1 text-black dark:text-indigo-100">Institute Name</label>
        <input name="institute" value={form.institute} onChange={handleChange} required className="w-full p-2 border rounded bg-white dark:bg-indigo-900 text-black dark:text-indigo-100" />
      </div>
      <div>
        <label className="block font-medium mb-1 text-black dark:text-indigo-100">Skills Known</label>
        <input name="skills" value={form.skills} onChange={handleChange} required className="w-full p-2 border rounded bg-white dark:bg-indigo-900 text-black dark:text-indigo-100" placeholder="Comma separated" />
      </div>
      <div>
        <label className="block font-medium mb-1 text-black dark:text-indigo-100">Short Bio (optional)</label>
        <textarea name="bio" value={form.bio} onChange={handleChange} className="w-full p-2 border rounded bg-white dark:bg-indigo-900 text-black dark:text-indigo-100" />
      </div>
      {/* Avatar selection removed */}
      <button type="submit" className="w-full bg-blue-600 dark:bg-indigo-700 text-white py-2 rounded hover:bg-blue-700 dark:hover:bg-indigo-800 transition-colors">Save Information</button>
    </form>
  );
}

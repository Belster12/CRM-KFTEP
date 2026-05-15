"use client";
import { students } from "@/lib/data/students";
import { useState } from "react";



export default function StudentPage() {

  const [search, setSearch] = useState("");

  const searchLower = search.toLowerCase();

  const filteredStudents = students.filter((student) =>
    student.name.toLowerCase().includes(searchLower) ||
    student.email.toLowerCase().includes(searchLower) ||
    student.course.toLowerCase().includes(searchLower)
  );

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">
        Students
      </h1>
      <input type="text"
        placeholder="Search students..."
        className="border rounded-lg p-2"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="border rounded-lg overflow-hidden">
        <table className="w-full">
          <thead className="bg-zinc-100 dark:bg-zinc-900">
            <tr>
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Email</th>
              <th className="p-3 text-left">Course</th>
              <th className="p-3 text-left">Status</th>
            </tr>
          </thead>

          <tbody>
            {filteredStudents.map((student) => (
              <tr
                key={student.id}
                className="border-t"
              >
                <td className="p-3">{student.name}</td>
                <td className="p-3">{student.email}</td>
                <td className="p-3">{student.course}</td>
                <td className="p-3">{student.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}   
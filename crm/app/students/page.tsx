"use client";
import { students } from "@/lib/data/students";
import { useState } from "react";



export default function StudentPage() {

  const [sortOrder, setSortOrder] = useState('asc');

  const [search, setSearch] = useState("");

  const searchLower = search.toLowerCase();

  const filteredStudents = students.filter((student) =>
    student.name.toLowerCase().includes(searchLower) ||
    student.email.toLowerCase().includes(searchLower) ||
    student.course.toLowerCase().includes(searchLower)
  );

  const sortedStudents = [...filteredStudents].sort((a, b) => {
    if (sortOrder === 'asc') {
      return a.name.localeCompare(b.name);
    }

    return b.name.localeCompare(a.name);
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
        return "bg-green-500/20 text-green-500";

      case "Pending":
        return "bg-yellow-500/20 text-yellow-500";

      case "Inactive":
        return "bg-red-500/20 text-red-500";

      default:
        return "bg-zinc-500/20 text-zinc-500";
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">
        Students
      </h1>
      <div className="flex items-center gap-4">
        <input type="text"
          placeholder="Search students..."
          className="border rounded-lg p-2"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <button
          onClick={() =>
            setSortOrder(sortOrder === "asc" ? "desc" : "asc")
          }
          className="border rounded-lg px-4 py-2"
        >
          Sort: {sortOrder === "asc" ? "A-Z" : "Z-A"}
        </button>
      </div>    
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
            {sortedStudents.map((student) => (
              <tr
                key={student.id}
                className="border-t"
              >
                <td className="p-3">{student.name}</td>
                <td className="p-3">{student.email}</td>
                <td className="p-3">{student.course}</td>
                <td className="p-3">
                  <span
                    className={`px-2 py-1 rounded-full text-sm font-medium ${getStatusColor(
                      student.status
                    )}`}
                  >
                    {student.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}   
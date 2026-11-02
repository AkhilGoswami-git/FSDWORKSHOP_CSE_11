import { useEffect, useMemo, useState } from "react";

import StudentForm from "./components/StudentForm";
import StudentList from "./components/StudentList";
import SearchStudent from "./components/SearchStudent";

import "./App.css";

const API_URL = "http://localhost:5000/api/students";

const App = () => {
  const [students, setStudents] = useState([]);
  const [editingStudent, setEditingStudent] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  const fetchStudents = async () => {
    try {
      const response = await fetch(API_URL);

      if (!response.ok) {
        throw new Error("Failed to fetch students");
      }

      const data = await response.json();

      setStudents(data);
    } catch (error) {
      showMessage("Unable to fetch students", "error");
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const showMessage = (text, type) => {
    setMessage(text);
    setMessageType(type);

    setTimeout(() => {
      setMessage("");
      setMessageType("");
    }, 3000);
  };

  const handleStudentSubmit = async (student) => {
    try {
      const isEditing = Boolean(editingStudent);

      const url = isEditing
        ? `${API_URL}/${editingStudent.id}`
        : API_URL;

      const response = await fetch(url, {
        method: isEditing ? "PUT" : "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify(student),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.errors?.join(" ") ||
            data.message ||
            "Request failed"
        );
      }

      showMessage(data.message, "success");

      setEditingStudent(null);

      fetchStudents();
    } catch (error) {
      showMessage(error.message, "error");
    }
  };

  const handleEdit = (student) => {
    setEditingStudent(student);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleDelete = async (id) => {
    const student = students.find(
      (student) => student.id === id
    );

    const confirmed = window.confirm(
      `Are you sure you want to delete ${student?.name}?`
    );

    if (!confirmed) {
      return;
    }

    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to delete student"
        );
      }

      showMessage(data.message, "success");

      fetchStudents();
    } catch (error) {
      showMessage(error.message, "error");
    }
  };

  const filteredStudents = useMemo(() => {
    const search = searchTerm.trim().toLowerCase();

    if (!search) {
      return students;
    }

    return students.filter((student) => {
      const idMatch = String(student.id).includes(search);

      const nameMatch = student.name
        .toLowerCase()
        .includes(search);

      return idMatch || nameMatch;
    });
  }, [students, searchTerm]);

  return (
    <div className="app-shell">

      <header className="topbar">
        <div>
          <p className="eyebrow">
            FULL STACK DEVELOPMENT WORKSHOP
          </p>

          <h1>Student Management System</h1>

          <p className="subtitle">
            Manage student records using React and Node.js
          </p>
        </div>

        <div className="header-badge">
          <span className="status-dot"></span>
          Student Portal
        </div>
      </header>


      <main className="container">

        {message && (
          <div className={`notification ${messageType}`}>
            <span>
              {messageType === "success" ? "✓" : "!"}
            </span>

            {message}
          </div>
        )}


        <section className="dashboard-grid">

          <div className="panel form-panel">
            <StudentForm
              editingStudent={editingStudent}
              onSubmit={handleStudentSubmit}
              onCancel={() => setEditingStudent(null)}
            />
          </div>


          <div className="panel list-panel">

            <div className="panel-heading">

              <div>
                <p className="section-label">
                  STUDENT DIRECTORY
                </p>

                <h2>All Students</h2>
              </div>

              <div className="count-pill">
                {students.length} Records
              </div>

            </div>


            <SearchStudent
              searchTerm={searchTerm}
              onSearch={setSearchTerm}
            />


            <StudentList
              students={filteredStudents}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />

          </div>

        </section>

      </main>


      <footer>

        <span>
          Student Management System
        </span>

        <span>
          React + Node.js + Express
        </span>

      </footer>

    </div>
  );
};

export default App;
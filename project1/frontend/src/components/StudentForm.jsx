import { useEffect, useState } from "react";
import '../App.css';
const initialForm = {
  id: "",
  name: "",
  email: "",
  branch: "",
  semester: "",
  mobile: "",
};

const StudentForm = ({ editingStudent, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState(initialForm);

  useEffect(() => {
    if (editingStudent) {
      setFormData(editingStudent);
    } else {
      setFormData(initialForm);
    }
  }, [editingStudent]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    onSubmit({
      ...formData,
      id: Number(formData.id),
      semester: Number(formData.semester),
    });

    if (!editingStudent) {
      setFormData(initialForm);
    }
  };

  return (
    <div className="student-form-container">
      <div className="form-header">
        <div>
          <p className="section-label">
            {editingStudent ? "EDIT RECORD" : "NEW RECORD"}
          </p>

          <h2>
            {editingStudent ? "Update Student" : "Add Student"}
          </h2>
        </div>

        {editingStudent && (
          <button
            type="button"
            className="cancel-button"
            onClick={onCancel}
          >
            Cancel
          </button>
        )}
      </div>

      <form onSubmit={handleSubmit} className="student-form">
        <div className="form-group">
          <label htmlFor="id">Student ID</label>

          <input
            id="id"
            name="id"
            type="number"
            placeholder="Enter student ID"
            value={formData.id}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="name">Name</label>

          <input
            id="name"
            name="name"
            type="text"
            placeholder="Enter student name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email</label>

          <input
            id="email"
            name="email"
            type="email"
            placeholder="student@example.com"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="branch">Branch</label>

            <select
              id="branch"
              name="branch"
              value={formData.branch}
              onChange={handleChange}
              required
            >
              <option value="">Select branch</option>
              <option value="CSE">CSE</option>
              <option value="CS">CS</option>
              <option value="IT">IT</option>
              <option value="ECE">ECE</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="semester">Semester</label>

            <select
              id="semester"
              name="semester"
              value={formData.semester}
              onChange={handleChange}
              required
            >
              <option value="">Select</option>

              {Array.from({ length: 8 }, (_, index) => (
                <option key={index + 1} value={index + 1}>
                  {index + 1}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="mobile">Mobile Number</label>

          <input
            id="mobile"
            name="mobile"
            type="tel"
            placeholder="10-digit mobile number"
            maxLength="10"
            value={formData.mobile}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" className="primary-button">
          {editingStudent ? "Update Student" : "Add Student"}
        </button>
      </form>
    </div>
  );
};

export default StudentForm;
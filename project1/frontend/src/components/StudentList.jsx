import '../App.css';
const StudentList = ({
  students,
  onEdit,
  onDelete,
}) => {
  if (students.length === 0) {
    return (
      <div className="empty-state">
        <div className="empty-icon">⌕</div>

        <h3>No students available</h3>

        <p>
          Add a student using the form to see records here.
        </p>
      </div>
    );
  }

  return (
    <div className="table-container">
      <table className="student-table">
        <thead>
          <tr>
            <th>Student ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Branch</th>
            <th>Semester</th>
            <th>Mobile</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {students.map((student) => (
            <tr key={student.id}>
              <td className="student-id">
                #{student.id}
              </td>

              <td className="student-name">
                {student.name}
              </td>

              <td>{student.email}</td>

              <td>
                <span className="branch-badge">
                  {student.branch}
                </span>
              </td>

              <td>
                {student.semester}
              </td>

              <td>
                {student.mobile}
              </td>

              <td>
                <div className="action-buttons">
                  <button
                    type="button"
                    className="edit-button"
                    onClick={() => onEdit(student)}
                  >
                    Edit
                  </button>

                  <button
                    type="button"
                    className="delete-button"
                    onClick={() => onDelete(student.id)}
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StudentList;
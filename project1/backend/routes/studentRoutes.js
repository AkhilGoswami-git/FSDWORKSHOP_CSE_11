const express = require("express");

const router = express.Router();


// In-memory student data
let students = [
  {
    id: 101,
    name: "Rahul Sharma",
    email: "rahul@gmail.com",
    branch: "CSE",
    semester: 3,
    mobile: "9876543210",
  },
];


// Allowed branches
const allowedBranches = ["CSE", "CS", "IT", "ECE"];


// Validate student data
const validateStudent = (student, currentId = null) => {
  const errors = [];


  // Student ID
  if (
    student.id === undefined ||
    student.id === null ||
    student.id === ""
  ) {
    errors.push("Student ID is required.");
  } else if (
    !Number.isInteger(Number(student.id)) ||
    Number(student.id) <= 0
  ) {
    errors.push("Student ID must be a valid positive number.");
  } else {
    const duplicate = students.some(
      (item) =>
        item.id === Number(student.id) &&
        item.id !== Number(currentId)
    );

    if (duplicate) {
      errors.push("Student ID must be unique.");
    }
  }


  // Name
  if (!student.name || !student.name.trim()) {
    errors.push("Name is required.");
  }


  // Email
  if (!student.email || !student.email.trim()) {
    errors.push("Email is required.");
  } else if (
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
      student.email
    )
  ) {
    errors.push("Invalid email format.");
  }


  // Branch
  if (!allowedBranches.includes(student.branch)) {
    errors.push("Branch must be CSE, CS, IT or ECE.");
  }


  // Semester
  if (
    student.semester === undefined ||
    student.semester === null ||
    student.semester === ""
  ) {
    errors.push("Semester is required.");
  } else if (
    !Number.isInteger(Number(student.semester)) ||
    Number(student.semester) < 1 ||
    Number(student.semester) > 8
  ) {
    errors.push("Semester must be between 1 and 8.");
  }


  // Mobile
  if (!/^\d{10}$/.test(String(student.mobile || ""))) {
    errors.push(
      "Mobile number must contain exactly 10 digits."
    );
  }


  return errors;
};


// GET /api/students
// Get all students
router.get("/", (req, res) => {
  res.json(students);
});


// GET /api/students/:id
// Get student by ID
router.get("/:id", (req, res) => {
  const id = Number(req.params.id);

  const student = students.find(
    (student) => student.id === id
  );

  if (!student) {
    return res.status(404).json({
      message: "Student not found.",
    });
  }

  res.json(student);
});


// POST /api/students
// Add a student
router.post("/", (req, res) => {
  const errors = validateStudent(req.body);

  if (errors.length > 0) {
    return res.status(400).json({
      message: "Validation failed.",
      errors,
    });
  }

  const student = {
    id: Number(req.body.id),
    name: req.body.name.trim(),
    email: req.body.email.trim(),
    branch: req.body.branch,
    semester: Number(req.body.semester),
    mobile: String(req.body.mobile),
  };

  students.push(student);

  res.status(201).json({
    message: "Student added successfully.",
    student,
  });
});


// PUT /api/students/:id
// Update a student
router.put("/:id", (req, res) => {
  const currentId = Number(req.params.id);

  const index = students.findIndex(
    (student) => student.id === currentId
  );

  if (index === -1) {
    return res.status(404).json({
      message: "Student not found.",
    });
  }

  const errors = validateStudent(
    req.body,
    currentId
  );

  if (errors.length > 0) {
    return res.status(400).json({
      message: "Validation failed.",
      errors,
    });
  }

  const updatedStudent = {
    id: Number(req.body.id),
    name: req.body.name.trim(),
    email: req.body.email.trim(),
    branch: req.body.branch,
    semester: Number(req.body.semester),
    mobile: String(req.body.mobile),
  };

  students[index] = updatedStudent;

  res.json({
    message: "Student updated successfully.",
    student: updatedStudent,
  });
});


// DELETE /api/students/:id
// Delete a student
router.delete("/:id", (req, res) => {
  const id = Number(req.params.id);

  const index = students.findIndex(
    (student) => student.id === id
  );

  if (index === -1) {
    return res.status(404).json({
      message: "Student not found.",
    });
  }

  const deletedStudent = students.splice(index, 1)[0];

  res.json({
    message: "Student deleted successfully.",
    student: deletedStudent,
  });
});


module.exports = router;
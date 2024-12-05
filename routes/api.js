import express from "express";
import { pool } from "../DB/index.js";

const router = express.Router();

// Course
router.post("/course", async (req, res) => {
  const { id, level, name, name_vn, credit_theory, credit_lab, description } = req.body;
  try {
    const QUERY =
      "INSERT INTO course (id, course_level_id, name, name_vn, credit_theory, credit_lab, description) VALUES (?, ?, ?, ?, ?, ?, ?)";
    await pool.query(QUERY, [id, level, name, name_vn, credit_theory, credit_lab, description]);
    res.status(201).json({ message: "Course created successfully", id });
  } catch (error) {
    console.error("Error creating course:", error);
    res.status(500).send("Error creating course");
  }
});

router.delete("/course/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const QUERY = "DELETE FROM course WHERE id = ?";
    await pool.query(QUERY, [id]);
    res.status(200).json({ message: "Course deleted successfully", id });
  } catch (error) {
    console.error("Error deleting course:", error);
    res.status(500).send("Error deleting course");
  }
});

// Program
router.post("/program", async (req, res) => {
  const { name, duration, version, major_id, program_type_id, valid_from } = req.body;
  try {
    const QUERY =
      "INSERT INTO program (name, duration, version, major_id, program_type_id, valid_from) VALUES (?, ?, ?, ?, ?, ?)";
    const [result] = await pool.query(QUERY, [
      name,
      duration,
      version,
      major_id,
      program_type_id,
      valid_from,
    ]);
    res.status(201).json({ message: "Program created successfully", id: result.insertId });
  } catch (error) {
    console.error("Error creating program:", error);
    res.status(500).send("Error creating program");
  }
});

router.delete("/program/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const QUERY = "DELETE FROM program WHERE id = ?";
    await pool.query(QUERY, [id]);
    res.status(200).json({ message: "Program deleted successfully", id });
  } catch (error) {
    console.error("Error deleting program:", error);
    res.status(500).send("Error deleting program");
  }
});

// Course Program
router.post("/course_program", async (req, res) => {
  const { courseID, programID, course_code, course_type_id } = req.body;
  try {
    const QUERY =
      "INSERT INTO course_program (course_id, program_id, course_code, course_type_id) VALUES (?, ?, ?, ?)";
    await pool.query(QUERY, [courseID, programID, course_code, course_type_id]);
    res.status(201).json({ message: "Course Program created successfully", courseID, programID });
  } catch (error) {
    console.error("Error creating course program:", error);
    res.status(500).send("Error creating course program");
  }
});

router.delete("/course_program/:course_id/:program_id", async (req, res) => {
  const { course_id, program_id } = req.params;
  try {
    const QUERY = "DELETE FROM course_program WHERE course_id = ? AND program_id = ?";
    await pool.query(QUERY, [course_id, program_id]);
    res.status(200).json({ message: "Course Program deleted successfully", course_id, program_id });
  } catch (error) {
    console.error("Error deleting course program:", error);
    res.status(500).send("Error deleting course program");
  }
});

export default router;

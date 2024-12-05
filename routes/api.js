import express from "express";
import { pool } from "../DB/index.js";

const router = express.Router();

// Course
router.post("/course", async (req, res) => {
  const { id, course_level_id, name, name_vn, credit_theory, credit_lab, description } = req.body;
  try {
    const QUERY =
      "INSERT INTO course (id, course_level_id, name, name_vn, credit_theory, credit_lab, description) VALUES (?, ?, ?, ?, ?, ?, ?)";
    await pool.query(QUERY, [
      id,
      course_level_id,
      name,
      name_vn,
      credit_theory,
      credit_lab,
      description,
    ]);
    res.status(201).json({ message: "Course created successfully", id });
  } catch (error) {
    console.error("Error creating course:", error);
    res.status(500).send("Error creating course");
  }
});

router.get("/courses", async (req, res) => {
  try {
    const QUERY = "SELECT * FROM course";
    const [rows] = await pool.query(QUERY);
    res.status(200).json(rows);
  } catch (error) {
    res.status(500).send("Error fetching courses");
  }
});

router.get("/course/:name", async (req, res) => {
  const { name } = req.params;
  try {
    const QUERY = "SELECT * FROM course WHERE name = ?";
    const [rows] = await pool.query(QUERY, [name]);
    if (rows.length === 0) {
      res.status(404).send("Course not found");
    } else {
      res.status(200).json(rows[0]);
    }
  } catch (error) {
    res.status(500).send("Error fetching course");
  }
});

router.put("/course/:id", async (req, res) => {
  const { id } = req.params;
  const { course_level_id, name, name_vn, credit_theory, credit_lab, description } = req.body;
  try {
    const QUERY =
      "UPDATE course SET course_level_id = ?, name = ?, name_vn = ?, credit_theory = ?, credit_lab = ?, description = ? WHERE id = ?";
    await pool.query(QUERY, [
      course_level_id,
      name,
      name_vn,
      credit_theory,
      credit_lab,
      description,
      id,
    ]);
    res.status(200).send("Course updated successfully");
  } catch (error) {
    res.status(500).send("Error updating course");
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

router.get("/programs", async (req, res) => {
  try {
    const QUERY = "SELECT * FROM program";
    const [rows] = await pool.query(QUERY);
    res.status(200).json(rows);
  } catch (error) {
    res.status(500).send("Error fetching programs");
  }
});

router.get("/program/:name", async (req, res) => {
  const { name } = req.params;
  try {
    const QUERY = "SELECT * FROM program WHERE name = ?";
    const [rows] = await pool.query(QUERY, [name]);
    if (rows.length === 0) {
      res.status(404).send("Program not found");
    } else {
      res.status(200).json(rows[0]);
    }
  } catch (error) {
    res.status(500).send("Error fetching program");
  }
});

router.put("/program/:id", async (req, res) => {
  const { id } = req.params;
  const { name, duration, version, major_id, program_type_id, valid_from } = req.body;
  try {
    const QUERY =
      "UPDATE program SET name = ?, duration = ?, version = ?, major_id = ?, program_type_id = ?, valid_from = ? WHERE id = ?";
    await pool.query(QUERY, [name, duration, version, major_id, program_type_id, valid_from, id]);
    res.status(200).send("Program updated successfully");
  } catch (error) {
    res.status(500).send("Error updating program");
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

router.get("/course_programs", async (req, res) => {
  try {
    const QUERY = "SELECT * FROM course_program";
    const [rows] = await pool.query(QUERY);
    res.status(200).json(rows);
  } catch (error) {
    res.status(500).send("Error fetching course programs");
  }
});

router.put("/course_program/:course_id/:program_id", async (req, res) => {
  const { course_id, program_id } = req.params;
  const { course_code, course_type_id } = req.body;
  try {
    const QUERY =
      "UPDATE course_program SET course_code = ?, course_type_id = ? WHERE course_id = ? AND program_id = ?";
    await pool.query(QUERY, [course_code, course_type_id, course_id, program_id]);
    res.status(200).send("Course Program updated successfully");
  } catch (error) {
    res.status(500).send("Error updating course program");
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

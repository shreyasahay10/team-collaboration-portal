const express = require("express");
const pool = require("./db");

const router = express.Router();

router.get("/api/status", (req, res) => {
    res.json({
        status: "ok",
        service: "backend",
    });
});

// Get all tasks
router.get("/api/tasks", async (req, res) => {
    try {
        const result = await pool.query(
            "SELECT * FROM tasks ORDER BY created_at DESC"
        );

        res.json(result.rows);
    } catch (error) {
        console.error(error);

        res.status(500).json({
            status: "error",
            message: "Failed to fetch tasks",
        });
    }
});

// Create a new task
router.post("/api/tasks", async (req, res) => {
    try {
        const { title } = req.body;

        if (!title) {
            return res.status(400).json({
                status: "error",
                message: "Task title is required",
            });
        }

        const result = await pool.query(
            "INSERT INTO tasks (title) VALUES ($1) RETURNING *",
            [title]
        );

        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error(error);

        res.status(500).json({
            status: "error",
            message: "Failed to create task",
        });
    }
});

module.exports = router;
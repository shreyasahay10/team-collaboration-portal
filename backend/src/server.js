require("dotenv").config();

const express = require("express");
const pool = require("./db");
const routes = require("./routes");

const app = express();

app.use(express.json());
app.use(routes);

app.get("/health", async (req, res) => {
    try {
        await pool.query("SELECT 1");

        res.json({
            status: "ok",
            database: "connected",
        });
    } catch (error) {
        console.error(error);

        res.status(500).json({
            status: "error",
            database: "disconnected",
        });
    }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Backend server running on port ${PORT}`);
});
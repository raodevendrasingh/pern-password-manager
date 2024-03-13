import express, { query } from "express";
import dotenv from "dotenv";
import pg from "pg";
const { Pool } = pg;
import cors from 'cors';


const app = express();
app.use(express.json());
app.use(cors())


dotenv.config();
const PORT = process.env.PORT;

const pool = new Pool({
	host: "localhost",
	user: "postgres",
	port: 5432,
	password: "tiger",
	database: "mern_vault",
});

pool.query("SELECT NOW()", (err, res) => {
	if (err) {
		console.error("Error connecting to PostgreSQL", err.stack);
	} else {
		console.log("Connected to PostgreSQL:", res.rows[0]);
	}
});

// app.get("/api/data", async (req, res) => {
// 	try {
// 		const result = await pool.query("SELECT * from passwords");
// 		res.json(result.rows);
// 	} catch (err) {
// 		console.error("Error executing query", err.message);
// 		res.status(500).json({ error: "Internal server error" });
// 	}
// });

app.post("/add-password", async (req, res) => {
	const { password, title } = req.body;
    try {
        const result = await pool.query(`INSERT INTO public.passwords (password, website) VALUES ('${password}', '${title}');`)
        // res.json(result.rows);
        console.log('VALUES INSERTED');
    } catch (error) {
        console.error("Error executing query", error.message);
		res.status(500).json({ error: "Internal server error" });
    }
});     

app.get("/", (req, res) => {
	res.send("hello dev");
});

app.listen(PORT, (req, res) => {
	console.log(`Server running at localhost:${PORT}`);
});

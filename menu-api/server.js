import express from "express";
import cors from "cors";
import menu from "./routers/menu.js"

const PORT = process.env.PORT || 3000;
const CORS_ORIGIN = process.env.CORS_ORIGIN || "http://localhost:5173";

const app = express();
app.use(express.json());
app.use(cors({ origin: CORS_ORIGIN }));
app.use('/api/menu', menu)


app.listen(PORT, () => console.log(`Fut: http://localhost:${PORT}`));

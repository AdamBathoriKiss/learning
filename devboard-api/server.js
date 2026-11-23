import express from "express";
import cors from "cors";
import ticketRouter from './routes/ticket.js'

const PORT = process.env.PORT;
const CORS_ORIGIN = process.env.CORS_ORIGIN;

const app = express();
app.use(express.json());
app.use(cors({origin:CORS_ORIGIN}));
app.use('/api/tickets', ticketRouter)


app.listen(PORT, () => console.log(`A szerver az alábbi porton fut: ${PORT}`));

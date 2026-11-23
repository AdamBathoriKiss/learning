import express from "express";
import { TicketService } from "../services/ticket.service.js";
import { ticketList } from "../ticketList.js";
const router = express.Router();


router.get("/", (req, res) => {
	res.json(ticketList);
});

router.post("/create", (req, res) => {
	const newTicket = TicketService.createTicket(req.body);

    res.json(newTicket)
});


export default router;

import express from "express";
import { TicketService } from "../services/ticket.service.js";
import { ticketList } from "../ticketList.js";
const router = express.Router();

router.get("/", (req, res) => {
    res.json(ticketList);
});

router.post("/", (req, res) => {
    try {
        res.status(201).json(TicketService.createTicket(req.body));
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

router.patch("/:id", (req, res) => {
    const id = req.params.id;
    try {
        res.status(201).json(TicketService.editTicket(id, req.body));
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

export default router;

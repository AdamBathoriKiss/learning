import { ticketList } from "../ticketList.js";
const createTicket = (body) => {
    const { title, description, responsible, status, priority, updatedAt, gitHubIssueNumber } = body;

	const checkedTitle = typeof title === "string" && title.trim(" ").length > 0;
	const checkedDesc = typeof description === "string" && description.trim(" ").length > 0;
	const chekedResp = typeof responsible === "string" && responsible.trim(" ").length > 0;

	if (!checkedTitle) {
		return res.status(400).json({ message: "Hiányzó title" });
	}

	if (!checkedDesc) {
		return res.status(400).json({ message: "Hiányzó description" });
	}

	if (!chekedResp) {
		return res.status(400).json({ message: "Hiányzó responsible" });
	}

	const newTicket = {
		id: String(Date.now()),
		title,
		description,
		responsible,
		status,
		priority,
		updatedAt,
		gitHubIssueNumber,
	};

	ticketList.push(newTicket);
    
    return newTicket

}

export const TicketService = {
    createTicket
}
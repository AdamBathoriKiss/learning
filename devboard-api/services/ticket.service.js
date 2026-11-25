import { ticketList } from "../ticketList.js";
const createTicket = (body) => {
    const {
        title,
        description,
        responsible,
        status,
        priority,
        gitHubIssueNumber,
    } = body;

    const checkedTitle =
        typeof title === "string" && title.trim(" ").length > 0;
    const checkedDesc =
        typeof description === "string" && description.trim(" ").length > 0;
    const chekedResp =
        typeof responsible === "string" && responsible.trim(" ").length > 0;

    if (!checkedTitle) {
        throw Error("Hiányzó title");
    }

    if (!checkedDesc) {
        throw Error("Hiányzó description");
    }

    if (!chekedResp) {
        throw Error("Hiányzó responsible");
    }

    const newTicket = {
        id: String(Date.now()),
        title,
        description,
        responsible,
        status,
        priority,
        updatedAt: new Date().toISOString(),
        gitHubIssueNumber,
    };

    ticketList.push(newTicket);

    return newTicket;
};

const editTicket = (id,body) => {
	const index = ticketList.findIndex((item) => item.id === id);

	if(index === -1){
		throw Error("A megadott id-val nem található ticket");
	}

	const modifiedTicketList = Object.assign(ticketList[index],body); 

	return modifiedTicketList
}

export const TicketService = {
    createTicket,
	editTicket
};

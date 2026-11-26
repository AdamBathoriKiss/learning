import { ticketList } from "../ticketList.js";

const allowedKeys = [
    "title",
    "description",
    "responsible",
    "status",
    "priority",
    "gitHubIssueNumber",
];
const statuses = ["todo", "in_progress", "closed"];
const priorities = ["low", "medium", "high"];

const emptyStringChecker = (fieldList) => {
    if (Array.isArray(fieldList)) {
        fieldList.forEach((field) => {
            const checkedField =
                typeof field.value === "string" &&
                field.value.trim(" ").length > 0;

            if (!checkedField) {
                throw Error(`Hiányzó ${field.name}`);
            }
        });
    }
};

const createTicket = (body) => {
    const {
        title,
        description,
        responsible,
        status,
        priority,
        gitHubIssueNumber,
    } = body;

    emptyStringChecker([
        { name: "title", value: title },
        { name: "description", value: description },
        { name: "responsible", value: responsible },
    ]);

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

const editTicket = (id, body) => {
    const index = ticketList.findIndex((item) => item.id === id);
    let modifiedTicket = {};

    if (index === -1) {
        throw Error("A megadott id-val nem található ticket");
    }

    emptyStringChecker([
        { name: "title", value: body.title },
        { name: "description", value: body.description },
        { name: "responsible", value: body.responsible },
    ]);

    for (const [key, value] of Object.entries(body)) {
        const allowedKey = allowedKeys.find((item) => item === key);

        if (allowedKey !== undefined && value !== undefined && value !== "") {
            if (
                allowedKey === "status" &&
                !statuses.find((item) => item === value)
            ) {
                throw Error("Nem megfelelő státusz");
            }
            if (
                allowedKey === "priority" &&
                !priorities.find((item) => item === value)
            ) {
                throw Error("Nem megfelelő prioritás");
            }
            modifiedTicket[key] = value;
            modifiedTicket.updatedAt = new Date().toISOString();
        }
    }

    const modifiedTicketList = Object.assign(ticketList[index], modifiedTicket);
    console.log("Módosított:", modifiedTicket, "Lista:", modifiedTicketList);
    return modifiedTicketList;
};

export const TicketService = {
    createTicket,
    editTicket,
};

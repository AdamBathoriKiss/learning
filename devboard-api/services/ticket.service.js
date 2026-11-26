import { ticketList } from "../ticketList.js";

const emptyStringChecker = (fieldList) => {
    if (Array.isArray(fieldList)) {
        fieldList.forEach((field) => {
            if (field !== null) {
                const checkedField =
                    typeof field.value === "string" &&
                    field.value.trim(" ").length > 0;

                if (!checkedField) {
                    throw Error(`Hiányzó ${field.name}`);
                }
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
        body.description
            ? { name: "description", value: body.description }
            : null,
        { name: "responsible", value: body.responsible },
    ]);

    for (const [key, value] of Object.entries(body)) {
        if (value !== undefined && value !== "") {
            console.log("Value: ", typeof value);
            modifiedTicket[key] = value;
            modifiedTicket.updatedAt = new Date().toISOString();
        }
    }

    const modifiedTicketList = Object.assign(ticketList[index], modifiedTicket);
    return modifiedTicketList;
};

export const TicketService = {
    createTicket,
    editTicket,
};

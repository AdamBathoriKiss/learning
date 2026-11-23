import express from "express";

const app = express();
app.use(express.json());

const menu = [
	{ id: "1", name: "Espresso", price: 650, category: "kávé", available: true },
	{ id: "2", name: "Cappuccino", price: 890, category: "kávé", available: true },
	{ id: "3", name: "Zöld tea", price: 750, category: "tea", available: false },
	{ id: "4", name: "Sajttorta", price: 1290, category: "desszert", available: true },
];

// GET lista (+ ?category= szűrés)
app.get("/api/menu", (req, res) => {
	const { category } = req.query;
	if (category) {
		return res.json(menu.filter((item) => item.category === category));
	}
	res.json(menu);
});

// GET egy elem
app.get("/api/menu/:id", (req, res) => {
	const menuItem = menu.find((item) => item.id === req.params.id);
	if (!menuItem) {
		return res.status(404).json({ error: "Nem található ilyen elem" });
	}
	res.json(menuItem);
});

// POST létrehozás (validációval)
app.post("/api/menu", (req, res) => {
	const { name, category, price } = req.body;

	const nameOk = typeof name === "string" && name.trim() !== "";
	const categoryOk = typeof category === "string" && category.trim() !== "";
	const priceOk = typeof price === "number" && price > 0;

	if (!nameOk || !categoryOk) {
		return res.status(400).json({ error: "Hiányzó név vagy kategória" });
	}
	if (!priceOk) {
		return res.status(400).json({ error: "Nem megfelelő ár" });
	}

	const newItem = {
		id: String(Date.now()),
		name: name.trim(),
		category: category.trim(),
		price,
		available: true,
	};
	menu.push(newItem);
	res.status(201).json(newItem);
});

// PATCH részleges módosítás (csak az érkező mezőket ellenőrzi)
app.patch("/api/menu/:id", (req, res) => {
	const menuItem = menu.find((item) => item.id === req.params.id);
	if (!menuItem) {
		return res.status(404).json({ error: "Nem található ilyen elem" });
	}

	const { name, category, price, available } = req.body;

	if (name !== undefined) {
		if (typeof name !== "string" || name.trim() === "") {
			return res.status(400).json({ error: "Hibás név" });
		}
		menuItem.name = name.trim();
	}
	if (category !== undefined) {
		if (typeof category !== "string" || category.trim() === "") {
			return res.status(400).json({ error: "Hibás kategória" });
		}
		menuItem.category = category.trim();
	}
	if (price !== undefined) {
		if (typeof price !== "number" || price <= 0) {
			return res.status(400).json({ error: "Nem megfelelő ár" });
		}
		menuItem.price = price;
	}
	if (available !== undefined) {
		if (typeof available !== "boolean") {
			return res.status(400).json({ error: "Hibás elérhetőség" });
		}
		menuItem.available = available;
	}

	res.json(menuItem);
});

// DELETE: a mai bemelegítés, ezt írd meg fejből ide!
// (a tesztek 8. és 9. sora addig 404-et ad, mert nincs ilyen route)

app.delete("/api/menu/:id", (req, res) => {
	const index = menu.findIndex((item) => item.id === req.params.id);

    if(index === -1){
        return res.status(404).json({error: 'Nem található elem ezzel az id-val'})
    }
    menu.splice(index,1)
    res.status(204).end()
  
});

app.listen(3000, () => console.log("Fut: http://localhost:3000"));

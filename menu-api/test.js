const BASE = "http://localhost:3000";

async function call(label, path, options = {}) {
    const res = await fetch(BASE + path, {
        headers: { "Content-Type": "application/json" },
        ...options,
    });
    console.log(label, res.status, await res.text());
}

const json = (method, body) => ({ method, body: JSON.stringify(body) });

await call("1 lista (200)", "/api/menu");
await call("2 szűrés (200)", "/api/menu?category=kávé");
await call("3 egy elem (200)", "/api/menu/2");
await call("4 nincs ilyen (404)", "/api/menu/99");
await call("5 létrehozás (201)", "/api/menu", json("POST", { name: "Latte", price: 950, category: "kávé" }));
await call("6 módosítás (200)", "/api/menu/3", json("PATCH", { available: true }));
await call("7 módosítás, nincs ilyen (404)", "/api/menu/99", json("PATCH", { price: 1 }));
await call("8 törlés (204)", "/api/menu/4", { method: "DELETE" });
await call("9 törlés, nincs ilyen (404)", "/api/menu/99", { method: "DELETE" });
await call("10 lista a végén (200)", "/api/menu");
await call("11 hiányzó név (400)", "/api/menu", json("POST", { price: 900, category: "kávé" }));
await call("12 hibás ár (400)", "/api/menu", json("POST", { name: "X", price: "drága", category: "kávé" }));
await call("13 jó adat (201)", "/api/menu", json("POST", { name: "Mocha", price: 990, category: "kávé" }));
await call("14 szóközös név (400)", "/api/menu", json("POST", { name: "   ", price: 900, category: "kávé" }));
await call("15 nulla ár (400)", "/api/menu", json("POST", { name: "Ingyen", price: 0, category: "kávé" }));
await call("16 PATCH hibás ár (400)", "/api/menu/1", json("PATCH", { price: "olcsó" }));

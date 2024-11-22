import express from "express";
import { readFile, writeFile } from "fs/promises";

const dataSource = './data/list.txt';
const router = express.Router();

router.post("/contato", async (req, res) => {
    const { name } = req.body;

    if (!name || name.length < 2) {
        res.json({ error: "Nome precisa ter pelo menos 2 caracteres." });
        return;
    }

    let list: string[] = [];

    try {
        const data = await readFile(dataSource, {encoding:"utf-8"});
        list = data.split("\n");
    } catch (error) {
        
    }

    list.push(name);

    await writeFile(dataSource, list.join("\n"));

    res.status(201).json({ contato: name });
});

export default router;
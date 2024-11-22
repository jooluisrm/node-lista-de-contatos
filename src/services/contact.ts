import { readFile, writeFile } from "fs/promises";

const dataSource = './data/list.txt';

// Função para obter contatos
export const getContacts = async (): Promise<string[]> => {
    let list: string[] = [];

    try {
        const data = await readFile(dataSource, { encoding: "utf-8" });
        list = data.split("\n");
    } catch (error) {
        console.error("Erro ao ler o arquivo:", error);
    }

    return list;
};

// Função para criar um novo contato
export const createContact = async (name: string): Promise<void> => {
    let list: string[] = await getContacts(); // Aguarda a resolução da Promise
    list.push(name);
    await writeFile(dataSource, list.join("\n"));
};

// Função para deletar um contato
export const deleteContact = async (name: string): Promise<void> => {
    let list: string[] = await getContacts(); // Aguarda a resolução da Promise

    list = list.filter(item => item.toLowerCase() !== name.toLowerCase());

    await writeFile(dataSource, list.join("\n"));
};

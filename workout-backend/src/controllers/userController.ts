import { Request, Response } from "express";
import { getItem, putItem, updateItem, deleteItem, scanTable } from "../services/dynamoService";

const TABLE_NAME = "users";

export const getUser = async (req: Request, res: Response) => {
    try {
        const userId = req.params.userId;
        const data = await getItem(TABLE_NAME, { userId });
        res.json(data.Item || {});
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const createUser = async (req: Request, res: Response) => {
    try {
        const user = req.body;
        await putItem(TABLE_NAME, user);
        res.status(201).json({ message: "User created", user });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const updateUser = async (req: Request, res: Response) => {
    try {
        const userId = req.params.userId;
        const { name, age, weight, fitnessGoals } = req.body;
        
        const updatedUser = await updateItem(TABLE_NAME, { userId }, 
            "set name = :n, age = :a, weight = :w, fitnessGoals = :f",
            { ":n": name, ":a": age, ":w": weight, ":f": fitnessGoals }
        );
        
        res.json({ message: "User updated", updatedUser });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const deleteUser = async (req: Request, res: Response) => {
    try {
        const userId = req.params.userId;
        await deleteItem(TABLE_NAME, { userId });
        res.json({ message: "User deleted" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const listUsers = async (_req: Request, res: Response) => {
    try {
        const data = await scanTable(TABLE_NAME);
        res.json(data.Items || []);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

import { Request, Response } from "express";
import { getItem, putItem, updateItem, deleteItem, scanTable } from "../services/dynamoService";

type User = {
    userId: string;
    name: string;
    age: number;
    weight: number;
};

const TABLE_NAME = "users";

export const getUser = async (req: Request, res: Response) => {
    try {
        const userId = req.params.userId;
        const data = await getItem(TABLE_NAME, { userId });
        res.json(data.Item || {});
    } catch (error) {
        res.status(500).json({ error: "Could not get user", details: error });
    }
};

export const createUser = async (req: Request, res: Response) => {
    try {
        const user: User = req.body;
        await putItem(TABLE_NAME, user);
        res.status(201).json({ message: "User created", user });
    } catch (error) {
        res.status(500).json({ error: "Could not create user", details: error });
    }
};

export const updateUser = async (req: Request, res: Response) => {
    try {
        const userId = req.params.userId;
        const updates: User = req.body;
        const updateExpression = "set #name_attr = :name_val, age = :age, weight = :weight";
        const expressionAttributeValues = {
            ":name_val": updates.name,
            ":age": updates.age,
            ":weight": updates.weight,
        };
        
        const updatedUser = await updateItem(TABLE_NAME, { userId }, 
            updateExpression, expressionAttributeValues,
            {"#name_attr": "name" }
        );
        
        res.json({ message: "User updated", updatedUser });
    } catch (error) {
        res.status(500).json({ error: "Could not update user", details: error });
    }
};

export const deleteUser = async (req: Request, res: Response) => {
    try {
        const userId = req.params.userId;
        await deleteItem(TABLE_NAME, { userId });
        res.json({ message: "User deleted" });
    } catch (error) {
        res.status(500).json({ error: "Could not delete user", details: error });
    }
};

export const listUsers = async (_req: Request, res: Response) => {
    try {
        const data = await scanTable(TABLE_NAME);
        res.json(data.Items || []);
    } catch (error) {
        res.status(500).json({ error: "Could list users", details: error });
    }
};

import { Request, Response } from "express";
import { getItem, putItem, updateItem, deleteItem } from "../services/dynamoService";

type Workout = {
    userId: string;
    workoutId: string;
    date: string;
    workoutType: string;
    duration: number;
    intensity: string;
    performanceMetrics?: string;
    notes?: string;
};

const TABLE_NAME = "workouts";

export const createWorkout = async (req: Request, res: Response) => {
    const workout: Workout = req.body;
    try {
        await putItem(TABLE_NAME, workout);
        res.status(201).json({ message: "Workout created successfully", workout });
    } catch (error) {
        res.status(500).json({ error: "Could not create workout", details: error });
    }
};
  
export const getWorkout = async (req: Request, res: Response) => {
    const { userId, workoutId } = req.params;
    try {
        const result = await getItem(TABLE_NAME, { userId, workoutId });
        res.json(result.Item || {});
    } catch (error) {
        res.status(500).json({ error: "Could not fetch workout", details: error });
    }
};

export const getUserWorkouts = async (req: Request, res: Response) => {
    const { userId } = req.params;
    try {
        const result = await getItem(TABLE_NAME, { userId });
        res.json(result.Item || {});
    } catch (error) {
        res.status(500).json({ error: "Could not fetch workouts", details: error });
    }
};
  
export const updateWorkout = async (req: Request, res: Response) => {
    const { userId, workoutId } = req.params;
    const updates: Workout = req.body;
    const updateExpression = "set #date = :date, workoutType = :type, duration = :duration, intensity = :intensity, performanceMetrics = :metrics, notes = :notes";
    const expressionAttributeValues = {
        ":date": updates.date,
        ":type": updates.workoutType,
        ":duration": updates.duration,
        ":intensity": updates.intensity,
        ":metrics": updates.performanceMetrics,
        ":notes": updates.notes,
    };
  
    try {
        const updatedWorkout = await updateItem(
            TABLE_NAME, 
            { userId, workoutId },
            updateExpression, 
            expressionAttributeValues
        );
        res.json({ message: "Workout updated", updatedWorkout });
    } catch (error) {
        res.status(500).json({ error: "Could not update workout", details: error });
    }
};
  
export const deleteWorkout = async (req: Request, res: Response) => {
    const { userId, workoutId } = req.params;
    try {
        await deleteItem(TABLE_NAME, { userId, workoutId });
        res.json({ message: "Workout deleted" });
    } catch (error) {
        res.status(500).json({ error: "Could not delete workout", details: error });
    }
};
import express from "express";
import { getUser, createUser, updateUser, deleteUser, listUsers } from "../controllers/userController";

const router = express.Router();

router.get("/:userId", getUser);
router.post("/", createUser);
router.put("/:userId", updateUser);
router.delete("/:userId", deleteUser);
router.get("/", listUsers);

export default router;

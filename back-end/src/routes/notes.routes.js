import { Router } from "express";
import { getNotes, getNote, createNote, updateNote, deleteNote } from "../controllers/notes.controller.js";

const router = Router();

router.get("/", getNotes);
router.get("/:id", getNote);
router.post("/", createNote);
router.put("/:id", updateNote);
router.delete("/:id", deleteNote);

export default router;

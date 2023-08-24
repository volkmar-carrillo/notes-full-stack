import { Router } from "express";
import { getTags, createTag, deleteTag } from "../controllers/tags.controller.js";

const router = Router();

router.get("/", getTags);
router.post("/", createTag);
router.delete("/:id", deleteTag);

export default router;

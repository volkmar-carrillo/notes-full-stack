import express from "express";
import tagsRoutes from "./routes/tags.routes.js";
import notesRoutes from "./routes/notes.routes.js";

const app = express();
app.use(express.json());

app.use("/api/v1/tags", tagsRoutes);
app.use("/api/v1/notes", notesRoutes);

export default app;

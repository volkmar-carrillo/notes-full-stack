import express from "express";
import tagsRoutes from "./routes/tags.routes.js";
import notesRoutes from "./routes/notes.routes.js";
import cors from "cors";

const app = express();
app.use(express.json());

const whitelist = [
  'http://localhost:5173'
];

const options = {
  origin: (origin, callback) => {
    if (whitelist.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not Access'));
    }
  },
};

app.use(cors(options));
app.use("/api/v1/tags", tagsRoutes);
app.use("/api/v1/notes", notesRoutes);

export default app;

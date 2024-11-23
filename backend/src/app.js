import express from "express";
import cors from "cors";
import torcedorRoutes from "./routes/torcedorRoutes.js";
import timeRoutes from "./routes/timeRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.status(200).send("Informações sobre Times/Torcedores cadastrados.");
});

app.use(torcedorRoutes);
app.use(timeRoutes);

export default app;
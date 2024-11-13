import express from "express";
import jogadoresRoutes from "./routes/jogadoresRoutes.js";
import timeRoutes from "./routes/timeRoutes.js";

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
    res.status(200).send("Informações sobre Times/Jogadores da NFL.");
});

app.use(jogadoresRoutes);
app.use(timeRoutes);

export default app;
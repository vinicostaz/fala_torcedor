import express from "express";
import TimeController from "../controllers/timeController.js";

const routes = express.Router();

routes.get("/times", TimeController.buscarTodos);
routes.get("/times/:id", TimeController.buscarPorIdComJogadores);
routes.post("/times", TimeController.criar);
routes.put("/times/:id", TimeController.atualizar);
routes.delete("/times/:id", TimeController.deletar);

export default routes;
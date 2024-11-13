import express from "express";
import JogadorController from "../controllers/jogadorController.js";

const routes = express.Router();

routes.get("/jogadores", JogadorController.buscarTodos);
routes.get("/jogadores/:id", JogadorController.buscarPorId);
routes.post("/jogadores", JogadorController.criar);
routes.put("/jogadores/:id", JogadorController.atualizar);
routes.delete("/jogadores/:id", JogadorController.deletar);

export default routes;
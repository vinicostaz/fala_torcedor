import express from "express";
import TorcedorController from "../controllers/torcedorController.js";

const routes = express.Router();

routes.get("/torcedores", TorcedorController.buscarTodos);
routes.get("/torcedores/:id", TorcedorController.buscarPorId);
routes.post("/torcedores", TorcedorController.criar);
routes.put("/torcedores/:id", TorcedorController.atualizar);
routes.delete("/torcedores/:id", TorcedorController.deletar);

export default routes;
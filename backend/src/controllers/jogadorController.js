import Jogador from "../models/Jogador.js";

class JogadorController {
    static async buscarTodos(req, res) {
        try {
            const jogadores = await Jogador.buscarTodosComTime();
            res.status(200).json(jogadores);
        } catch (err) {
            res.status(500).json({ error: "Erro ao buscar jogadores." });
        }
    }

    static async buscarPorId(req, res) {
        try {
            const jogador = await Jogador.buscarPorIdComTime(req.params.id);
            if (!jogador) {
                return res.status(404).json({ error: "Jogador não encontrado." });
            }
            res.status(200).json(jogador);
        } catch (err) {
            res.status(500).json({ error: "Erro ao buscar jogador." });
        }
    }

    static async criar(req, res) {
        try {
            const { nome, posicao, time, numero, foto_url } = req.body;
            const novoJogador = { nome, posicao, time, numero, foto_url };
            const jogador = await Jogador.criar(novoJogador);
            res.status(201).json({ message: "Jogador cadastrado com sucesso!", jogador });
        } catch (err) {
            res.status(500).json({ error: "Erro ao cadastrar jogador." });
        }
    }

    static async atualizar(req, res) {
        try {
            const fieldsToUpdate = req.body;
            const jogador = await Jogador.atualizar(req.params.id, fieldsToUpdate);
            if (!jogador) {
                return res.status(404).json({ error: "Jogador não encontrado." });
            }
            res.status(200).json({ message: "Jogador atualizado com sucesso!", jogador });
        } catch (err) {
            res.status(500).json({ error: "Erro ao atualizar jogador." });
        }
    }

    static async deletar(req, res) {
        try {
            const jogador = await Jogador.deletar(req.params.id);
            if (!jogador) {
                return res.status(404).json({ error: "Jogador não encontrado." });
            }
            res.status(200).json({ message: "Jogador removido com sucesso!" });
        } catch (err) {
            res.status(500).json({ error: "Erro ao remover jogador." });
        }
    }
}

export default JogadorController;
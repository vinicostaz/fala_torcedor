import Time from "../models/Time.js";

class TimeController {
    static async buscarTodos(req, res) {
        try {
            const times = await Time.buscarTodos();
            res.status(200).json(times);
        } catch (error) {
            res.status(500).json({ error: "Erro ao buscar times." });
        }
    }

    static async buscarPorIdComJogadores(req, res) {
        try {
            const time = await Time.buscarPorIdComJogadores(req.params.id);
            if (!time) {
                return res.status(404).json({ error: "Time não encontrado." });
            }
            res.status(200).json(time);
        } catch (error) {
            res.status(500).json({ error: "Erro ao buscar time." });
        }
    }

    static async criar(req, res) {
        try {
            const { nome, divisao, titulos_superbowl } = req.body;
            const novoTime = { nome, divisao, titulos_superbowl };
            const time = await Time.criar(novoTime);
            res.status(201).json({ message: "Time criado com sucesso!", time });
        } catch (error) {
            res.status(500).json({ error: "Erro ao criar time." });
        }
    }

    static async atualizar(req, res) {
        try {
            const fieldsToUpdate = req.body;
            const time = await Time.atualizar(req.params.id, fieldsToUpdate);
            if (!time) {
                return res.status(404).json({ error: "Time não encontrado." });
            }
            res.status(200).json({ message: "Time atualizado com sucesso!", time });
        } catch (err) {
            res.status(500).json({ error: "Erro ao atualizar time." });
        }
    }

    static async deletar(req, res) {
        try {
            const time = await Time.deletar(req.params.id);
            if (!time) {
                return res.status(404).json({ error: "Time não encontrado." });
            }
            res.status(200).json({ message: "Time removido com sucesso!" });
        } catch (error) {
            res.status(500).json({ error: "Erro ao remover time." });
        }
    }
}

export default TimeController;
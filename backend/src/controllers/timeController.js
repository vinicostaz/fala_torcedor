import Time from "../models/Time.js";
import { format } from 'date-fns';

class TimeController {
    static async buscarTodos(req, res) {
        try {
            const times = await Time.buscarTodosComTorcedores();

            const formattedTimes = times.map((time) => ({
                ...time,
                data_fundacao: time.data_fundacao
                    ? format(new Date(time.data_fundacao), 'dd/MM/yyyy')
                    : null,
            }));

            res.status(200).json(formattedTimes);
        } catch (error) {
            console.error("Erro ao buscar times com torcedores:", error);
            res.status(500).json({ error: "Erro ao buscar times com torcedores." });
        }
    }

    static async buscarPorId(req, res) {
        try {
            const time = await Time.buscarPorIdComTorcedores(req.params.id);

            if (!time) {
                return res.status(404).json({ error: "Time não encontrado." });
            }

            time.data_fundacao = time.data_fundacao
                ? format(new Date(time.data_fundacao), 'dd/MM/yyyy')
                : null;

            res.status(200).json(time);
        } catch (error) {
            console.error("Erro ao buscar time:", error);
            res.status(500).json({ error: "Erro ao buscar time." });
        }
    }

    static async criar(req, res) {
        try {
            const { nome, foto_url, data_fundacao, serie } = req.body;
            const novoTime = { nome, foto_url, data_fundacao, serie };
            const time = await Time.criar(novoTime);

            time.data_fundacao = format(new Date(time.data_fundacao), 'dd/MM/yyyy');

            res.status(201).json({ message: "Time criado com sucesso!", time });
        } catch (error) {
            console.error("Erro ao criar time:", error);
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

            time.data_fundacao = format(new Date(time.data_fundacao), 'dd/MM/yyyy');

            res.status(200).json({ message: "Time atualizado com sucesso!", time });
        } catch (error) {
            console.error("Erro ao atualizar time:", error);
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
            console.error("Erro ao remover time:", error);
            res.status(500).json({ error: "Erro ao remover time." });
        }
    }
}

export default TimeController;
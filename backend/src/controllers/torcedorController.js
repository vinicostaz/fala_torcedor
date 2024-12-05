import Torcedor from "../models/Torcedor.js";
import { format } from 'date-fns';

class TorcedorController {
    static async buscarTodos(req, res) {
        try {
            const torcedores = await Torcedor.buscarTodos();

            const formattedTorcedores = torcedores.map(torcedor => ({
                ...torcedor,
                data_nascimento: torcedor.data_nascimento
                    ? format(new Date(torcedor.data_nascimento), 'dd/MM/yyyy')
                    : null,
                time: {
                    ...torcedor.time,
                    data_fundacao: torcedor.time.data_fundacao
                        ? format(new Date(torcedor.time.data_fundacao), 'dd/MM/yyyy')
                        : null,
                }
            }));

            res.status(200).json(formattedTorcedores);
        } catch (err) {
            console.error("Erro ao buscar torcedores:", err);
            res.status(500).json({ error: "Erro ao buscar torcedores." });
        }
    }

    static async buscarPorId(req, res) {
        try {
            const torcedor = await Torcedor.buscarPorId(req.params.id);
            if (!torcedor) {
                return res.status(404).json({ error: "Torcedor não encontrado." });
            }

            torcedor.data_nascimento = torcedor.data_nascimento
                ? format(new Date(torcedor.data_nascimento), 'dd/MM/yyyy')
                : null;

            torcedor.time.data_fundacao = torcedor.time.data_fundacao
                ? format(new Date(torcedor.time.data_fundacao), 'dd/MM/yyyy')
                : null;

            res.status(200).json(torcedor);
        } catch (err) {
            console.error("Erro ao buscar torcedor:", err);
            res.status(500).json({ error: "Erro ao buscar torcedor." });
        }
    }

    static async criar(req, res) {
        try {
            const { nome, time, foto_url, data_nascimento } = req.body;
            const novoTorcedor = { nome, time, foto_url, data_nascimento };
            const torcedor = await Torcedor.criar(novoTorcedor);

            torcedor.data_nascimento = format(new Date(torcedor.data_nascimento), 'dd/MM/yyyy');

            res.status(201).json({ message: "Torcedor cadastrado com sucesso!", torcedor });
        } catch (err) {
            console.error("Erro ao cadastrar torcedor:", err);
            res.status(500).json({ error: "Erro ao cadastrar torcedor." });
        }
    }

    static async atualizar(req, res) {
        try {
            const fieldsToUpdate = req.body;
            const torcedor = await Torcedor.atualizar(req.params.id, fieldsToUpdate);

            if (!torcedor) {
                return res.status(404).json({ error: "Torcedor não encontrado." });
            }

            torcedor.data_nascimento = format(new Date(torcedor.data_nascimento), 'dd/MM/yyyy');

            res.status(200).json({ message: "Torcedor atualizado com sucesso!", torcedor });
        } catch (err) {
            console.error("Erro ao atualizar torcedor:", err);
            res.status(500).json({ error: "Erro ao atualizar torcedor." });
        }
    }

    static async deletar(req, res) {
        try {
            const torcedor = await Torcedor.deletar(req.params.id);
            if (!torcedor) {
                return res.status(404).json({ error: "Torcedor não encontrado." });
            }
            res.status(200).json({ message: "Torcedor removido com sucesso!" });
        } catch (err) {
            console.error("Erro ao remover torcedor:", err);
            res.status(500).json({ error: "Erro ao remover torcedor." });
        }
    }
}

export default TorcedorController;
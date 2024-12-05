import conectaNaDatabase from '../config/dbConnect.js';

class Torcedor {
    static async criar({ nome, time, foto_url, data_nascimento }) {
        const query = `
            INSERT INTO torcedores (nome, time, foto_url, data_nascimento) 
            VALUES ($1, $2, $3, $4) 
            RETURNING *`;
        const values = [nome, time, foto_url, data_nascimento];

        try {
            const result = await conectaNaDatabase.query(query, values);
            return result.rows[0];
        } catch (error) {
            console.error("Erro ao criar torcedor:", error);
            throw error;
        }
    }

    static async buscarTodos() {
        const query = `
            SELECT torcedores.*, times.id AS time_id, times.nome AS time_nome, 
                   times.serie AS time_serie, times.foto_url AS time_foto_url, times.data_fundacao
            FROM torcedores
            LEFT JOIN times ON torcedores.time = times.nome
            ORDER BY torcedores.id ASC`;

        try {
            const result = await conectaNaDatabase.query(query);
            return result.rows.map(row => ({
                id: row.id,
                nome: row.nome,
                foto_url: row.foto_url,
                data_nascimento: row.data_nascimento,
                time: {
                    id: row.time_id,
                    nome: row.time_nome,
                    serie: row.time_serie,
                    foto_url: row.time_foto_url,
                    data_fundacao: row.data_fundacao,
                }
            }));
        } catch (error) {
            console.error("Erro ao buscar torcedores com informações do time:", error);
            throw error;
        }
    }

    static async buscarPorId(id) {
        const query = `
            SELECT torcedores.*, times.id AS time_id, times.nome AS time_nome, 
                   times.serie AS time_serie, times.foto_url AS time_foto_url, times.data_fundacao
            FROM torcedores
            LEFT JOIN times ON torcedores.time = times.nome
            WHERE torcedores.id = $1`;

        try {
            const result = await conectaNaDatabase.query(query, [id]);

            if (result.rows.length === 0) {
                return null;
            }

            const torcedor = result.rows[0];

            return {
                id: torcedor.id,
                nome: torcedor.nome,
                foto_url: torcedor.foto_url,
                data_nascimento: torcedor.data_nascimento,
                time: {
                    id: torcedor.time_id,
                    nome: torcedor.time_nome,
                    serie: torcedor.time_serie,
                    foto_url: torcedor.time_foto_url,
                    data_fundacao: torcedor.data_fundacao,
                }
            };
        } catch (error) {
            console.error("Erro ao buscar torcedor com informações do time:", error);
            throw error;
        }
    }

    static async atualizar(id, fields) {
        const setClause = [];
        const values = [];
        let index = 1;

        for (const [key, value] of Object.entries(fields)) {
            if (value !== undefined) {
                setClause.push(`${key} = $${index}`);
                values.push(value);
                index++;
            }
        }

        if (setClause.length === 0) {
            throw new Error("Nenhum campo para atualizar");
        }

        const query = `
            UPDATE torcedores 
            SET ${setClause.join(", ")} 
            WHERE id = $${index} 
            RETURNING *`;

        values.push(id);

        try {
            const result = await conectaNaDatabase.query(query, values);
            return result.rows[0];
        } catch (error) {
            console.error("Erro ao atualizar torcedor:", error);
            throw error;
        }
    }

    static async deletar(id) {
        const query = "DELETE FROM torcedores WHERE id = $1 RETURNING *";
        const values = [id];

        try {
            const result = await conectaNaDatabase.query(query, values);
            return result.rows[0];
        } catch (error) {
            console.error("Erro ao deletar torcedor:", error);
            throw error;
        }
    }
}

export default Torcedor;
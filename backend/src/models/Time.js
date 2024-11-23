import conectaNaDatabase from '../config/dbConnect.js';

class Time {
    static async criar({ nome, foto_url, data_fundacao, serie }) {
        const query = `
            INSERT INTO times (nome, foto_url, data_fundacao, serie) 
            VALUES ($1, $2, $3, $4) 
            RETURNING *`;
        const values = [nome, foto_url, data_fundacao, serie];

        try {
            const result = await conectaNaDatabase.query(query, values);
            return result.rows[0];
        } catch (error) {
            console.error("Erro ao criar time:", error);
            throw error;
        }
    }

    static async buscarTodosComTorcedores() {
        const query = `
            SELECT times.*, torcedores.id AS torcedor_id, torcedores.nome AS torcedor_nome,
                   torcedores.foto_url AS torcedor_foto_url, torcedores.data_nascimento
            FROM times
            LEFT JOIN torcedores ON times.nome = torcedores.time
            ORDER BY times.id, torcedores.id`;

        try {
            const result = await conectaNaDatabase.query(query);
            const timesMap = {};
            result.rows.forEach(row => {
                if (!timesMap[row.id]) {
                    timesMap[row.id] = {
                        id: row.id,
                        nome: row.nome,
                        serie: row.serie,
                        foto_url: row.foto_url,
                        data_fundacao: row.data_fundacao,
                        torcedores: []
                    };
                }

                if (row.torcedor_id) {
                    timesMap[row.id].torcedores.push({
                        id: row.torcedor_id,
                        nome: row.torcedor_nome,
                        foto_url: row.torcedor_foto_url,
                        data_nascimento: row.data_nascimento,
                    });
                }
            });
            return Object.values(timesMap);
        } catch (error) {
            console.error("Erro ao buscar times com torcedores:", error);
            throw error;
        }
    }

    static async buscarPorIdComTorcedores(id) {
        const query = `
            SELECT times.*, torcedores.id AS torcedor_id, torcedores.nome AS torcedor_nome, 
                   torcedores.foto_url AS torcedor_foto_url, torcedores.data_nascimento
            FROM times
            LEFT JOIN torcedores ON times.nome = torcedores.time
            WHERE times.id = $1`;

        try {
            const result = await conectaNaDatabase.query(query, [id]);

            if (result.rows.length === 0) {
                return null;
            }

            const time = {
                id: result.rows[0].id,
                nome: result.rows[0].nome,
                serie: result.rows[0].serie,
                foto_url: result.rows[0].foto_url,
                data_fundacao: result.rows[0].data_fundacao,
                torcedores: []
            };

            result.rows.forEach(row => {
                if (row.torcedor_id) {
                    time.torcedores.push({
                        id: row.torcedor_id,
                        nome: row.torcedor_nome,
                        foto_url: row.torcedor_foto_url,
                        data_nascimento: row.data_nascimento,
                    });
                }
            });

            return time;
        } catch (error) {
            console.error("Erro ao buscar time com torcedores:", error);
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
            UPDATE times 
            SET ${setClause.join(", ")} 
            WHERE id = $${index} 
            RETURNING *`;

        values.push(id);

        try {
            const result = await conectaNaDatabase.query(query, values);
            return result.rows[0];
        } catch (error) {
            console.error("Erro ao atualizar time:", error);
            throw error;
        }
    }

    static async deletar(id) {
        const query = "DELETE FROM times WHERE id = $1 RETURNING *";
        const values = [id];

        try {
            const result = await conectaNaDatabase.query(query, values);
            return result.rows[0];
        } catch (error) {
            console.error("Erro ao deletar time:", error);
            throw error;
        }
    }
}

export default Time;
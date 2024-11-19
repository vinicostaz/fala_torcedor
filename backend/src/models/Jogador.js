import conectaNaDatabase from '../config/dbConnect.js';

class Jogador {
    static async criar({ nome, posicao, time, numero, foto_url }) {
        const query = `
            INSERT INTO jogadores (nome, posicao, time, numero, foto_url) 
            VALUES ($1, $2, $3, $4, $5) 
            RETURNING *`;
        const values = [nome, posicao, time, numero, foto_url];
        
        try {
            const result = await conectaNaDatabase.query(query, values);
            return result.rows[0];
        } catch (error) {
            console.error("Erro ao criar jogador:", error);
            throw error;
        }
    }

    static async buscarTodosComTime() {
        const query = `
            SELECT jogadores.*, times.id AS time_id, times.nome AS time_nome, 
                   times.divisao AS time_divisao, times.titulos_superbowl AS time_titulos_superbowl, 
                   times.foto_url AS time_foto_url
            FROM jogadores
            LEFT JOIN times ON jogadores.time = times.nome
            ORDER BY jogadores.id ASC`;

        try {
            const result = await conectaNaDatabase.query(query);
            return result.rows.map(row => ({
                id: row.id,
                nome: row.nome,
                posicao: row.posicao,
                numero: row.numero,
                foto_url: row.foto_url,
                time: {
                    id: row.time_id,
                    nome: row.time_nome,
                    divisao: row.time_divisao,
                    titulos_superbowl: row.time_titulos_superbowl,
                    foto_url: row.time_foto_url
                }
            }));
        } catch (error) {
            console.error("Erro ao buscar jogadores com informações do time:", error);
            throw error;
        }
    }

    static async buscarPorIdComTime(id) {
        const query = `
            SELECT jogadores.*, times.id AS time_id, times.nome AS time_nome, 
                   times.divisao AS time_divisao, times.titulos_superbowl AS time_titulos_superbowl, 
                   times.foto_url AS time_foto_url
            FROM jogadores
            LEFT JOIN times ON jogadores.time = times.nome
            WHERE jogadores.id = $1`;
        try {
            const result = await conectaNaDatabase.query(query, [id]);

            if (result.rows.length === 0) {
                return null;
            }

            const jogador = result.rows[0];

            return {
                id: jogador.id,
                nome: jogador.nome,
                posicao: jogador.posicao,
                numero: jogador.numero,
                foto_url: jogador.foto_url,
                time: {
                    id: jogador.time_id,
                    nome: jogador.time_nome,
                    divisao: jogador.time_divisao,
                    titulos_superbowl: jogador.time_titulos_superbowl,
                    foto_url: jogador.time_foto_url
                }
            };
        } catch (error) {
            console.error("Erro ao buscar jogador com informações do time:", error);
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
            UPDATE jogadores 
            SET ${setClause.join(", ")} 
            WHERE id = $${index} 
            RETURNING *`;
        
        values.push(id);

        try {
            const result = await conectaNaDatabase.query(query, values);
            return result.rows[0];
        } catch (error) {
            console.error("Erro ao atualizar jogador:", error);
            throw error;
        }
    }

    static async deletar(id) {
        const query = "DELETE FROM jogadores WHERE id = $1 RETURNING *";
        const values = [id];
        
        try {
            const result = await conectaNaDatabase.query(query, values);
            return result.rows[0];
        } catch (error) {
            console.error("Erro ao deletar jogador:", error);
            throw error;
        }
    }
}

export default Jogador;
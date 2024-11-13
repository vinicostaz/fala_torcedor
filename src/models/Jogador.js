import conectaNaDatabase from '../config/dbConnect.js';

class Jogador {
    static async criar({ nome, posicao, time, numero }) {
        const query = `
            INSERT INTO jogadores (nome, posicao, time, numero) 
            VALUES ($1, $2, $3, $4) 
            RETURNING *`;
        const values = [nome, posicao, time, numero];
        
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
            SELECT jogadores.*, times.id AS time_id, times.divisao, times.titulos_superbowl 
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
                time: {
                    nome: row.time,
                    id: row.time_id,
                    divisao: row.divisao,
                    titulos_superbowl: row.titulos_superbowl
                }
            }));
        } catch (error) {
            console.error("Erro ao buscar jogadores com informações do time:", error);
            throw error;
        }
    }

    static async buscarPorIdComTime(id) {
        const query = `
            SELECT jogadores.*, times.id AS time_id, times.divisao, times.titulos_superbowl 
            FROM jogadores
            LEFT JOIN times ON jogadores.time = times.nome
            WHERE jogadores.id = $1`;

        try {
            const result = await conectaNaDatabase.query(query, [id]);

            if (result.rows.length === 0) {
                return null; // Jogador não encontrado
            }

            const jogador = result.rows[0];

            return {
                id: jogador.id,
                nome: jogador.nome,
                posicao: jogador.posicao,
                numero: jogador.numero,
                time: {
                    nome: jogador.time,
                    id: jogador.time_id,
                    divisao: jogador.divisao,
                    titulos_superbowl: jogador.titulos_superbowl
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

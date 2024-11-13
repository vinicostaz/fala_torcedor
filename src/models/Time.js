import conectaNaDatabase from '../config/dbConnect.js';

class Time {
    static async criar({ nome, divisao, titulos_superbowl }) {
        const query = `
            INSERT INTO times (nome, divisao, titulos_superbowl) 
            VALUES ($1, $2, $3) 
            RETURNING *`;
        const values = [nome, divisao, titulos_superbowl];
        
        try {
            const result = await conectaNaDatabase.query(query, values);
            return result.rows[0];
        } catch (error) {
            console.error("Erro ao criar time:", error);
            throw error;
        }
    }

    static async buscarTodosComJogadores() {
        const query = `
            SELECT times.*, jogadores.id AS jogador_id, jogadores.nome AS jogador_nome, 
                   jogadores.posicao AS jogador_posicao, jogadores.numero AS jogador_numero
            FROM times
            LEFT JOIN jogadores ON times.nome = jogadores.time
            ORDER BY times.id, jogadores.id`;

        try {
            const result = await conectaNaDatabase.query(query);
            const timesMap = {};
            result.rows.forEach(row => {
                if (!timesMap[row.id]) {
                    timesMap[row.id] = {
                        id: row.id,
                        nome: row.nome,
                        divisao: row.divisao,
                        titulos_superbowl: row.titulos_superbowl,
                        jogadores: []
                    };
                }

                if (row.jogador_id) {
                    timesMap[row.id].jogadores.push({
                        id: row.jogador_id,
                        nome: row.jogador_nome,
                        posicao: row.jogador_posicao,
                        numero: row.jogador_numero
                    });
                }
            });

            return Object.values(timesMap);
        } catch (error) {
            console.error("Erro ao buscar times com jogadores:", error);
            throw error;
        }
    }

    static async buscarPorIdComJogadores(id) {
        const query = `
            SELECT times.*, jogadores.id AS jogador_id, jogadores.nome AS jogador_nome, 
                   jogadores.posicao AS jogador_posicao, jogadores.numero AS jogador_numero
            FROM times
            LEFT JOIN jogadores ON times.nome = jogadores.time
            WHERE times.id = $1`;

        try {
            const result = await conectaNaDatabase.query(query, [id]);

            if (result.rows.length === 0) {
                return null;
            }

            const time = {
                id: result.rows[0].id,
                nome: result.rows[0].nome,
                divisao: result.rows[0].divisao,
                titulos_superbowl: result.rows[0].titulos_superbowl,
                jogadores: []
            };

            result.rows.forEach(row => {
                if (row.jogador_id) {
                    time.jogadores.push({
                        id: row.jogador_id,
                        nome: row.jogador_nome,
                        posicao: row.jogador_posicao,
                        numero: row.jogador_numero
                    });
                }
            });

            return time;
        } catch (error) {
            console.error("Erro ao buscar time com jogadores:", error);
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
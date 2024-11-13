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

    static async buscarTodos() {
        const query = "SELECT * FROM times ORDER BY id ASC";
        
        try {
            const result = await conectaNaDatabase.query(query);
            return result.rows;
        } catch (error) {
            console.error("Erro ao buscar times:", error);
            throw error;
        }
    }

    static async buscarPorIdComJogadores(id) {
        const timeQuery = "SELECT * FROM times WHERE id = $1";
        const jogadoresQuery = "SELECT * FROM jogadores WHERE time_id = $1";
        
        try {
            const timeResult = await conectaNaDatabase.query(timeQuery, [id]);
            const jogadoresResult = await conectaNaDatabase.query(jogadoresQuery, [id]);
            
            if (timeResult.rows.length === 0) {
                return null;
            }

            const time = timeResult.rows[0];
            time.jogadores = jogadoresResult.rows;
            return time;
        } catch (error) {
            console.error("Erro ao buscar time e jogadores:", error);
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
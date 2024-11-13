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

    static async buscarTodos() {
        const query = "SELECT * FROM jogadores ORDER BY id ASC";
        
        try {
            const result = await conectaNaDatabase.query(query);
            return result.rows;
        } catch (error) {
            console.error("Erro ao buscar jogadores:", error);
            throw error;
        }
    }

    static async buscarPorId(id) {
        const query = "SELECT * FROM jogadores WHERE id = $1";
        const values = [id];
        
        try {
            const result = await conectaNaDatabase.query(query, values);
            return result.rows[0];
        } catch (error) {
            console.error("Erro ao buscar jogador por ID:", error);
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
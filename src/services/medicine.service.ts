import { Medicine } from "../utils/model/medicine";
import * as db from "../db/index";

export class MedicineService {

    create = async (data: Medicine) => {
        const query = 'INSERT INTO medicine (name, price) VALUES ($1, $2) RETURNING *';

        try {
            const { rows } = await db.query(query, [data.name, data.price]);
            return rows[0];
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    getAll = async () => {
        const query = 'SELECT * FROM medicine order by name';

        try {
            const { rows } = await db.query(query, []);
            return rows;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    search = async (name: string) => {
        const query = 'SELECT * FROM medicine WHERE name ilike $1';

        try {
            const { rows } = await db.query(query, [`%${name}%`]);
            return rows;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    delete = async (id: number) => {
        const query = 'DELETE FROM medicine WHERE id = $1';

        try {
            await db.query(query, [id]);
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
}

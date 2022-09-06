import { Pool } from "pg"

let pool: Pool;

export const createDbConnection = () => {
    if (pool == null) {
        // credentials from env
        pool = new Pool();
    }

    return pool;
}
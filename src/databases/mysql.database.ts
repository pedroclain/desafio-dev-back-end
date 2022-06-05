import knex, { Knex } from "knex";

const connection: Knex = knex({
    client: 'mysql2',
    connection: {
        host: '127.0.0.1',
        user: 'root',
        password: 'root',
        database: 'test_knex',
        requestTimeout: Infinity
    },
    useNullAsDefault: true,
});
export default connection;
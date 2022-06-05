## Como executar

No arquivo src/databases/mysql.database coloque suas credenciais para acessar o banco de dados local

```js
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
```

Digite o comando a seguir para iniciar a aplicação

```sh
npm install | npm build | npm start
```

Para criar uma nova inscrição acesse o endpoint http://localhost:3333/subscribe

import { Client } from 'pg';

const client = new Client({
  user: 'cuong',
  host: 'localhost',
  database: 'crud_db',
  password: '11111',
  port: 5432,
});

client.connect();

export default client;

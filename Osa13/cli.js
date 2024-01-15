const { Client } = require('pg');
require('dotenv').config();

(async () => {
  const client = new Client({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
//    ssl: true,
  });
  await client.connect();
  const res = await client.query('SELECT $1::text as connected', ['Connection to postgres successful!']);
  console.log(res.rows[0].connected);

  const query = 'SELECT * FROM blogs';
  const result = await client.query(query);
  console.log("Executing (default): SELECT * FROM blogs")

  // Print the rows
  const rows = result.rows;
  rows.forEach((row, index) => {
    const { author, title, likes } = row;
    console.log(`${author}: '${title}', ${likes} likes`);
  });
  await client.end();
})();

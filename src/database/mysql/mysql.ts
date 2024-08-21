import mysql from "mysql";

const mysql_connection = mysql.createPool({
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  host: process.env.MYSQL_HOST,
  database: process.env.MYSQL_DATABASE,
  port: Number(process.env.MYSQL_PORT),
});

export { mysql_connection };

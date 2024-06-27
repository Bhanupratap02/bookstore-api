import { createPool } from "mysql2/promise";

export const connection = createPool({
  host: "127.0.0.1",
  user: "root",
  password: "Sachin0211",
  port: 3306,
  database: "bookstore_sys",
  connectionLimit: 10,
});

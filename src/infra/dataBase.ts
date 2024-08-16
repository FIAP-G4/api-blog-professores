import dotenv from "dotenv";
import mysql, { Pool, PoolConnection } from "mysql2/promise";

dotenv.config();

class Database {
  private pool: Pool;

  constructor() {
    this.pool = mysql.createPool({
      host: process.env.CONTAINER_DB,
      user: process.env.USER_DB,
      password: process.env.PASSWORD_USER_DB,
      database: process.env.DATABASE_DB,
    });
  }

  public async getConnection(): Promise<PoolConnection> {
    let db;
    try {
      db = await this.pool.getConnection();
      return db;
    } catch (error) {
      console.error("Error connecting to MySQL:", error);
      throw error;
    }
  }

  public async query(sql: string): Promise<any> {
    const conn = await this.getConnection();
    try {
      return await conn.query(sql);
    } finally {
      if (conn) conn.release();
    }
  }
}

export default Database;

import { Sequelize } from "sequelize-typescript";

const sequelize = new Sequelize({
  database: process.env.DB_NAME,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  dialect: process.env.DB_DIALECT as 'mysql' | 'postgres' | 'sqlite' | 'mariadb' | 'mssql',
});

const connectDB = async ():Promise<void> => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
      } catch (error) {
        console.error('Unable to connect to the database:', error);
      }
}

export default {connectDB, sequelize};
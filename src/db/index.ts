import { Sequelize } from "sequelize";


export const sequelize = new Sequelize('kulikivka', 'postgres', '12345', {
    host: 'localhost',
    dialect: 'postgres' /* 'mysql' | 'postgres' | 'sqlite' | 'mariadb' | 'mssql' | 'db2' | 'snowflake' | 'oracle' */
});
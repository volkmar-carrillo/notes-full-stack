import Sequilize from "sequelize";
import 'dotenv/config'

const database = process.env.SEQUELIZE_DATABASE;
const username = process.env.SEQUELIZE_USERNAME;
const password = process.env.SEQUELIZE_PASSWORD;
const host = process.env.SEQUELIZE_HOST;
const dialect = process.env.SEQUELIZE_DIALECT;
const ssl = process.env.SEQUELIZE_SSL;

export const sequelize = new Sequilize(database, username, password, {
  host: host,
  dialect: dialect,
  dialectOptions: {
    ssl: ssl,
  },
});

import app from "./app.js";
import { sequelize } from "./config/database.js";

const port = process.env.PORT;

async function main() {
  try {
    await sequelize.sync();
    console.log("Connection has been established successfully.");
    app.listen(port);
    console.log("Server listening on port: ", port);
  } catch (error) {
    console.log("Unable to connect to the database:", error);
  }
}

main();

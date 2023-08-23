import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";

export const Tag = sequelize.define(
  "tags",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: true,
  }
);

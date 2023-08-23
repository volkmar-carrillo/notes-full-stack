import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";
import { Tag } from "./Tag.js";
import { Note } from "./Note.js";

export const TagNote = sequelize.define(
  "tags_notes",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    tagId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Tag,
        key: "id",
      },
    },
    noteId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Note,
        key: "id",
      },
    },
  },
  {
    timestamps: true,
  }
);

Tag.belongsToMany(Note, { through: TagNote });
Note.belongsToMany(Tag, { through: TagNote });

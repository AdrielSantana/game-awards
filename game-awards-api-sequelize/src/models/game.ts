import { Model, DataTypes } from "sequelize";
import { sequelize } from "../database";

export interface GameInstance extends Model {
  id: number;
  name: string;
  description: string;
  cover: string;
}

export const Game = sequelize.define<GameInstance>("games", {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    unique: true,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  cover: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

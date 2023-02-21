import {
  Model,
  DataTypes,
  BelongsToManyRemoveAssociationMixin,
  BelongsToManyAddAssociationMixin,
  BelongsToManyHasAssociationMixin,
} from "sequelize";
import { sequelize } from "../database";
import { GameInstance } from "./game";

export interface CategoryInstance extends Model {
  id: number;
  name: string;
  addGame: BelongsToManyAddAssociationMixin<GameInstance, number | string>;
  removeGame: BelongsToManyRemoveAssociationMixin<
    GameInstance,
    number | string
  >;
  hasGame: BelongsToManyHasAssociationMixin<GameInstance, number>;
}

export const Category = sequelize.define<CategoryInstance>("categories", {
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
});

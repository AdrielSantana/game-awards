import { Model, DataTypes, BelongsToManyHasAssociationMixin } from "sequelize";
import { sequelize } from "../database";

export interface CategoryGamesInstance extends Model {
  gameId: number;
  categoryId: number;
  votes: number;
}

export const CategoryGames = sequelize.define<CategoryGamesInstance>(
  "category_games",
  {
    gameId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: "games",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
    categoryId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: "categories",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
    votes: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
  }
);

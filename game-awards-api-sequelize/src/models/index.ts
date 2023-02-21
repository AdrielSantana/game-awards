import { Category } from "./category";
import { Game } from "./game";

Category.belongsToMany(Game, { through: "category_games" });
Game.belongsToMany(Category, { through: "category_games" });

export { Category, Game };

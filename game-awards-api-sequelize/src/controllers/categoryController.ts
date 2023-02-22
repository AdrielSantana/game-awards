import { Request, Response } from "express";
import { Category, Game } from "../models";
import { CategoryGames, CategoryGamesInstance } from "../models/categoryGames";

const respondWith = (
  res: Response,
  status: number,
  message: string,
  obj?: object,
  found: boolean = true
) => {
  return res.status(status).json({
    message: message,
    found: found,
    ...obj,
  });
};

export const categoryController = {
  //GET /categories
  index: async (req: Request, res: Response) => {
    try {
      const categories = await Category.findAll({
        attributes: { exclude: ["createdAt", "updatedAt"] },
      });

      return res.status(200).json(categories);
    } catch (error) {
      if (error instanceof Error) {
        return respondWith(res, 400, error.message, {}, false);
      }
    }
  },

  //GET /categories/:id
  show: async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      const category = await Category.findByPk(id, {
        include: [
          {
            model: Game,
            attributes: { exclude: ["createdAt", "updatedAt"] },
            through: {
              as: "categoryGames",
              attributes: ["votes"],
            },
          },
        ],
        attributes: { exclude: ["createdAt", "updatedAt"] },
      });

      if (!category) {
        return respondWith(res, 404, "Category not found", {}, false);
      }

      return respondWith(res, 200, "Showing category", { ...category.get() });
    } catch (error) {
      if (error instanceof Error) {
        return respondWith(res, 400, error.message, {}, false);
      }
    }
  },

  //POST /categories
  save: async (req: Request, res: Response) => {
    const { name } = req.body;
    try {
      const category = await Category.create({ name });

      return respondWith(res, 201, "Category saved", { ...category.get() });
    } catch (error) {
      if (error instanceof Error) {
        return respondWith(res, 400, error.message, {}, false);
      }
    }
  },

  //POST /categories/:id
  update: async (req: Request, res: Response) => {
    const { name } = req.body;
    const { id } = req.params;

    try {
      const category = await Category.findByPk(id);

      if (!category) {
        return respondWith(res, 404, "Category not found", {}, false);
      }

      const [affectedRows, categories] = await Category.update(
        { name },
        { where: { id }, returning: true }
      );

      return respondWith(res, 201, "Category updated", {
        ...categories[0].get(),
      });
    } catch (error) {
      if (error instanceof Error) {
        return respondWith(res, 400, error.message, {}, false);
      }
    }
  },

  //DELETE /categories/:id
  delete: async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      const category = await Category.findByPk(id, {
        attributes: { exclude: ["createdAt", "updatedAt"] },
      });

      if (!category) {
        return respondWith(res, 404, "Category not found", {}, false);
      }

      await Category.destroy({ where: { id } });

      return respondWith(res, 200, "Category deleted", { ...category.get() });
    } catch (error) {
      if (error instanceof Error) {
        return respondWith(res, 400, error.message, {}, false);
      }
    }
  },

  //POST /categories/:categoryId/:gameId
  addGame: async (req: Request, res: Response) => {
    const { categoryId, gameId } = req.params;

    try {
      const category = await Category.findByPk(categoryId);
      const game = await Game.findByPk(gameId);

      if (!category) {
        return respondWith(res, 404, "Category not found", {}, false);
      }

      if (!game) {
        return respondWith(res, 404, "Game not found", {}, false);
      }

      const association = await CategoryGames.findOne({
        where: { gameId, categoryId },
      });

      if (association) {
        return respondWith(res, 400, "Game already in the category", {}, false);
      }

      const addedGameAssociation = await category.addGame(gameId);

      return respondWith(res, 200, "Game added to category", {
        addedGameAssociation,
      });
    } catch (error) {
      if (error instanceof Error) {
        return respondWith(res, 400, error.message, {}, false);
      }
    }
  },

  //DELETE /categories/:categoryId/:gameId
  removeGame: async (req: Request, res: Response) => {
    const { categoryId, gameId } = req.params;

    try {
      const category = await Category.findByPk(categoryId);
      const game = await Game.findByPk(gameId);

      if (!category) {
        return respondWith(res, 404, "Category not found", {}, false);
      }

      if (!game) {
        return respondWith(res, 404, "Game not found", {}, false);
      }

      const association = await CategoryGames.findOne({
        where: { gameId, categoryId },
        attributes: { exclude: ["createdAt", "updatedAt"] },
      });

      if (!association) {
        return respondWith(res, 404, "Game is not in this category", {}, false);
      }

      await category.removeGame(gameId);

      return respondWith(res, 200, "Game removed from the category", {
        association,
      });
    } catch (error) {
      if (error instanceof Error) {
        return respondWith(res, 400, error.message, {}, false);
      }
    }
  },

  //POST /categories/:categoryId/:gameId/vote
  addVote: async (req: Request, res: Response) => {
    const { categoryId, gameId } = req.params;

    try {
      const category = await Category.findByPk(categoryId);
      const game = await Game.findByPk(gameId);

      if (!category) {
        return respondWith(res, 404, "Category not found", {}, false);
      }

      if (!game) {
        return respondWith(res, 404, "Game not found", {}, false);
      }

      const association = await CategoryGames.findOne({
        where: { gameId, categoryId },
        attributes: { exclude: ["createdAt"] },
      });

      if (!association) {
        return respondWith(res, 404, "Game is not in this category", {}, false);
      }

      association.votes += 1;

      await association.save();

      return respondWith(res, 200, "Vote added", {
        association,
      });
    } catch (error) {
      if (error instanceof Error) {
        return respondWith(res, 400, error.message, {}, false);
      }
    }
  },

  //GET /categories/:categoryId/:gameId
  getGame: async (req: Request, res: Response) => {
    const { categoryId, gameId } = req.params;

    try {
      const category = await Category.findByPk(categoryId);
      const game = await Game.findByPk(gameId, {
        attributes: { exclude: ["createdAt", "updatedAt"] },
      });

      if (!category) {
        return respondWith(res, 404, "Category not found", {}, false);
      }

      if (!game) {
        return respondWith(res, 404, "Game not found", {}, false);
      }

      const association = await CategoryGames.findOne({
        where: { gameId, categoryId },
      });

      if (!association) {
        return respondWith(res, 404, "Game is not in this category", {}, false);
      }

      const showGame = {
        ...game.get(),
        categoryName: category.name,
        votes: association.votes,
      };

      return respondWith(res, 200, "Showing Category Game", { showGame });
    } catch (error) {
      if (error instanceof Error) {
        return respondWith(res, 400, error.message, {}, false);
      }
    }
  },

  //GET /categories/:categoryId/winner
  getWinner: async (req: Request, res: Response) => {
    const { categoryId } = req.params;

    try {
      const category = await Category.findByPk(categoryId);

      if (!category) {
        return respondWith(res, 404, "Category not found", {}, false);
      }

      const associations = await CategoryGames.findAll({
        where: { categoryId },
      });

      if (associations.length < 1) {
        return respondWith(res, 404, "Category do not have games", {}, false);
      }

      let winnerAssociation: CategoryGamesInstance = associations[0];

      associations.forEach((association) => {
        if (association.votes > winnerAssociation.votes) {
          winnerAssociation = association;
        }
      });

      const game = await Game.findByPk(winnerAssociation.gameId, {
        attributes: { exclude: ["createdAt", "updatedAt"] },
      });

      const winner = {
        ...game?.get(),
        category: category.name,
        votes: winnerAssociation.votes,
        found: true,
      };

      return respondWith(res, 200, "Showing category winner", { winner });
    } catch (error) {
      if (error instanceof Error) {
        return respondWith(res, 400, error.message, {}, false);
      }
    }
  },
};

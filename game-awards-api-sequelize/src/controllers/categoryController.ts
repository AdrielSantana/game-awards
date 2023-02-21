import { Request, Response } from "express";
import { Category, Game } from "../models";
import { CategoryGames, CategoryGamesInstance } from "../models/categoryGames";

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
        return res.status(400).json(error.message);
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
        return res
          .status(404)
          .json({ message: "category not found.", found: false });
      }

      return res.status(200).json({ ...category.get(), found: true });
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json(error.message);
      }
    }
  },

  //POST /categories
  save: async (req: Request, res: Response) => {
    const { name } = req.body;
    try {
      const category = await Category.create({ name });

      return res.status(201).json(category);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json(error.message);
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
        return res
          .status(404)
          .json({ message: "category not found.", found: false });
      }

      const [affectedRows, categories] = await Category.update(
        { name },
        { where: { id }, returning: true }
      );

      return res.status(201).json({ ...categories[0].get(), found: true });
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json(error.message);
      }
    }
  },

  //DELETE /categories/:id
  delete: async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      const category = await Category.findByPk(id);

      if (!category) {
        return res
          .status(404)
          .json({ message: "category not found", found: false });
      }

      await Category.destroy({ where: { id } });

      return res
        .status(200)
        .json({ message: `${category.name} category deleted`, found: true });
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json(error.message);
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
        return res
          .status(404)
          .json({ message: "category not found", found: false });
      }

      if (!game) {
        return res
          .status(404)
          .json({ message: "game not found", found: false });
      }

      const association = await CategoryGames.findOne({
        where: { gameId, categoryId },
      });

      if (association) {
        return res
          .status(404)
          .json({ message: "game is already in the category", found: false });
      }

      await category.addGame(gameId);

      return res.status(200).json({
        message: `${game.name} game added to ${category.name} category`,
        found: true,
      });
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json(error.message);
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
        return res
          .status(404)
          .json({ message: "category not found", found: false });
      }

      if (!game) {
        return res
          .status(404)
          .json({ message: "game not found", found: false });
      }

      const association = await CategoryGames.findOne({
        where: { gameId, categoryId },
      });

      if (!association) {
        return res
          .status(404)
          .json({ message: "game is not in this category", found: false });
      }

      await category.removeGame(gameId);

      return res.status(200).json({
        message: `${game.name} game removed from ${category.name} category`,
        found: true,
      });
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json(error.message);
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
        return res
          .status(404)
          .json({ message: "category not found", found: false });
      }

      if (!game) {
        return res
          .status(404)
          .json({ message: "game not found", found: false });
      }

      const association = await CategoryGames.findOne({
        where: { gameId, categoryId },
      });

      if (!association) {
        return res
          .status(404)
          .json({ message: "game is not in this category", found: false });
      }

      association.votes += 1;

      await association.save();

      return res.status(200).json({
        message: `1 vote added to ${game.name} in ${category.name} category`,
        found: true,
      });
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json(error.message);
      }
    }
  },

  //GET /categories/:categoryId/:gameId
  getGame: async (req: Request, res: Response) => {
    const { categoryId, gameId } = req.params;

    try {
      const category = await Category.findByPk(categoryId);
      const game = await Game.findByPk(gameId);

      if (!category) {
        return res
          .status(404)
          .json({ message: "category not found", found: false });
      }

      if (!game) {
        return res
          .status(404)
          .json({ message: "game not found", found: false });
      }

      const association = await CategoryGames.findOne({
        where: { gameId, categoryId },
      });

      if (!association) {
        return res
          .status(404)
          .json({ message: "game is not in this category", found: false });
      }

      return res.status(200).json({
        ...game.get(),
        category_name: category.name,
        votes: association.votes,
        found: true,
      });
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json(error.message);
      }
    }
  },

  //GET /categories/:categoryId/winner
  getWinner: async (req: Request, res: Response) => {
    const { categoryId } = req.params;

    try {
      const category = await Category.findByPk(categoryId);

      if (!category) {
        return res
          .status(404)
          .json({ message: "category not found", found: false });
      }

      const associations = await CategoryGames.findAll({
        where: { categoryId },
      });

      if (associations.length < 1) {
        return res.status(404).json({
          message: "category do not have games associated",
          found: false,
        });
      }

      let winnerAssociation: CategoryGamesInstance = associations[0];

      associations.forEach((association) => {
        if (association.votes > winnerAssociation.votes) {
          winnerAssociation = association;
        }
      });

      const game = await Game.findByPk(winnerAssociation.gameId);

      return res.status(200).json({
        ...game?.get(),
        category: category.name,
        votes: winnerAssociation.votes,
        found: true,
      });
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json(error.message);
      }
    }
  },
};

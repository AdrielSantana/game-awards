import { Request, Response } from "express";
import { Category, Game } from "../models";

export const gameController = {
  //GET /games
  index: async (req: Request, res: Response) => {
    try {
      const games = await Game.findAll({
        attributes: { exclude: ["createdAt", "updatedAt"] },
      });

      return res.status(200).json(games);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json(error.message);
      }
    }
  },

  //GET /games/:id
  show: async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      const game = await Game.findByPk(id, {
        include: [
          {
            model: Category,
            attributes: { exclude: ["createdAt", "updatedAt"] },
            through: {
              as: "categoryGames",
              attributes: ["votes"],
            },
          },
        ],
        attributes: { exclude: ["createdAt", "updatedAt"] },
      });

      if (!game) {
        return res
          .status(404)
          .json({ message: "Game not found.", found: false });
      }

      return res.status(200).json({ ...game.get(), found: true });
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json(error.message);
      }
    }
  },

  //POST /games
  save: async (req: Request, res: Response) => {
    const { name, description, cover } = req.body;
    try {
      const game = await Game.create({ name, description, cover });

      return res.status(201).json(game);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json(error.message);
      }
    }
  },

  //POST /games/:id
  update: async (req: Request, res: Response) => {
    const { name, description, cover } = req.body;
    const { id } = req.params;

    try {
      const game = await Game.findByPk(id);

      if (!game) {
        return res
          .status(404)
          .json({ message: "Game not found.", found: false });
      }

      const [affectedRows, games] = await Game.update(
        { name, description, cover },
        { where: { id }, returning: true }
      );

      return res.status(201).json({ ...games[0].get(), found: true });
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json(error.message);
      }
    }
  },

  //DELETE /games/:id
  delete: async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      const game = await Game.findByPk(id);

      if (!game) {
        return res
          .status(404)
          .json({ message: "Game not found", found: false });
      }

      await Game.destroy({ where: { id } });

      return res
        .status(200)
        .json({ message: `${game.name} Game deleted`, found: true });
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json(error.message);
      }
    }
  },
};

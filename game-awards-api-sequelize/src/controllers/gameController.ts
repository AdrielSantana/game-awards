import { Request, Response } from "express";
import { Category, Game } from "../models";

const respondWith = (
  res: Response,
  status: number,
  message: string,
  found: boolean = true,
  obj?: object
) => {
  return res.status(status).json({
    message: message,
    found: found,
    ...obj,
  });
};

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
        return respondWith(res, 400, error.message, false);
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
        return respondWith(res, 404, "Game not found", false);
      }

      return respondWith(res, 404, "Showing game", true, { ...game.get() });
    } catch (error) {
      if (error instanceof Error) {
        return respondWith(res, 400, error.message, false);
      }
    }
  },

  //POST /games
  save: async (req: Request, res: Response) => {
    const { name, description, cover } = req.body;
    try {
      const game = await Game.create({ name, description, cover });

      return respondWith(res, 201, "Game saved", true, { ...game.get() });
    } catch (error) {
      if (error instanceof Error) {
        return respondWith(res, 400, error.message, false);
      }
    }
  },

  //PUT /games/:id
  update: async (req: Request, res: Response) => {
    const { name, description, cover } = req.body;
    const { id } = req.params;

    try {
      const game = await Game.findByPk(id);

      if (!game) {
        return respondWith(res, 404, "Game not found", false);
      }

      const [affectedRows, games] = await Game.update(
        { name, description, cover },
        { where: { id }, returning: true }
      );

      return respondWith(res, 201, "Game updated", true, { ...games[0].get() });
    } catch (error) {
      if (error instanceof Error) {
        return respondWith(res, 400, error.message, false);
      }
    }
  },

  //DELETE /games/:id
  delete: async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      const game = await Game.findByPk(id, {
        attributes: { exclude: ["createdAt", "updatedAt"] },
      });

      if (!game) {
        return respondWith(res, 404, "Game not found", false);
      }

      await Game.destroy({ where: { id } });

      return respondWith(res, 200, "Game deleted", true, { ...game.get() });
    } catch (error) {
      if (error instanceof Error) {
        return respondWith(res, 400, error.message, false);
      }
    }
  },
};

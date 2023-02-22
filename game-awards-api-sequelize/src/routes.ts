import express from "express";
import { categoryController } from "./controllers/categoryController";
import { gameController } from "./controllers/gameController";

const router = express.Router();

router.get("/api/categories", categoryController.index);
router.get("/api/categories/:id", categoryController.show);
router.post("/api/categories", categoryController.save);
router.put("/api/categories/:id", categoryController.update);
router.delete("/api/categories/:id", categoryController.delete);
router.get("/api/categories/:categoryId/winner", categoryController.getWinner);

router.post("/api/categories/:categoryId/:gameId", categoryController.addGame);
router.delete("/api/categories/:categoryId/:gameId", categoryController.removeGame);
router.post("/api/categories/:categoryId/:gameId/vote", categoryController.addVote);
router.get("/api/categories/:categoryId/:gameId", categoryController.getGame);

router.get("/api/games", gameController.index);
router.get("/api/games/:id", gameController.show);
router.post("/api/games", gameController.save);
router.put("/api/games/:id", gameController.update);
router.delete("/api/games/:id", gameController.delete);

export { router };

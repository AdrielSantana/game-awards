import express from "express";
import { categoryController } from "./controllers/categoryController";
import { gameController } from "./controllers/gameController";

const router = express.Router();

router.get("/categories", categoryController.index);
router.get("/categories/:id", categoryController.show);
router.post("/categories", categoryController.save);
router.put("/categories/:id", categoryController.update);
router.delete("/categories/:id", categoryController.delete);
router.get("/categories/:categoryId/winner", categoryController.getWinner);

router.post("/categories/:categoryId/:gameId", categoryController.addGame);
router.delete("/categories/:categoryId/:gameId", categoryController.removeGame);
router.post("/categories/:categoryId/:gameId/vote", categoryController.addVote);
router.get("/categories/:categoryId/:gameId", categoryController.getGame);

router.get("/games", gameController.index);
router.get("/games/:id", gameController.show);
router.post("/games", gameController.save);
router.put("/games/:id", gameController.update);
router.delete("/games/:id", gameController.delete);

export { router };

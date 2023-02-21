import dotenv from "dotenv";
dotenv.config();

import express from "express";
const app = express();

import { router } from "./routes";

app.use(express.json());

app.use(router);

const PORT = 8080;

app.listen(PORT, () => {
  console.log("Started");
});

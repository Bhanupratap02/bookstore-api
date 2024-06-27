import { Router } from "express";
import { authToken } from "../helpers/authToken.js";
import { getBooksSold, sellBook } from "../controllers/sales.controller.js";

const router = Router();
router.get("/sale", authToken, getBooksSold);
router.post("/sale/:id", authToken, sellBook);

export default router

import { Router } from "express";
import { authToken } from "../helpers/authToken.js";
import {
  getAuthors,
  getSpecificAuthor,
  updateAuthor,
  deleteAuthor,
} from "../controllers/authors.controller.js";

const router = Router();

router.get("/author", authToken, getAuthors);
router.get("/author/:id", authToken, getSpecificAuthor);
router.patch("/author/:id", authToken, updateAuthor);
router.delete("/author/:id", authToken, deleteAuthor);

export default router;

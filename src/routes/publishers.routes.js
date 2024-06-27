import { Router } from "express";
import { authToken } from "../helpers/authToken.js";
import {
  getPublishers,
  getSpecificPublisher,
  updatePublisher,
  deletePublisher,
} from "../controllers/publishers.controller.js";
const router = Router();
router.get("/publisher", authToken, getPublishers);
router.get("/publisher/:id", authToken, getSpecificPublisher);
router.patch("/publisher/:id", authToken, updatePublisher);
router.delete("/publisher/:id", authToken, deletePublisher);
export default router;

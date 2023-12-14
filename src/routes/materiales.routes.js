import { Router } from "express";
import { getMateriales } from "../controllers/materialesController.js";

const router = Router();

router.get('/materiales/:id', getMateriales);


export default router;
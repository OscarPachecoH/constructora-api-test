import { Router } from "express";
import { getObras, getResidente } from "../controllers/obraController.js";


const router = Router();

router.get('/obra/residente/:id', getResidente)

router.get('/obra/:id', getObras)

export default router;
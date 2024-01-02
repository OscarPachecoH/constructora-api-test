import { Router } from "express";
import { getPisosCatidad } from "../controllers/graficaController.js";

const router = Router();

router.get('/graficas/totalCantidadPiso/:id', getPisosCatidad)

export default router
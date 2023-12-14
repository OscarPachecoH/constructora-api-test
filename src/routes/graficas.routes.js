import { Router } from "express";
import { getCantidadTotal, getPisosCatidad, getTotalPisos } from "../controllers/graficaController.js";

const router = Router();

router.get('/graficas/totalPisos/:id', getTotalPisos)

router.get('/graficas/totalCantidad/:id/:piso', getCantidadTotal)

router.get('/graficas/totalCantidadPiso/:id', getPisosCatidad)

export default router
import { Router } from "express";
import { getGastosMateriales, getGastosTramites, getGastosAdicionales, getGastosMaquinaria } from "../controllers/gastosController.js"

const router = Router();

router.get('/gastos/materiales/:id', getGastosMateriales)

router.get('/gastos/tramites/:id', getGastosTramites)

router.get('/gastos/maquinaria/:id', getGastosMaquinaria)

router.get('/gastos/adicionales/:id', getGastosAdicionales)

export default router;
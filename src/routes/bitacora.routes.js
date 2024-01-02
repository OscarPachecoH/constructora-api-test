import { Router } from "express";
import { getBitacora } from "../controllers/bitacoraController.js";

const router = Router();

router.get('/bitacora/:id/:fecha', getBitacora)

export default router;
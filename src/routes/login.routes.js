import { Router } from "express";
import { login, cambio, cambioOlvi, cambioB } from "../controllers/loginController.js";

const router = Router();

router.post('/login', login);

router.patch('/cambiocontra/:id', cambio)

router.patch('/cambiocontraB/:id', cambioB)

router.post('/recuperarcontra', cambioOlvi)

export default router;
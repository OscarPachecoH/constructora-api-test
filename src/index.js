import express from "express";
import loginRoutes from './routes/login.routes.js'
import materialRoutes from './routes/materiales.routes.js'
import obraRoutes from './routes/obra.routes.js'
import gastosRutes from './routes/gastos.routes.js'
import graficasRoutes from './routes/graficas.routes.js'
import cors from 'cors'

import {PORT} from './config.js'

const app = express();

app.use(cors({
    origin: ['https://playful-sunburst-bc2a70.netlify.app']
})); 

app.use(express.json());

app.use(loginRoutes);

app.use(materialRoutes);

app.use(obraRoutes);

app.use(gastosRutes);

app.use(graficasRoutes);

app.use((req, res, next) => {
    res.status(500).json({
        message: 'Endpoint not found'
    })
})

app.listen(PORT);
console.log('Server is running',PORT)
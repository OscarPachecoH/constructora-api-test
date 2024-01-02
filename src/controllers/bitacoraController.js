import {pool} from '../db.js'

const query = 'SELECT * FROM reportes WHERE idObra = ? and fecha = ?'
const bitacora = 'SELECT reportes.nombreIMG, reportes.comentario FROM reportes WHERE idObra = ? and fecha between ? and ?'

export const getBitacora = async (req, res) => {
    try{
        const {id, fecha} = req.params
        
        var fechaSelecionada = new Date(fecha)
        var weekday = fechaSelecionada.getDay()
        console.log("numero de día:" + weekday);
        
        let fechaOriginal = new Date(fecha);

        let fechaI = new Date(fechaOriginal);
        let fechaF = new Date(fechaOriginal);

        fechaI.setDate(fechaOriginal.getDate() - weekday);
        fechaF.setDate(fechaOriginal.getDate() + (5 - weekday));
        
        console.log('Fecha original:', fechaOriginal.toISOString().slice(0, 10));
        console.log('Fecha inicio:', fechaI.toISOString().slice(0, 10));
        console.log('Fecha final:', fechaF.toISOString().slice(0,10));

        const [rows] = await pool.query(bitacora, [id, fechaI, fechaF])
        res.json(rows)
        return req.params.fecha
    }catch(error){
        return res.status(500).json({
            message: 'Something goes wrong'
        })
    }
}
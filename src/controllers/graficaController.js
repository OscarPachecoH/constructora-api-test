import {pool} from '../db.js'

const query1 = 'SELECT sum(cantidad) as cantidadTotal from graficas WHERE idObra = ? and piso = ?'
const query2 = 'SELECT max(piso) as totalPisos from graficas where idObra = ?'
const query3 = 'SELECT graficas.piso, sum(cantidad) as cantidadTotal FROM graficas WHERE idObra = ? group by piso'

export const getTotalPisos = async (req, res) =>{
    try{
        const {id} = req.params
        const [rows] = await pool.query(query2, id)
        return res.json(rows[0])
    }catch(error){
        return res.status(500).json({
            message: 'Something goes wrong'
        })
    }
}

export const getCantidadTotal = async (req, res) => {
    try{
        const{id, piso} = req.params
        const [rows] = await pool.query(query1, [id, piso])
        return res.json(rows[0])
    }catch(error){
        return res.status(500).json({
            message: 'Something goes wrong'
        })
    }
}

export const getPisosCatidad = async (req, res) => {
    try{
        const{id} = req.params
        const [rows] = await pool.query(query3, id)
        return res.json(rows)
    }catch(error){
        return res.status(500).json({
            message: 'Something goes wrong'
        })
    }
}
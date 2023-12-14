import {pool} from '../db.js'

const query1 = 'SELECT residente from obra where idObra = ?'
const query2 = 'SELECT * from obra where idCliente = ?'

export const getResidente = async (req, res) => {
    const id = req.params.id
    try{
        const [rows] = await pool.query(query1, id)
        if(rows.length <= 0){
            return res.status(404).json({
                massage: 'No hay registro'
            })
        }
        res.json(rows[0])
    }catch(error){
        return res.status(500).json({
            message: 'Something goes wrong'
        })
    }
}

export const getObras = async (req, res) => {
    const id = req.params.id
    try{
        const [rows] = await pool.query(query2, id)
        if(rows.length <= 0){
            return res.status(404).json({
                message:'No hay resgistros'
            })
        }
        res.json(rows)
    }catch(error){
        return res.status(500).json({
            message: 'Something goes wrong'
        })
    }
}
import {pool} from '../db.js'

const query = 'SELECT entradamaterial.idEntMat, material.nombreMaterial, entradamaterial.cantEntMat, entradamaterial.precioUni FROM entradamaterial inner join material WHERE entradamaterial.idObra = ? and material.idMaterial = entradamaterial.idMaterial;'

export const getMateriales = async (req, res) =>{
    try{
        const {id} = req.params
        const [rows] = await pool.query(query, id)
        // if(rows.length <= 0){
        //     return res.status(404).json({
        //         message: 'No hay materiales registrados'
        //     })
        // }
        res.json(rows)
    }catch(error){
        return res.status(500).json({
            message: 'Something goes wrong'
        })
    }
}
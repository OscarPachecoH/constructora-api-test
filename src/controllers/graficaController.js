import {pool} from '../db.js'

const query1 = 'SELECT graficas.piso, sum(graficas.cantidad) as cantidadTotalAvanzado FROM graficas WHERE idObra = ? group by graficas.piso'
const query2 = 'SELECT niveld.idPiso, sum(niveld.cantidad) as cantidadTotal FROM niveld inner join pisos_obras WHERE pisos_obras.idObra = ? and pisos_obras.idPiso = niveld.idPiso group by idPiso'

export const getPisosCatidad = async (req, res) => {
    try{
        const{id} = req.params
        const [rows] = await pool.query(query1, id)
        const [rows2] = await pool.query(query2, id)

        for(let i = 0; i < rows.length; i++){

            rows[i].cantidadTotalFinal = rows2[i].cantidadTotal
            
        }

        return res.json(rows)

    }catch(error){
        return res.status(500).json({
            message: 'Something goes wrong'
        })
    }
}
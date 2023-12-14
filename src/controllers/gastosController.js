import {pool} from '../db.js'

const gastosMateriales = 'SELECT entradamaterial.idEntMat, material.nombreMaterial, entradamaterial.cantEntMat, entradamaterial.precioUni FROM entradamaterial inner join material WHERE entradamaterial.idObra = ? and material.idMaterial = entradamaterial.idMaterial;'
const gastosTramites = 'SELECT gastosTramites.idGasto, tramites.nombreTramite, gastosTramites.cantidad, gastosTramites.precio, gastosTramites.total FROM gastosTramites inner join tramites WHERE gastosTramites.idObra = ? and tramites.idTramites = gastosTramites.idTramite;'
const gastoMaquinaria = 'SELECT gastosmaquinaria.idGasto, maquinaria.nombreMaquinaria, gastosmaquinaria.cantidad, gastosmaquinaria.total FROM gastosmaquinaria inner join maquinaria WHERE gastosmaquinaria.idObra = ? and maquinaria.idMaquinaria = gastosmaquinaria.idMaquinaria'
const gastoAdicional = 'SELECT gastosadicionales.idGasto, adicionales.nombreAdicional, gastosadicionales.cantidad, gastosadicionales.total FROM gastosadicionales inner join adicionales WHERE gastosadicionales.idObra = ? and adicionales.idAdicionales = gastosadicionales.idAdicional'

export const getGastosMateriales = async (req, res) =>{
    try{
        const {id} = req.params
        const [rows] = await pool.query(gastosMateriales, id)
        res.json(rows)
    }catch(error){
        return res.status(500).json({
            message: 'Something goes wrong'
        })
    }
}

export const getGastosTramites = async (req, res) => {    
    try{
        const {id} = req.params
        const[rows] = await pool.query(gastosTramites,id)
        res.json(rows)
    }catch(error){
        return res.status(500).json({
            message:'Something goes wrong'
        })
    }
}

export const getGastosMaquinaria = async (req, res) => {    
    try{
        const {id} = req.params
        const[rows] = await pool.query(gastoMaquinaria,id)
        res.json(rows)
    }catch(error){
        return res.status(500).json({
            message:'Something goes wrong'
        })
    }
}

export const getGastosAdicionales = async (req, res) => {    
    try{
        const {id} = req.params
        const[rows] = await pool.query(gastoAdicional,id)
        res.json(rows)
    }catch(error){
        return res.status(500).json({
            message:'Something goes wrong'
        })
    }
}
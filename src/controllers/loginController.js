import {pool} from '../db.js'
import { encrypt, comparar } from '../helpers/encript.js'

//const query = 'SELECT cliente.idCliente, cliente.nombreCliente, cliente.apellidoPCliente, cliente.apellidoMCliente, cliente.correo, usuarioscliente.contraseña, usuarioscliente.estadoUsuario, obra.idObra FROM cliente INNER JOIN usuarioscliente INNER JOIN obra WHERE cliente.correo = ? and cliente.idCliente = usuarioscliente.idCliente and obra.idCliente = cliente.idCliente'
const query = 'SELECT cliente.idCliente, cliente.nombreCliente, cliente.apellidoPCliente, cliente.apellidoMCliente, cliente.correo, usuarioscliente.contrasenia, usuarioscliente.estadoUsuario, COUNT(obra.idObra) OVER(PARTITION BY cliente.idCliente) AS numeroobras FROM cliente INNER JOIN usuarioscliente INNER JOIN obra WHERE cliente.correo = ? and cliente.idCliente = usuarioscliente.idCliente and obra.idCliente = cliente.idCliente limit 1'
const query2 = 'SELECT cliente.idCliente, cliente.nombreCliente, cliente.apellidoPCliente, cliente.apellidoMCliente, cliente.correo, cliente.telefono, usuarioscliente.contraseña, usuarioscliente.estadoUsuario FROM cliente INNER JOIN usuarioscliente WHERE cliente.correo = ? and cliente.telefono = ? and cliente.idCliente = usuarioscliente.idCliente;'
const query3 = 'UPDATE usuarioscliente SET usuarioscliente.contrasenia = ? where usuarioscliente.idCliente = ?'

export const login = async (req, res) => {
    const {correo, contrasenia} = req.body
    const values = [correo, contrasenia]
    const [rows] = await pool.query(query, values);
    if(rows[0].numeroobras === 0){
        return res.status(404).json({
            message: 'Cliente no encontrado'
        })
    }
    const compass = rows[0].contrasenia
    const checkPassword = await comparar(contrasenia, compass)
    if(checkPassword){
        return res.json(rows[0]);
    }else if(!checkPassword){
        return res.status(404).json({
            message: 'Contraseña incorrecta'
        })
    }
}

export const cambio = async (req, res) => {
    try{
        const {id} = req.params
        const {antiguaContraseña, nuevaContraseña} = req.body

        const [row] = await pool.query('SELECT usuarioscliente.contrasenia from usuarioscliente WHERE idCliente = ?', [id])
        if(row.length <= 0){
            return res.status(404).json({
                message: 'Something wrogs'
            })
        }

        const checkPassword = await comparar(antiguaContraseña, row[0].contrasenia)

        if(checkPassword){
            const passwordHash = await encrypt(nuevaContraseña)
            const [result] = await pool.query('UPDATE usuarioscliente SET contrasenia = ? WHERE idCliente = ?', [passwordHash, id])
            if(result.affectedRows === 0) {return res.status(404).json({
                message: 'No hubo cambios'
            })}else{
                const [rows] = await pool.query('SELECT * FROM usuarioscliente WHERE idCliente = ?', [id])
                console.log(rows)
                return res.json(rows[0])
            }
        }else if(!checkPassword){
            return res.status(404).json({
                message: 'Contraseña incorrecta'
            })
        }
    }catch(error){
        return res.status(500).json({
            message: 'Something goes wrong'
        })
    } 
}

export const cambioOlvi = async (req, res) => {
    try{
        const {user_email, telefono} = req.body
        const values = [user_email, telefono]

        const [rows] = await pool.query(query2, values)

        if(rows.length <= 0){
            return res.status(404).json({
                message: 'Datos incorrectos'
            })
        }else{
            const passwordHash = await encrypt('12345678')
            const [rows2] = await pool.query(query3, [passwordHash, rows[0].idCliente])
            if(rows2.affectedRows === 0){
                return res.status(404).json({
                    message: 'No hubo cambios'
                })
            }
            return res.status(200).json({
                message: 'Cambio realizado'
            })
        }
    }catch(error){
        return res.status(500).json({
            message: 'Something goes wrong'
        })
    }
}

export const cambioB = async (req, res) => {
    try{
        const {id} = req.params
        const {antiguaContraseña, nuevaContraseña} = req.body

        const [row] = await pool.query('SELECT usuarioscliente.contrasenia from usuarioscliente WHERE idCliente = ?', [id])
        //console.log(row);
        if(row.length <= 0){
            return res.status(404).json({
                message: 'Something wrogs'
            })
        }

            const passwordHash = await encrypt(nuevaContraseña)
            const [result] = await pool.query('UPDATE usuarioscliente SET contrasenia = ? WHERE idCliente = ?', [passwordHash, id])
            //console.log(nuevaContraseña)
            if(result.affectedRows === 0) {return res.status(404).json({
                message: 'No hubo cambios'
            })}else{
                const [rows] = await pool.query('SELECT * FROM usuarioscliente WHERE idCliente = ?', [id])
                console.log(rows)
                return res.json(rows[0])
            }
    }catch(error){
        return res.status(500).json({
            message: 'Something goes wrong'
        })
    } 
}
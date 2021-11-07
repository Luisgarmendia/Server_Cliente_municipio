import db from '../database/connection.js';
import Cliente from '../Models/Cliente.model.js';

/* base de datos
*CREATE TABLE `clientes` (
*  `Id` int(11) NOT NULL,
*  `Nombre` varchar(50) NOT NULL,
*  `Apellido` varchar(50) NOT NULL,
*  `Direccion` varchar(255) DEFAULT NULL,
*  `CodMunicipio` int(11) DEFAULT NULL,
*  `Telefono` varchar(15) DEFAULT NULL,
*  `Estado` tinyint(1) NOT NULL DEFAULT 1
* ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
*
**/
/**
 * @param {Request} req 
 * @param {Response} res 
 * @returns 
 */
function getAll(req, res) {
    let sql = 'SELECT *  FROM clientes inner join municipios on municipios.CodMun=clientes.CodMunicipio';
    let sqlMunicipio = 'SELECT *  FROM municipios';
    db.query(sql, (err, rows) => {
        if (err) return res.status(500).send(err);
        var List = rows.map(row =>  new Cliente(row));
        db.query(sqlMunicipio, (err, rows) => {
            if (err) return res.status(500).send(err);
            if(req.body.error) return res.render('cliente', { clientes:List, municipios: rows, error: req.body.error });
            if(req.body.success) return res.render('cliente', { clientes:List, municipios: rows, success: req.body.success });
            res.render('cliente', { clientes: List,municipios: rows });
        });
    });
}
/**
 * @param {Request} req 
 * @param {Response} res 
 * @returns 
 */
function getById(req, res) {
    try {
        const { Id } = req.params;
        if (!Id) return res.status(400).send({ error: 'Id is required' });
        let sql = 'SELECT * FROM clientes WHERE Id = ?';
        db.query(sql, [Id], (err, rows) => {
            if (err) return res.status(500).send(err);
            res.send(new Cliente(rows[0]));
        });    
    } catch (error) {
        res.status(500).send(error);
    }
}
/**
 * @param {Request} req 
 * @param {Response} res 
 * @returns 
 */
function Create(req, res) {
    try {
        const cliente = new Cliente(req.body);
        if (cliente.validar().length>0) {
            req.body.error = cliente.validar();
            return getAll(req, res);
        }
        let sql = 'INSERT INTO clientes (Nombre, Apellido, Direccion, CodMunicipio, Telefono) VALUES (?, ?, ?, ?, ?)';
        db.query(sql,cliente.create(), (err, rows) => {
            if (err){
                req.body.error = err;
                return getAll(req, res);
            }            
            req.body.success = 'creo el cliente';
            return getAll(req, res);
        });
    } catch (error) {
        res.status(500).send(error);
    }
}
/**
 * @param {Request} req 
 * @param {Response} res 
 * @returns 
 */
function Update(req, res) {
    try {
        const { Id } = req.params;
        req.body.Id = Id;
        const cliente = new Cliente(req.body);
        if (cliente.validar().length>0) {
            req.body.error = cliente.validar();
            return getAll(req, res);
        }
        let sql = 'UPDATE clientes SET Nombre = ?, Apellido = ?, Direccion = ?, CodMunicipio = ?, Telefono = ?,Estado = ? WHERE Id = ?';
        db.query(sql, cliente.update(), (err, rows) => {
            if (err){
                req.body.error = err;
                return getAll(req, res);
            }
            req.body.success = 'Acualizo';
            return getAll(req, res);
        });
    } catch (error) {
        res.status(500).send(error);
    }
}
/**
 * @param {Request} req 
 * @param {Response} res 
 * @returns 
 */
function ChangeStatus(req, res) {
    try {
        const { Id } = req.params;
        const { Estado } = req.query;
        console.log(Id, Estado);
        if (!Estado) {
            req.body.error = 'Estado es requerido';
            return getAll(req, res);
        }
        let sql = 'UPDATE clientes SET Estado = ? WHERE Id = ?';
        db.query(sql, [Estado==1?0:1, Id], (err, rows) => {
            if (err){
                req.body.error = err;
                return getAll(req, res);
            }
            req.body.success = 'Cambio el estado';
            return getAll(req, res);
        });
    } catch (error) {
        res.status(500).send(error);
    }
}



export default {
    getAll,
    getById,
    Create,
    Update,
    ChangeStatus,
}
import db from '../database/connection.js';
import Municipio from '../Models/municipio.model.js';
/*
*CREATE TABLE `municipios` (
*  `CodMun` int(11) NOT NULL,
*  `Municipio` varchar(50) DEFAULT NULL,
*  `Cabecera` varchar(50) NOT NULL,
*  `Longitud` int(11) NOT NULL,
*  `Latitud` int(11) NOT NULL
*) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
*/

/**
 * @param {Request} req 
 * @param {Response} res 
 * @returns 
 */
function GetAll(req, res) {
    try {
        let sql = "SELECT * FROM municipios";
    db.query(sql, (err, result) => {
        if (err) res.status(500).send(err);
        if(req.body.error) return res.render('municipio', { municipios: result, error: req.body.error  });  
        if(req.body.success) return res.render('municipio', { municipios: result, success: req.body.success   });  
        res.render('municipio', { municipios: result });        
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
function GetById(req, res) {
    try {
        const { id } = req.params;
        if (!id) return res.status(400).send({ error: 'Id is required' });
        let sql = "SELECT * FROM municipios WHERE CodMun = ?";
        db.query(sql,[id], (err, result) => {
            if (err) res.status(500).send(err);
            res.send(new Municipio(result[0]));
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
        const municipio = new Municipio(req.body);
        if (municipio.validar().length > 0){
            req.body.error = municipio.validar();
            return GetAll(req, res);
        }
        let sql = "INSERT INTO municipios (Municipio, Cabecera, Longitud, Latitud) VALUES (?,?,?,?)";
        db.query(sql,municipio.create(), (err, result) => {
            console.log(result);
            if (err){
                req.body.error = err;
                return GetAll(req, res);
            }
            req.body.success = 'Municipio created successfully';
            return GetAll(req, res);
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
        const { id } = req.params;
        req.body.CodMun = id;
        const municipio = new Municipio(req.body);
        console.log(municipio);
        if (municipio.validar().length > 0){
            req.body.error = municipio.validar();
            return GetAll(req, res);
        }    
        let sql = "UPDATE municipios SET Municipio = ?, Cabecera = ?, Longitud = ?, Latitud = ? WHERE CodMun = ?";
        db.query(sql,municipio.update(), (err, result) => {
            console.log(err);
            if (err) {
                req.body.error = err;
                console.log(err);
                return GetAll(req, res);
            }
            req.body.success = 'Municipio updated successfully';
            return GetAll(req, res);

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
function Remove(req, res) {
    try {
        const { id } = req.params;
        if (!id) return res.status(400).send({ error: 'Id is required' });
        let sql = "DELETE FROM municipios WHERE CodMun = ?";
        db.query(sql,[id], (err, result) => {
            if (err) {
                req.body.error = err;
                return GetAll(req, res);
            }
            req.body.success = 'Municipio deleted successfully';
            return GetAll(req, res);
        });
    } catch (error) {
        res.status(500).send(error);
    }
}

export default  {
    GetAll,
    GetById,
    Create,
    Update,
    Remove,
};
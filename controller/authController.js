import bcryptjs from 'bcryptjs';
import { promisify } from 'util'
import connection from '../database/connection.js';
import jwt from 'jsonwebtoken';

var session;

export const register = async (req, res) => {
    const { fullname, username, password } = req.body;
    /* ---------------------------- cifrar contraseña --------------------------- */
    const hash = await bcryptjs.hashSync(password,8);
    /* ------------------------------ parsear data ------------------------------ */
    const data = {
        fullname,
        username,
        password: hash
    }
    connection.query('INSERT INTO users SET ?',data, (err, results) => {
        if(err) {
            return res.status(400).json({
                error: 'Error al registrar usuario'
            })
        }
        return res.redirect('/');
    })
    console.log(req.body);
};


export const login = (req, res) => {
    const { username, password } = req.body;
    
    if(!username || !password) {
        return res.redirect('/login');
    }

    connection.query('SELECT * FROM users WHERE username = ?', username, (err, results) => {
        if(err) {
            return res.status(400).json({
                error: 'Error al loguearse'
            })
        }
        if(!results.length) {
            return res.status(400).json({
                error: 'Usuario no existe'
            })
        }
        const user = results[0];
        if(!bcryptjs.compareSync(password, user.password)) {
            return res.status(400).json({
                error: 'Contraseña incorrecta'
            })
        }
        //crear sesion con express-session
        const { id } = user;
        const token = jwt.sign({ id }, process.env.JWT_SECRET);
        // guardar en la sesion el token generado
        session = req.session
        session.token = token
        // res.cookie('token', token, {
        //     maxAge: 1000 * 60 * 60,
        //     httpOnly: true
        // });
        return res.redirect('/');
    })
};

export const isAuthenticated = async (req, res, next) => {
    if (req.session.token) {
        // validar que el token le pertenezca al usuario
        const verifyPromise = await promisify(jwt.verify)
        const decoded = await verifyPromise(req.session.token, process.env.JWT_SECRET)
        // decoded: {id: <id del user en base de datos>}
        const userID = decoded.id
        // consultar en la base de datos si el usuario que se decodificó del token, existe
        connection.query('SELECT * FROM users WHERE id = ?', [userID], (err, result) => {
            if (err) {
                return res.redirect('/login')
            }
            if (result.length === 0) {
                return res.redirect('/login')
            }
            // el usuario existe
            session = req.session
            session.user = result[0]
            next()
        })
    }
    else {
        // el token no exite, por tanto, no se ha iniciado sesion
        return res.redirect('/login')
    }
}


// creando un meddleware para verificar si el usuario esta logueado
export const logger = (req, res, next) => {
    console.log(req.path, req.method);
    next();
}   

export const logout = (req, res) => {
    req.session.destroy()
    res.redirect('/login')
}


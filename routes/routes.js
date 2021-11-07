///crear archivo de rutas para el controlador 
import { Router } from 'express';

import {register ,login ,isAuthenticated, logout} from '../controller/authController.js';
const router = Router();

router.get('/',isAuthenticated, (req, res) => {
    res.render('index',{
        name: req.session.user.fullname
    });    
});
router.get('/login', (req, res) => 
    {
        res.render('login');
    }
);
router.get('/contact', (req, res) => 
    res.render('contact')
);
router.get('/register', (req, res) => 
    res.render('register')
);

/* --------------------- // controlador de crear cuenta --------------------- */
router.post('/register', register);
router.post('/login', login);
router.get('/logout', logout);

///exportar rutas
export default router;
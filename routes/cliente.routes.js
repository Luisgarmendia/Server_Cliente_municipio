import {Router} from 'express';
import controller from '../controller/cliente.controller.js';

/// crud a tabla clientes 
const router = Router();
router.get('/', controller.getAll);
router.get('/:Id', controller.getById);
router.post('/',controller.Create);
router.post('/update/:Id',controller.Update);
router.post('/delete/:Id',controller.ChangeStatus);
export default router;
import { Router } from "express";   // Importa o módulo de roteamento do express
import controller from "../controller/municipio.controller.js";


const router = Router();
// Rota para listar todos os municipios
router.get('/', controller.GetAll);
/// crud de municipio
router.get('/:id',controller.GetById);

router.post('/', controller.Create);

router.post('/update/:id', controller.Update);

router.post('/delete/:id',  controller.Remove);

export default router;

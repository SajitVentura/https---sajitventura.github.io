// index.routes.js
import { Router } from 'express';
import { agregarpersonajeAlCarrito, mostrarCarrito, showCatalogo,Tokenauth} from '../controllers/users.controllers.js';

const router = Router();

router.get('/catalogo',Tokenauth, showCatalogo);
router.get('/carrito', mostrarCarrito);

// Ruta para agregar al carrito
router.post('/agregar-al-carrito', agregarpersonajeAlCarrito);

export default router;

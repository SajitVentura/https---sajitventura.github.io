import { Router } from "express";

const router = Router();

router.get("/",(req, res)=>{  
    res.render('inicio', {titulo: 'Aplicación web con express y HBS'})  
});

export default router; 
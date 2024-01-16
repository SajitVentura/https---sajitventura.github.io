// users.routes.js

import { Router } from "express";
import { getAllUsers, login, registerUser,deleteUser, recoverPassword, updatePassword,Tokenauth, updatePasswordByAdmin, updateUByAdmin, updateUserDataByAdmin } from "../controllers/users.controllers.js";

const router = Router();

router.get("/users",Tokenauth, getAllUsers);
router.post("/login",login);
router.post("/register", registerUser);
router.get("/register", (req, res) => {
    // Renderizar la vista del formulario de registro
    res.render("register", { titulo: "Registro de Usuario" });
});
router.get("/personajes", (req, res) => {
    // Renderizar la vista del formulario de registro
    res.render("personajes", { titulo: "Personajes de Marvel" });
});

router.get("/inicio", (req, res) => {
    // Renderizar la vista del formulario de registro
    res.render("inicio", { titulo: "Pagina inicio de Marvel" });
});

router.get("/index", (req, res) => {
    // Renderizar la vista del formulario de registro
    res.render("index", { titulo: "ingresar de Marvel" });
});


router.post("/delete-user",Tokenauth,deleteUser);  // Nueva ruta para eliminar usuarios
router.post("/update-user-by-admin",Tokenauth,updateUByAdmin); 
router.get("/recover-password", recoverPassword);  // Nueva ruta para recuperar contraseña
router.post("/update-password-admin",Tokenauth,updateUserDataByAdmin);  // Nueva ruta para recuperar contraseña
router.post("/update-password", updatePassword);
export default router;


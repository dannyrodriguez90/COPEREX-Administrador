import { Router } from "express";
import { crearEmpresa, actualizarEmpresa, eliminarEmpresaPorId, obtenerEmpresas, generarExcelEmpresa } from "./empresa.controller.js";
import { validarJWT } from "../middlewares/validar-jwt.js";
import { crearEmpresaValidator, actualizarEmpresaValidator, eliminarEmpresaValidator } from "../middlewares/empresa-validator.js";

const router = Router();

router.post("/crearEmpresa/", [validarJWT, crearEmpresaValidator], crearEmpresa);
router.put("/actualizarEmpresa/:id", [validarJWT, actualizarEmpresaValidator], actualizarEmpresa);
router.delete("/eliminarEmpresa/:id", [validarJWT, eliminarEmpresaValidator], eliminarEmpresaPorId);
router.get("/", obtenerEmpresas);
router.get("/generarExcel/:id", [validarJWT], generarExcelEmpresa);

export default router;
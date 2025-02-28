import { Router } from "express";
import { crearEmpresa, actualizarEmpresa, eliminarEmpresaPorId, obtenerEmpresas, generarExcelEmpresa } from "./empresa.controller.js";
import { validarJWT } from "../middlewares/validar-jwt.js";
import { crearEmpresaValidator, actualizarEmpresaValidator, eliminarEmpresaValidator } from "../middlewares/empresa-validator.js";

const router = Router();

/**
 * @swagger
 * /coperex/v1/empresas/crearEmpresa:
 *   post:
 *     summary: Crear una nueva empresa
 *     tags: [Empresa]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *               nivelImpacto:
 *                 type: string
 *               fechaCreacion:
 *                 type: string
 *                 format: date
 *               categoria:
 *                 type: string
 *               email:
 *                 type: string
 *               phone:
 *                 type: string
 *               direccion:
 *                 type: string
 *     responses:
 *       201:
 *         description: Empresa creada exitosamente
 *       400:
 *         description: Error en la solicitud
 *       500:
 *         description: Error del servidor
 */
router.post("/crearEmpresa/", [validarJWT, crearEmpresaValidator], crearEmpresa);

/**
 * @swagger
 * /coperex/v1/empresas/actualizarEmpresa/{id}:
 *   put:
 *     summary: Actualizar una empresa existente
 *     tags: [Empresa]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID de la empresa
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *               nivelImpacto:
 *                 type: string
 *               fechaCreacion:
 *                 type: string
 *                 format: date
 *               categoria:
 *                 type: string
 *               email:
 *                 type: string
 *               phone:
 *                 type: string
 *               direccion:
 *                 type: string
 *     responses:
 *       200:
 *         description: Empresa actualizada exitosamente
 *       400:
 *         description: Error en la solicitud
 *       404:
 *         description: Empresa no encontrada
 *       500:
 *         description: Error del servidor
 */
router.put("/actualizarEmpresa/:id", [validarJWT, actualizarEmpresaValidator], actualizarEmpresa);

/**
 * @swagger
 * /coperex/v1/empresas/eliminarEmpresa/{id}:
 *   delete:
 *     summary: Eliminar una empresa por ID
 *     tags: [Empresa]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID de la empresa
 *     responses:
 *       200:
 *         description: Empresa eliminada exitosamente
 *       404:
 *         description: Empresa no encontrada
 *       500:
 *         description: Error del servidor
 */
router.delete("/eliminarEmpresa/:id", [validarJWT, eliminarEmpresaValidator], eliminarEmpresaPorId);

/**
 * @swagger
 * /coperex/v1/empresas:
 *   get:
 *     summary: Obtener una lista de empresas
 *     tags: [Empresa]
 *     parameters:
 *       - in: query
 *         name: categoria
 *         schema:
 *           type: string
 *         description: Filtrar por categoría
 *       - in: query
 *         name: añosTrayectoria
 *         schema:
 *           type: integer
 *         description: Filtrar por años de trayectoria
 *       - in: query
 *         name: sort
 *         schema:
 *           type: string
 *         description: Ordenar por campo (e.g., nombre:asc, nombre:desc)
 *     responses:
 *       200:
 *         description: Lista de empresas obtenida exitosamente
 *       500:
 *         description: Error del servidor
 */
router.get("/", obtenerEmpresas);

/**
 * @swagger
 * /coperex/v1/empresas/generarExcel/{id}:
 *   get:
 *     summary: Generar un archivo Excel para una empresa
 *     tags: [Empresa]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID de la empresa
 *     responses:
 *       200:
 *         description: Archivo Excel generado exitosamente
 *       404:
 *         description: Empresa no encontrada
 *       500:
 *         description: Error del servidor
 */
router.get("/generarExcel/:id", [validarJWT], generarExcelEmpresa);

export default router;
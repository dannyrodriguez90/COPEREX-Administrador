import { body, param } from "express-validator";
import { validarCampos } from "./validate-campos.js";
import { handleErrors } from "./haddle-error.js";

export const crearEmpresaValidator = [
    body("nombre").notEmpty().withMessage("El nombre es obligatorio"),
    body("nivelImpacto").notEmpty().withMessage("El nivel de impacto es obligatorio"),
    body("fechaCreacion").notEmpty().withMessage("La fecha de creación es obligatoria").isDate().withMessage("La fecha de creación debe ser una fecha válida"),
    body("categoria").notEmpty().withMessage("La categoría es obligatoria"),
    body("email").notEmpty().withMessage("El correo electrónico es requerido").isEmail().withMessage("No es un correo electrónico válido"),
    body("phone").notEmpty().withMessage("El teléfono es requerido").isLength({ min: 8, max: 8 }).withMessage("El teléfono debe tener 8 caracteres"),
    validarCampos,
    handleErrors
];

export const actualizarEmpresaValidator = [
    param("id").isMongoId().withMessage("No es un ID válido"),
    body("nombre").optional().notEmpty().withMessage("El nombre es obligatorio"),
    body("nivelImpacto").optional().notEmpty().withMessage("El nivel de impacto es obligatorio"),
    body("fechaCreacion").optional().notEmpty().withMessage("La fecha de creación es obligatoria").isDate().withMessage("La fecha de creación debe ser una fecha válida"),
    body("categoria").optional().notEmpty().withMessage("La categoría es obligatoria"),
    body("email").optional().notEmpty().withMessage("El correo electrónico es requerido").isEmail().withMessage("No es un correo electrónico válido"),
    body("phone").optional().notEmpty().withMessage("El teléfono es requerido").isLength({ min: 8, max: 8 }).withMessage("El teléfono debe tener 8 caracteres"),
    validarCampos,
    handleErrors
];

export const eliminarEmpresaValidator = [
    param("id").isMongoId().withMessage("No es un ID válido"),
    validarCampos,
    handleErrors
];
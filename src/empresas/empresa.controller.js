import Empresa from './empresa.model.js';
import ExcelJS from 'exceljs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const crearEmpresa = async (req, res) => {
    try {
        const data = req.body;
        const nuevaEmpresa = new Empresa(data);
        await nuevaEmpresa.save();

        res.status(201).json({
            success: true,
            empresa: nuevaEmpresa
        });
    } catch (err) {
        if (err.code === 11000) {
            return res.status(400).json({
                success: false,
                message: "Error al crear la empresa",
                error: "El correo electrónico ya está en uso"
            });
        }
        res.status(500).json({
            success: false,
            message: "Error al crear la empresa",
            error: err.message
        });
    }
};

export const obtenerEmpresas = async (req, res) => {
    try {
        const { categoria, añosTrayectoria, sort } = req.query;
        let query = {};
        let sortOptions = {};

        if (categoria) {
            query.categoria = categoria;
        }

        if (añosTrayectoria) {
            const currentYear = new Date().getFullYear();
            const minYear = currentYear - parseInt(añosTrayectoria);
            query.fechaCreacion = { $lte: new Date(`${minYear}-01-01`) };
        }

        if (sort) {
            const [field, order] = sort.split(':');
            if (field === 'nombre') {
                sortOptions['nombre'] = order === 'desc' ? -1 : 1;
            } else {
                sortOptions[field] = order === 'desc' ? -1 : 1;
            }
        }

        const empresas = await Empresa.find(query).sort(sortOptions);

        res.status(200).json({
            success: true,
            empresas
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error al obtener las empresas",
            error: error.message
        });
    }
};

export const actualizarEmpresa = async (req, res) => {
    try {
        const data = req.body;
        const empresa = await Empresa.findById(req.params.id);

        if (!empresa) {
            return res.status(404).json({
                success: false,
                message: 'Empresa no encontrada'
            });
        }
        const updatedEmpresa = await Empresa.findByIdAndUpdate(req.params.id, data, { new: true });

        res.status(200).json({
            success: true,
            empresa: updatedEmpresa
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: "Error al actualizar la empresa",
            error: error.message
        });
    }
};

export const eliminarEmpresaPorId = async (req, res) => {
    try {
        const empresa = await Empresa.findByIdAndDelete(req.params.id);

        if (!empresa) {
            return res.status(404).json({
                success: false,
                message: 'Empresa no encontrada'
            });
        }
        res.status(200).json({
            success: true,
            message: 'Empresa eliminada'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error al eliminar la empresa",
            error: error.message
        });
    }
};

export const generarExcelEmpresa = async (req, res) => {
    try {
        const empresa = await Empresa.findById(req.params.id);

        if (!empresa) {
            return res.status(404).json({
                success: false,
                message: 'Empresa no encontrada'
            });
        }

        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet('Empresa');

        worksheet.columns = [
            { header: 'Nombre', key: 'nombre', width: 30 },
            { header: 'Nivel de Impacto', key: 'nivelImpacto', width: 20 },
            { header: 'Fecha de Creación', key: 'fechaCreacion', width: 20 },
            { header: 'Categoría', key: 'categoria', width: 20 },
            { header: 'Correo Electrónico', key: 'email', width: 30 },
            { header: 'Teléfono', key: 'phone', width: 15 },
            { header: 'Dirección', key: 'direccion', width: 30 }
        ];

        worksheet.addRow({
            nombre: empresa.nombre,
            nivelImpacto: empresa.nivelImpacto,
            fechaCreacion: empresa.fechaCreacion.toISOString().split('T')[0],
            categoria: empresa.categoria,
            email: empresa.email,
            phone: empresa.phone,
            direccion: empresa.direccion
        });

        const filePath = join(__dirname, '../../reportes', `empresa_${empresa._id}.xlsx`);
        await workbook.xlsx.writeFile(filePath);

        res.status(200).json({
            success: true,
            message: 'Archivo Excel generado exitosamente',
            filePath: `/reportes/empresa_${empresa._id}.xlsx`
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error al generar el archivo Excel",
            error: error.message
        });
    }
};
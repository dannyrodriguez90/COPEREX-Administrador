import { Schema, model } from "mongoose";
 
const empresaSchema = new Schema({
    nombre: {
        type: String,
        required: [true, "El nombre es obligatorio"],
    },
    nivelImpacto: {
        type: String,
        required: [true, "El nivel de impacto es obligatorio"],
    },
    fechaCreacion: {
        type: Date,
        required: [true, "La fecha de creación es obligatoria"]
    },
    categoria: {
        type: String,
        required: [true, "La categoría es obligatoria"],
    },
    email: {
        type: String,
        required: [true, "El correo electrónico es requerido"],
        unique: true,
    },
    phone: {
        type: String,
        minLength: 8,
        maxLength: 8,
        required: true
    },
    direccion: {
        type: String,
    }
}, {
    versionKey: false,
    timestamps: true
});
 
empresaSchema.virtual('añosTrayectoria').get(function() {
    const currentYear = new Date().getFullYear();
    const creationYear = this.fechaCreacion.getFullYear();
    return currentYear - creationYear;
});
 
empresaSchema.methods.toJSON = function () {
    const { _id, ...empresa } = this.toObject();
    empresa.uid = _id;
    return empresa;
};
 
export default model("Empresa", empresaSchema);
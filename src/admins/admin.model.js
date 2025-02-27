import { Schema, model} from "mongoose";

const adminSchema = new Schema({
    name: {
        type: String,
        required: [true, "El nombre es requerido"],
        maxLength: [25, "Name cannot exceed 25 characters"]
    },
    surname: {
        type: String,
        required: [true, "El surname es requerido"],
        maxLength: [25, "Surname cannot exceed 25 characters"]
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: [true, "Email es requerido"],
        unique: true
    },
    password: {
        type: String,
        required: [true, "Password es requerido"]
    },
    profilePicture: {
        type: String
    },
    phone: {
        type: String,
        minLength: 8,
        maxLength: 8,
        required: true
    },
    role: {
        type: String,
        required: true,
        enum: ["ADMIN_ROLE"],
        default: "ADMIN_ROLE"
    },
    status: {
        type: Boolean,
        default: true
    }
}, {
    versionKey: false,
    timestamps: true 
});


adminSchema.methods.toJSON = function () {
    const { password, _id, ...admin } = this.toObject();
    admin.uid = _id;
    return admin;
}


export default model("Admin", adminSchema);
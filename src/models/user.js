import { Schema, model } from "mongoose";

const userSchema = new Schema({
  Nombre: {
    type: String,
  },
  Apellido: {
    type: String,
  },
  Edad: {
    type: Number,
  },
  Oficio:{
    type: Schema.Types.ObjectId,
    ref: "Oficio", 
  },
  Activo: {
    type: Boolean,
    default: true
  },
});

const User = model("User", userSchema);

export default User;

import { Schema, model } from "mongoose";

const oficioSchema = new Schema({
  Nombre: {
    type: String,
  },
  Sector: {
    type: String,
  },
  Descripcion:{
    type: String,
  },
  Activo: {
    type: Boolean,
    default: true
  },
});

const Oficio = model("Oficio", oficioSchema);

export default Oficio;

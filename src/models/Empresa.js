
import { Schema, model } from 'mongoose';

const empresa = new Schema({
  Nombre: {
    type: String,
    required: true
  },
  Direccion: {
    type: String,
    required: true
  },
  Giro: {
    type: String,
    required: true
  },
  NumeroEmpleados: {
    type: Number,
    default: 0
  },
  FechaCreacion: {
    type: Date,
    default: Date.now
  }
});

const Empresa = model('empresa', empresa);

export default Empresa;
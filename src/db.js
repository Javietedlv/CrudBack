
  import { connect } from 'mongoose';

const connectDB = async () => {
  try {
    await connect('mongodb://127.0.0.1:27017/', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Conexión exitosa a la base de datos');
  } catch (error) {
    console.error('Error al conectar a la base de datos:', error);
  }
};

export default connectDB;

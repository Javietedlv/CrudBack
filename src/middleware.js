import cors from 'cors';

const corsOptions = {
  origin: 'http://localhost:3001', //URL de frontend
};

const corsMiddleware = cors(corsOptions);

export default corsMiddleware;
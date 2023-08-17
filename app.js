import dotenv from 'dotenv';
import express from 'express';
import notFound from './middleware/not-found.js';
import errorHandleMiddleware from './middleware/error-handler.js';
import connectDB from './db/connect.js';
import routerProducts from './routes/products.js';

const app = express();
dotenv.config();
const port = process.env.PORT || 4000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) =>
    res.send('<h1>StoreApi</h1><a href="/api/v1/products">products route</a>')
);

app.use('/api/v1/products', routerProducts);
app.use(notFound);
app.use(errorHandleMiddleware);

const start = async () => {
    try {
        await connectDB(process.env.MONGODB_URI);
        app.listen(port, () => console.log(`listen on port ${port}`));
    } catch (error) {
        console.log(error);
    }
};
start();

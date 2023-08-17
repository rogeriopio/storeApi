import dotenv from 'dotenv';
import connectDB from './db/connect.js';
import jsonProducts from './products.json' assert { type: 'json' };
import Product from './models/Product.js';

dotenv.config();

const start = async () => {
    try {
        await connectDB(process.env.MONGODB_URI);
        await Product.deleteMany();
        await Product.create(jsonProducts);
        console.log('Products have been created');
        process.exit(0);
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
};
start();

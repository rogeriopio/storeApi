import express from 'express';
import getAllProducts from '../controllers/product.js';

const routerProducts = express.Router();

routerProducts.route('/').get(getAllProducts);

export default routerProducts;

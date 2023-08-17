import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'product name must be provided'],
        trim: true,
        maxlength: [20, 'name cannot be more than 20 characthers'],
    },
    price: { type: Number, required: [true, 'product price must be provided'] },
    featured: { type: Boolean, default: false },
    rating: { type: Number, default: 4.5 },
    createdAt: { type: Date, default: Date.now() },
    company: {
        type: String,
        enum: {
            values: ['ikea', 'liddy', 'caressa', 'marcos'],
            message: '{VALUE} is not supported',
        },
    },
});
const Product = mongoose.model('Product', ProductSchema);
export default Product;

import mongoose from 'mongoose';

const connectDB = async (MONGO_URI) => {
    try {
        await mongoose.connect(MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Connection with MongoDB established');
    } catch (error) {
        console.log(`Error connecting to mongoDB ${error}`);
    }
};

export default connectDB;

import mongoose from 'mongoose';

let connected = false;

const connectDb = async () => {
    mongoose.set('strictQuery', true)

    //if the db connection is already created do not try to connect again
    if (connected) {
        console.log("MongoDB is already connected...")
        return;
    }
    try {
        await mongoose.connect(process.env.MONGODB_URI)
        connected = true;
        console.log('MongoDB connected...')

    } catch (error) {
        console.log(error)
    }
};

export default connectDb;
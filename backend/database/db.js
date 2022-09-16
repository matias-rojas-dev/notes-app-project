const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.DATABASE, {
            useNewUrlParser: true,
            useUnifiedTopology: true, 
            useFindAndModify: false,
            useCreateIndex: true
        })
        console.log("DB CONNECTED")
    } catch (error) {
        console.log("DB CONNECTION ERROR", error);
        process.exit(1); // free the process
    }
}   

module.exports = connectDB;
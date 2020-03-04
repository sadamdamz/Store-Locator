const mongoose = require('mongoose');

const connectDb = async () => {
    try{
        const con = await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useCreateIndex: true,
            useFindAndModify: false,
            useUnifiedTopology: true
        });
        console.log(`mongoose connected ${con.connection.host}`)
    }
    catch(error){
        console.log(error);
        process.exit(1);
    }
    
}

module.exports = connectDb;
const mongoose = require("mongoose");

const connectDb = () => {
    mongoose.connect(process.env.DB_LOCAL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
}

module.exports = connectDb
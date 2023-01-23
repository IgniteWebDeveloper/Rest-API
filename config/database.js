//require mongoose
const mongoose = require('mongoose');
const { ServerApiVersion } = require('mongodb');

exports.connectDatabase = () => {
    mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 })
    .then(() => console.log('Database connection successful'))
    .catch((err) => {
            console.log('Database connection error');
            console.log(err);
        }
    )
}
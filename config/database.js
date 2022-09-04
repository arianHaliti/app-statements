const mongoose = require('mongoose');
const databaseConnection = async () => {
  try {
    mongoose.connect(process.env.CONNECTION_STRING_ATLAS, {useNewUrlParser: true, useUnifiedTopology: true})
    .then((conn)=>{
      console.log(`Database connected on host: ${conn.connection.host}`);
    });

  } catch (err) {
    console.log(err.message);
  }
}
module.exports = databaseConnection;
const mongoose = require("mongoose");
const logger = require("../logger");

const connectDB = async () => {
  try {
    const connect = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("mongoDB connected: " + connect.connection.host);
    logger.info("mongoDB connected: " + connect.connection.host);
  } catch (err) {
    console.log("Error: " + err.message);
    process.exit();
  }
};

module.exports = connectDB;

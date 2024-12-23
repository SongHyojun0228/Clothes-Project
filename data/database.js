const mongodb = require("mongodb");

const MongoClient = mongodb.MongoClient;

let database;

async function connect() {
  try {
    const client = await MongoClient.connect(
      "mongodb+srv://thdgywns2300:5w23otvzi7MsCLtT@clothes.7lk32.mongodb.net/?retryWrites=true&w=majority&appName=Clothes"
    );
    database = client.db("Denim");
    console.log("MongoDB Atlas 연결 성공");
  } catch (error) {
    console.error("MongoDB Atlas 연결 실패:", error);
    throw error;
  }
}

function getDb() {
  if (!database) {
    throw {
      message: "Database connection not eastablished!",
    };
  }
  return database;
}

module.exports = {
  connectToDatabase: connect,
  getDb: getDb,
};

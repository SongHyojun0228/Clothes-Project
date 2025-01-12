const db = require("../data/database");

class User {
  static async findByNickname(nickname) {
    return await db.getDb().collection("users").findOne({ nickname });
  }

  static async incrementVisit(nickname) {
    return await db.getDb().collection("users").updateOne(
      { nickname },
      { $inc: { visited: 1 } }
    );
  }
}

module.exports = User;

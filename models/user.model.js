const db = require("../data/database");
const bcrypt = require("bcrypt");

class User {
  constructor(email, password, name, nickname, date = null, visited = 0) {
    this.email = email;
    this.password = password;
    this.name = name;
    this.nickname = nickname;
    this.date = date || new Date().toISOString().split("T")[0];
    this.visited = visited;
  }

  async save() {
    this.password = await bcrypt.hash(this.password, 12);
    return await db.getDb().collection("users").insertOne(this);
  }

  static async findByEmail(email) {
    return await db.getDb().collection("users").findOne({ email });
  }

  static async findByNickname(nickname) {
    return await db.getDb().collection("users").findOne({ nickname });
  }

  static async incrementVisit(nickname) {
    return await db.getDb().collection("users").updateOne(
      { nickname },
      { $inc: { visited: 1 } }
    );
  }
  
  static async verifyPassword(enteredPassword, hashedPassword) {
    return await bcrypt.compare(enteredPassword, hashedPassword);
  }
}

module.exports = User;

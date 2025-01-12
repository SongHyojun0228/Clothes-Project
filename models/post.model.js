const db = require("../data/database");
const { ObjectId } = require("mongodb");

class Post {
  static async getAll() {
    return await db.getDb().collection("posts").find().sort({ date: -1 }).toArray();
  }

  static async getByKind(postKind) {
    return await db.getDb().collection("posts").find({ post_kind: postKind }).sort({ date: -1 }).toArray();
  }

  static async getById(postId) {
    return await db.getDb().collection("posts").findOne({ _id: new ObjectId(postId) });
  }

  static async incrementViews(postId) {
    return await db.getDb().collection("posts").updateOne(
      { _id: new ObjectId(postId) },
      { $inc: { views: 1 } }
    );
  }

  static async create(postData) {
    return await db.getDb().collection("posts").insertOne(postData);
  }
}

module.exports = Post;

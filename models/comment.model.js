const db = require("../data/database");
const { ObjectId } = require("mongodb");

class Comment {
  static async getByPostId(postId) {
    return await db
      .getDb()
      .collection("comments")
      .find({ postId: new ObjectId(postId) })
      .toArray();
  }

  static async create(commentData) {
    return await db
      .getDb()
      .collection("comments")
      .insertOne({
        ...commentData,
        postId: new ObjectId(commentData.postId),
      });
  }

  static async countByPostId(postId) {
    return await db
      .getDb()
      .collection("comments")
      .countDocuments({ postId: new ObjectId(postId) });
  }
}

module.exports = Comment;

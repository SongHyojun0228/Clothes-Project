const db = require("../data/database");
const { ObjectId } = require("mongodb");

class Post {
  static async getAll() {
    return await db
      .getDb()
      .collection("posts")
      .find()
      .sort({ date: -1 })
      .toArray();
  }

  static async countAll() {
    return await db.getDb().collection("posts").countDocuments();
  }

  static async getPaginated(page, perPage) {
    return await db
      .getDb()
      .collection("posts")
      .find()
      .sort({ date: -1 }) 
      .skip((page - 1) * perPage) 
      .limit(perPage)
      .toArray();
  }

  static async getByKind(postKind) {
    return await db
      .getDb()
      .collection("posts")
      .find({ post_kind: postKind })
      .sort({ date: -1 })
      .toArray();
  }

  static async getById(postId) {
    return await db
      .getDb()
      .collection("posts")
      .findOne({ _id: new ObjectId(postId) });
  }

  static async incrementViews(postId) {
    return await db
      .getDb()
      .collection("posts")
      .updateOne({ _id: new ObjectId(postId) }, { $inc: { views: 1 } });
  }

  static async create(postData) {
    return await db.getDb().collection("posts").insertOne(postData);
  }

  static async findByAuthor(author) {
    return await db
      .getDb()
      .collection("posts")
      .find({ author })
      .sort({ date: -1 })
      .toArray();
  }
  static async updateLikes(postId, userId) {
    const post = await db.getDb().collection("posts").findOne({ _id: new ObjectId(postId) });

    if (!post) return null;

    const hasLiked = post.likedUsers?.includes(userId);
    const update = hasLiked
      ? { $pull: { likedUsers: userId }, $inc: { likes: -1 } } 
      : { $addToSet: { likedUsers: userId }, $inc: { likes: 1 } };

    await db.getDb().collection("posts").updateOne({ _id: new ObjectId(postId) }, update);

    return { likes: post.likes + (hasLiked ? -1 : 1), liked: !hasLiked };
  }
}

module.exports = Post;

import { Schema, model, models } from 'mongoose';

// NOTE: The data validation should also be done with a tool like joy, or in the controller logic
const PostSchema = new Schema({
  creator: {
    type: Schema.Types.ObjectId,
    ref: 'User', // Create a one to many relation and populate post with creator data
  },
  prompt: {
    type: String,
    required: true,
  },
  tag: {
    type: String,
    required: true,
  },
});

// Check if a Post model already exists in the models collection. If not, create one using model():
const Post = models.Post || model('Post', PostSchema);

// Export the Post model as the default export:
export default Post;

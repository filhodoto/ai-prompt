import mongoose, { Schema, model, models } from 'mongoose';

// NOTE: The data validation should also be done with a tool like joy, or in the controller logic
const UserSchema = new Schema({
  username: {
    type: String,
    unique: true,
    required: true,
  },
  email: {
    type: String,
    match: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
    unique: true,
    required: true,
  },
  image: { type: String },
});

// Check if a User model already exists in the models collection. If not, create one using model():
const User = models.User || model('User', UserSchema);

// Export the User model as the default export:
export default User;

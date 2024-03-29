import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  hashedPassword: {
    type: String,
    required: true,
    minlength: 5,
  },
  dietList: {
    type: Array,
    required: true,
  },
});

const User = mongoose.models.User || mongoose.model('User', userSchema);
export default User;

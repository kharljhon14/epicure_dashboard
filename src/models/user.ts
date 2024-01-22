/* eslint-disable func-names */
import { compare } from 'bcrypt';
import type { Model, ObjectId } from 'mongoose';
import { model, models, Schema } from 'mongoose';

export interface UserDocument {
  _id: ObjectId;
  name: string;
  email: string;
  password: string;
  verified: boolean;
  avatar?: { url: string; publicId: string };
  tokens: Array<string>;
}

interface Methods {
  comparePassword(password: string): Promise<boolean>;
}

const userSchema = new Schema<UserDocument, {}, Methods>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    avatar: {
      type: Object,
      url: String,
      publicId: String,
    },
    verified: {
      type: Boolean,
      default: false,
    },
    tokens: [String],
  },
  { timestamps: true }
);

// userSchema.pre('save', async function (next) {
//   if (this.isModified('password'))
//     this.password = await hash(this.password, 10);

//   next();
// });

userSchema.methods.comparePassword = async function (password) {
  return compare(password, this.password);
};

const User = models.User || model('User', userSchema);
export default User as Model<UserDocument, {}, Methods>;

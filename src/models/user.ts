import type { Model, ObjectId } from 'mongoose';
import { model, models, Schema } from 'mongoose';

interface UserDocument {
  _id: ObjectId;
  name: string;
  email: string;
  password: string;
  verified: boolean;
  avatar?: { url: string; publicId: string };
  tokens: Array<string>;
}

const userSchema = new Schema<UserDocument>({
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
});

const User = models.User || model('User', userSchema);
export default User as Model<UserDocument>;

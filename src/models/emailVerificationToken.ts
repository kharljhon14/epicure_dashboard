/* eslint-disable func-names */
import { compare, hash } from 'bcrypt';
import type { ObjectId } from 'mongodb';
import { model, models, Schema } from 'mongoose';

interface EmailVerificationTokenDocument {
  owner: ObjectId;
  token: string;
  createdAt: Date;
}

interface Methods {
  compareToken(token: string): Promise<boolean>;
}

const emailVerificationTokenSchema = new Schema<
  EmailVerificationTokenDocument,
  {},
  Methods
>({
  owner: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
  token: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    expires: 3600,
    default: Date.now(),
  },
});

emailVerificationTokenSchema.pre('save', async function (next) {
  if (this.isModified('token')) this.token = await hash(this.token, 10);

  next();
});

emailVerificationTokenSchema.methods.compareToken = async function (token) {
  return compare(token, this.token);
};

const EmailVerificationToken =
  models.EmailVerificationToken ||
  model('EmailVerificationToken', emailVerificationTokenSchema);

export default EmailVerificationToken;

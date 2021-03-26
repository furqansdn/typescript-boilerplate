import mongoose from 'mongoose';
import validator from 'validator';
import bcrypt from 'bcryptjs';

import { IUser } from '../interfaces/IUser';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please enter a full name'],
    trim: true,
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, 'Invalid Email Format'],
  },
  photo: { type: String },
  role: { type: String, enum: ['user', 'admin'], default: 'user' },
  password: {
    type: String,
    required: [true, 'Password is required'],
    select: false,
  },
});

userSchema.pre<IUser & mongoose.Document>('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

userSchema.methods.correctPassword = async function (
  candidatePassword,
  currentPassword
) {
  return await bcrypt.compare(candidatePassword, currentPassword);
};

export default mongoose.model<IUser & mongoose.Document>('User', userSchema);

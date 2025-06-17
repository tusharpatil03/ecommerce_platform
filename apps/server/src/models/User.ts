import mongoose, { PopulatedDoc } from 'mongoose';
import { Schema, model } from 'mongoose';
import { InterfaceProduct } from './Product';

export interface InterfaceUser {
  _id: mongoose.Schema.Types.ObjectId;
  email: string;
  password: string;
  salt: string;
  created_at?: Date;
  token?: string;
  token_version?: number;
  products?: PopulatedDoc<InterfaceProduct & Document>[];
}

const userSchema = new Schema<InterfaceUser>({
  email: {
    type: String,
    required: [true, 'Please enter your Email Id'],
    maxLength: [40, 'Email can not exceed 40 charactors'],
    unique: true,
  },

  password: {
    type: String,
    required: true,
    select: false,
  },

  salt: {
    type: String,
    required: true,
    select: false,
  },

  created_at: {
    type: Date,
    default: Date.now(),
  },

  token: {
    type: String,
  },
  token_version: {
    type: Number,
    required: true,
    default: 0,
  },

  products: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Product',
    },
  ],
});

export const User = model<InterfaceUser>('User', userSchema);

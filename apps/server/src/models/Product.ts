import mongoose, { PopulatedDoc } from 'mongoose';
import { Schema, model } from 'mongoose';
import { InterfaceUser } from './User';

export interface InterfaceProduct {
  _id: mongoose.Types.ObjectId;
  key: string;
  name: string;
  description: string;
  price: number;
  rating?: number;
  images: { public_id: string; url: string }[];
  category?:
    | 'electronics'
    | 'clothing'
    | 'wearings'
    | 'food'
    | 'beauty'
    | 'mechanical'
    | 'drinks'
    | 'any';
  stock?: number;
  owner: PopulatedDoc<InterfaceUser & Document>;
}

const ProductShema = new Schema<InterfaceProduct>({
  key: {
    type: String,
    required: true,
    trim: true,
    maxLength: 8,
  },
  name: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
    maxLength: 600,
  },
  price: {
    type: Number,
    required: true,
    maxLength: 8,
  },
  rating: {
    type: Number,
    min: 1,
    max: 5,
  },
  images: [
    {
      public_id: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
  ],
  category: {
    type: String,
    enum: [
      'electronics',
      'clothing',
      'wearings',
      'food',
      'beauty',
      'mechanical',
      'drinks',
      'any',
    ],
    default: 'any',
  },
  stock: {
    type: Number,
    min: 0,
    max: 999,
    default: 1,
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
});

export const Product = model<InterfaceProduct>('Product', ProductShema);

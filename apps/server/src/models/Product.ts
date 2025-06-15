import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const ProductShema = new Schema({
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
    maxLength: 10,
    default: 1,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
});

export const Product = mongoose.model('Product', ProductShema);

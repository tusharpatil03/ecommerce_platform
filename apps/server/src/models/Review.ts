import mongoose, { PopulatedDoc, Schema, model } from 'mongoose';
import { InterfaceUser } from './User';
import { InterfaceProduct } from './Product';

export interface InterfaceReview {
  comment: string;
  user: PopulatedDoc<InterfaceUser & Document>;
  rating: number;
  created_at: Date;
  updated_at: Date;
  product: PopulatedDoc<InterfaceProduct & Document>;
}

const reviewSchema = new Schema({
  comment: {
    type: String,
    required: true,
    maxLength: [200, 'Comment Exceed 200 charactors'],
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  rating: {
    type: Number,
    default: 5,
    min: 1,
    max: 5,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
  updated_at: {
    type: Date,
    default: Date.now,
  },
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true,
  },
});

export const Review = model<InterfaceReview>('Review', reviewSchema);

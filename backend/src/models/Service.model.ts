import mongoose, { Schema, Document } from 'mongoose';

export interface IService extends Document {
  name: string;
  category: string;
  description: string;
  price: number;
  duration: number; // in minutes
  image?: string;
  isActive: boolean;
  features?: string[];
  createdAt: Date;
  updatedAt: Date;
}

const serviceSchema = new Schema<IService>(
  {
    name: {
      type: String,
      required: [true, 'Service name is required'],
      trim: true
    },
    category: {
      type: String,
      required: [true, 'Category is required'],
      enum: ['Cleaning', 'Plumbing', 'Electrical', 'Carpentry', 'Painting', 'AC Repair', 'Other'],
      trim: true
    },
    description: {
      type: String,
      required: [true, 'Description is required']
    },
    price: {
      type: Number,
      required: [true, 'Price is required'],
      min: [0, 'Price cannot be negative']
    },
    duration: {
      type: Number,
      required: [true, 'Duration is required'],
      min: [15, 'Duration must be at least 15 minutes']
    },
    image: {
      type: String
    },
    isActive: {
      type: Boolean,
      default: true
    },
    features: {
      type: [String],
      default: []
    }
  },
  { timestamps: true }
);

export default mongoose.model<IService>('Service', serviceSchema);

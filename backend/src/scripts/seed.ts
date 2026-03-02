import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Service from '../models/Service.model';

dotenv.config();

const services = [
  {
    name: 'Deep Cleaning',
    category: 'Cleaning',
    description: 'Complete deep cleaning of your home including all rooms, kitchen, and bathrooms',
    price: 2499,
    duration: 180,
    features: [
      'All rooms cleaning',
      'Kitchen deep clean',
      'Bathroom sanitization',
      'Dusting and vacuuming',
      'Professional equipment'
    ],
    isActive: true
  },
  {
    name: 'Plumbing Repair',
    category: 'Plumbing',
    description: 'Professional plumbing services for leaks, blockages, and installations',
    price: 599,
    duration: 120,
    features: [
      'Leak repair',
      'Pipe installation',
      'Drain cleaning',
      'Fixture replacement',
      'Emergency service'
    ],
    isActive: true
  },
  {
    name: 'Electrical Repair',
    category: 'Electrical',
    description: 'Licensed electrician for all electrical repairs and installations',
    price: 699,
    duration: 90,
    features: [
      'Wiring repair',
      'Switch & socket installation',
      'Light fixture installation',
      'Circuit breaker repair',
      'Safety inspection'
    ],
    isActive: true
  },
  {
    name: 'Carpentry Services',
    category: 'Carpentry',
    description: 'Expert carpentry for furniture repair, installation, and custom work',
    price: 899,
    duration: 150,
    features: [
      'Furniture repair',
      'Door & window installation',
      'Cabinet installation',
      'Custom woodwork',
      'Polishing & finishing'
    ],
    isActive: true
  },
  {
    name: 'Wall Painting',
    category: 'Painting',
    description: 'Professional painting services for interior and exterior walls',
    price: 3999,
    duration: 240,
    features: [
      'Interior painting',
      'Exterior painting',
      'Wall preparation',
      'Premium quality paint',
      'Clean-up included'
    ],
    isActive: true
  },
  {
    name: 'AC Service & Repair',
    category: 'AC Repair',
    description: 'Complete AC maintenance, repair, and installation services',
    price: 799,
    duration: 120,
    features: [
      'AC cleaning',
      'Gas refilling',
      'Repair & maintenance',
      'Installation',
      'Performance check'
    ],
    isActive: true
  },
  {
    name: 'Regular Housekeeping',
    category: 'Cleaning',
    description: 'Regular housekeeping service for daily maintenance',
    price: 999,
    duration: 120,
    features: [
      'Dusting & sweeping',
      'Mopping',
      'Kitchen cleaning',
      'Bathroom cleaning',
      'Trash disposal'
    ],
    isActive: true
  },
  {
    name: 'Bathroom Renovation',
    category: 'Plumbing',
    description: 'Complete bathroom renovation including plumbing and fixtures',
    price: 15999,
    duration: 480,
    features: [
      'Plumbing work',
      'Fixture installation',
      'Tiling',
      'Waterproofing',
      'Complete renovation'
    ],
    isActive: true
  }
];

const seedDatabase = async (): Promise<void> => {
  try {
    const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/servasetu';
    await mongoose.connect(mongoURI);
    
    console.log('✅ Connected to MongoDB');

    // Clear existing services
    await Service.deleteMany({});
    console.log('🗑️  Cleared existing services');

    // Insert new services
    await Service.insertMany(services);
    console.log(`✅ Successfully seeded ${services.length} services`);

    await mongoose.connection.close();
    console.log('👋 Database connection closed');
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Seed error:', error);
    process.exit(1);
  }
};

seedDatabase();

import mongoose from 'mongoose';

const connectDB = async (): Promise<void> => {
  try {
    const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/servasetu';
    
    await mongoose.connect(mongoURI);
    
    console.log('✅ MongoDB connected successfully');
    console.log(`📊 Database: ${mongoose.connection.name}`);
    
  } catch (error) {
    console.error('❌ MongoDB connection error:', error);
    console.error('⚠️  Server will start but database features will not work');
    console.error('💡 To fix this:');
    console.error('   Option 1: Install MongoDB locally and run: net start MongoDB');
    console.error('   Option 2: Use MongoDB Atlas (free): https://www.mongodb.com/cloud/atlas');
    console.error('   Update MONGODB_URI in .env with your Atlas connection string');
    // Don't exit - let server run without DB
  }
};

// Handle connection events
mongoose.connection.on('disconnected', () => {
  console.log('⚠️  MongoDB disconnected');
});

mongoose.connection.on('error', (err: Error) => {
  console.error('❌ MongoDB error:', err);
});

export default connectDB;

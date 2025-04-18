import { MongoClient } from 'mongodb';

// Add debugging
console.log('Environment:', process.env.NODE_ENV);
console.log('MongoDB URI exists:', !!process.env.MONGODB_URI);

if (!process.env.MONGODB_URI) {
  console.error('MongoDB URI is missing. Please check your environment variables.');
  throw new Error('Invalid/Missing environment variable: "MONGODB_URI"');
}

const uri = process.env.MONGODB_URI;
const options = {
  maxPoolSize: 10,
  serverApi: {
    version: '1' as const,
    strict: true,
    deprecationErrors: true,
  }
};

let client: MongoClient | undefined;
let clientPromise: Promise<MongoClient>;

try {
  if (process.env.NODE_ENV === 'development') {
    // In development mode, use a global variable so that the value
    // is preserved across module reloads caused by HMR (Hot Module Replacement).
    let globalWithMongo = global as typeof globalThis & {
      _mongoClientPromise?: Promise<MongoClient>
    }

    if (!globalWithMongo._mongoClientPromise) {
      client = new MongoClient(uri, options);
      globalWithMongo._mongoClientPromise = client.connect();
    }
    clientPromise = globalWithMongo._mongoClientPromise;
  } else {
    // In production mode, it's best to not use a global variable.
    client = new MongoClient(uri, options);
    clientPromise = client.connect();
  }
} catch (error) {
  console.error('Error initializing MongoDB connection:', error);
  throw error;
}

// Export a module-scoped MongoClient promise. By doing this in a
// separate module, the client can be shared across functions.
export default clientPromise;

export async function addSubscriber(email: string) {
  try {
    console.log('Attempting to connect to MongoDB...');
    const client = await clientPromise;
    console.log('Connected to MongoDB successfully');
    
    const db = client.db("covolabs");
    console.log('Selected database:', db.databaseName);
    
    const result = await db.collection("subscribers").insertOne({
      email,
      timestamp: new Date()
    });
    
    console.log('Successfully inserted document with ID:', result.insertedId);
    return result;
  } catch (error) {
    console.error('Detailed error in addSubscriber:', error);
    throw error;
  }
}

export async function getSubscribers() {
  try {
    const client = await clientPromise;
    const db = client.db("covolabs");
    const subscribers = await db.collection("subscribers")
      .find({})
      .sort({ timestamp: -1 })
      .toArray();
    return subscribers;
  } catch (error) {
    console.error('Error getting subscribers:', error);
    throw error;
  }
} 
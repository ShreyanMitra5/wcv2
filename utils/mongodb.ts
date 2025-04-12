import { MongoClient } from 'mongodb';

if (!process.env.MONGODB_URI) {
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

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

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
  clientPromise = globalWithMongo._mongoClientPromise!; // Assert that it's defined
} else {
  // In production mode, it's best to not use a global variable.
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

// Export a module-scoped MongoClient promise. By doing this in a
// separate module, the client can be shared across functions.
export default clientPromise;

export async function addSubscriber(email: string) {
  try {
    const response = await fetch('https://data.mongodb-api.com/app/data-api/endpoint/data/v1/action/insertOne', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'api-key': process.env.MONGODB_API_KEY || '',
      },
      body: JSON.stringify({
        dataSource: 'Email',
        database: 'covolabs',
        collection: 'subscribers',
        document: {
          email,
          timestamp: new Date().toISOString()
        }
      })
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error adding subscriber:', error);
    throw error;
  }
}

export async function getSubscribers() {
  try {
    const response = await fetch('https://data.mongodb-api.com/app/data-api/endpoint/data/v1/action/find', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'api-key': process.env.MONGODB_API_KEY || '',
      },
      body: JSON.stringify({
        dataSource: 'Email',
        database: 'covolabs',
        collection: 'subscribers',
        sort: { timestamp: -1 }
      })
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error getting subscribers:', error);
    throw error;
  }
} 
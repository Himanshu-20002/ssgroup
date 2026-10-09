import dns from 'dns';
import { MongoClient } from 'mongodb';

// Ensure DNS SRV records resolve smoothly on Windows and local networks
try {
  dns.setServers(['8.8.8.8', '8.8.4.4', '1.1.1.1']);
} catch {
  // Ignore in restricted environments
}

const uri = process.env.MONGODB_URI;
const options = {};

let client: MongoClient;
let clientPromise: Promise<MongoClient> | null = null;

function setupClientLogging(cli: MongoClient) {
  cli.on('close', () => {
    console.log('🔴 [MongoDB] Connection closed / Disconnected');
  });

  cli.on('error', (err) => {
    console.error('🔴 [MongoDB] Connection error:', err.message);
  });

  cli.on('timeout', () => {
    console.warn('⚠️ [MongoDB] Connection timeout');
  });
}

async function connectWithLogging(cli: MongoClient): Promise<MongoClient> {
  try {
    const connected = await cli.connect();
    console.log('🟢 [MongoDB] Connected successfully to Cloud Database (ssgroup)!');
    return connected;
  } catch (err: any) {
    console.error('🔴 [MongoDB] Connection failed:', err?.message || err);
    throw err;
  }
}

if (uri) {
  if (process.env.NODE_ENV === 'development') {
    // In development mode, use a global variable to preserve connection across HMR
    const globalWithMongo = global as typeof globalThis & {
      _mongoClientPromise?: Promise<MongoClient>;
    };

    if (!globalWithMongo._mongoClientPromise) {
      client = new MongoClient(uri, options);
      setupClientLogging(client);
      globalWithMongo._mongoClientPromise = connectWithLogging(client);
    }
    clientPromise = globalWithMongo._mongoClientPromise;
  } else {
    // In production mode
    client = new MongoClient(uri, options);
    setupClientLogging(client);
    clientPromise = connectWithLogging(client);
  }
} else {
  console.info('ℹ️ [MongoDB] No MONGODB_URI found. Running in local JSON storage mode.');
}

export default clientPromise;

import fs from 'fs';
import path from 'path';

const subscribersFile = path.join(process.cwd(), 'data/subscribers.json');

interface SubscriberData {
  subscribers: Array<{
    email: string;
    timestamp: string;
  }>;
}

export function addSubscriber(email: string) {
  try {
    console.log('Adding subscriber:', email);
    console.log('File path:', subscribersFile);

    // Create directory if it doesn't exist
    const dir = path.dirname(subscribersFile);
    if (!fs.existsSync(dir)) {
      console.log('Creating directory:', dir);
      fs.mkdirSync(dir, { recursive: true });
    }

    // Create file if it doesn't exist
    if (!fs.existsSync(subscribersFile)) {
      console.log('Creating new subscribers file');
      fs.writeFileSync(subscribersFile, JSON.stringify({ subscribers: [] }, null, 2));
    }

    // Read existing data
    console.log('Reading existing data');
    const fileContent = fs.readFileSync(subscribersFile, 'utf8');
    console.log('Current file content:', fileContent);
    const data = JSON.parse(fileContent) as SubscriberData;
    
    // Add new subscriber
    data.subscribers.push({
      email,
      timestamp: new Date().toISOString()
    });

    // Write back to file
    console.log('Writing updated data:', JSON.stringify(data, null, 2));
    fs.writeFileSync(subscribersFile, JSON.stringify(data, null, 2));
    return true;
  } catch (error) {
    console.error('Error adding subscriber:', error);
    return false;
  }
}

export function getSubscribers(): SubscriberData {
  try {
    console.log('Getting subscribers from:', subscribersFile);
    if (!fs.existsSync(subscribersFile)) {
      console.log('Subscribers file does not exist');
      return { subscribers: [] };
    }
    const data = JSON.parse(fs.readFileSync(subscribersFile, 'utf8'));
    console.log('Current subscribers:', data);
    return data;
  } catch (error) {
    console.error('Error reading subscribers:', error);
    return { subscribers: [] };
  }
} 
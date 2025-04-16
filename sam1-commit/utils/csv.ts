import fs from "fs";
import path from "path";

const csvFile = path.join(process.cwd(), "data/subscribers.csv");

export function appendToCsv(email: string) {
  try {
    const dir = path.dirname(csvFile);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    const exists = fs.existsSync(csvFile);
    const row = `${email},${new Date().toISOString()}\n`;
    if (!exists) {
      fs.writeFileSync(csvFile, "email,timestamp\n" + row);
    } else {
      fs.appendFileSync(csvFile, row);
    }
    return true;
  } catch (error) {
    console.error("Error writing to CSV:", error);
    return false;
  }
}

export function getSubscribers() {
  try {
    if (!fs.existsSync(csvFile)) {
      return { subscribers: [] };
    }
    const data = fs.readFileSync(csvFile, "utf8").split("\n").filter(Boolean);
    const [header, ...rows] = data;
    const subscribers = rows.map(row => {
      const [email, timestamp] = row.split(",");
      return { email, timestamp };
    });
    return { subscribers };
  } catch (error) {
    console.error("Error reading CSV:", error);
    return { subscribers: [] };
  }
}
'use client';

import { useState } from 'react';
import fs from 'fs';
import path from 'path';

export default function AdminPage() {
  const [waitlist, setWaitlist] = useState(() => {
    const WAITLIST_FILE = path.join(process.cwd(), 'data', 'waitlist.json');
    return JSON.parse(fs.readFileSync(WAITLIST_FILE, 'utf-8'));
  });

  const downloadCSV = () => {
    const csvContent = ['Email,Date Added\n'];
    waitlist.emails.forEach((email: string, index: number) => {
      csvContent.push(`${email},${new Date().toISOString()}\n`);
    });
    
    const blob = new Blob(csvContent, { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', 'waitlist_emails.csv');
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-[#faf2e7] p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-[#847158]">Waitlist Signups</h1>
          <button
            onClick={downloadCSV}
            className="px-4 py-2 bg-[#847158] text-white rounded-md hover:bg-[#847158]/90 transition-colors"
          >
            Download CSV
          </button>
        </div>
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="mb-4">
            <span className="text-[#847158] font-medium">Total Signups: </span>
            <span className="font-bold">{waitlist.emails.length}</span>
          </div>
          <div className="space-y-2">
            {waitlist.emails.map((email: string, index: number) => (
              <div
                key={email}
                className="p-3 bg-[#faf2e7] rounded-md flex justify-between items-center"
              >
                <span className="text-[#847158]">{email}</span>
                <span className="text-sm text-[#847158]/60">#{index + 1}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
} 
'use client';

import { useState, useEffect } from 'react';

interface WaitlistData {
  emails: string[];
}

export default function AdminPage() {
  const [waitlist, setWaitlist] = useState<WaitlistData>({ emails: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (isClient) {
      const fetchWaitlist = async () => {
        try {
          const response = await fetch('/api/waitlist');
          if (!response.ok) {
            throw new Error('Failed to fetch waitlist data');
          }
          const data = await response.json();
          setWaitlist(data);
        } catch (err) {
          setError(err instanceof Error ? err.message : 'Failed to load waitlist');
        } finally {
          setLoading(false);
        }
      };

      fetchWaitlist();
    }
  }, [isClient]);

  const downloadCSV = () => {
    if (!isClient) return;
    const csvContent = ['Email\n'];
    waitlist.emails.forEach(email => {
      csvContent.push(`${email}\n`);
    });
    const blob = new Blob([csvContent.join('')], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', 'waitlist_emails.csv');
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#faf2e7] p-8 flex items-center justify-center">
        <div className="text-[#847158]">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#faf2e7] p-8 flex items-center justify-center">
        <div className="text-red-600">{error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#faf2e7] p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-[#847158]">Waitlist Signups</h1>
          <button
            onClick={downloadCSV}
            className="px-4 py-2 bg-[#847158] text-white rounded-md hover:bg-[#847158]/90 transition-colors"
            disabled={!isClient}
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
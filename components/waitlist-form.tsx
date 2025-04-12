'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function WaitlistForm() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    
    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        throw new Error('Failed to subscribe');
      }

      setStatus('success');
      setMessage('Thank you for joining our waitlist!');
      setEmail('');
    } catch (error) {
      console.error('Error:', error);
      setStatus('error');
      setMessage(error instanceof Error ? error.message : 'Failed to join waitlist');
    }
  };

  return (
    <motion.form 
      onSubmit={handleSubmit} 
      className="w-full max-w-xl mx-auto space-y-3"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex gap-4">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          className="flex-1 px-6 py-4 text-lg border-2 border-[#847158]/20 rounded-lg text-[#847158] placeholder-[#847158]/50 focus:outline-none focus:ring-2 focus:ring-[#847158] focus:ring-opacity-20 transition-all duration-200 font-medium"
          disabled={status === 'loading' || status === 'success'}
          required
        />
        <motion.button
          type="submit"
          disabled={status === 'loading' || status === 'success'}
          className={`px-8 py-4 text-lg rounded-lg font-bold transition-all duration-200 ${
            status === 'loading'
              ? 'bg-[#847158]/20 text-[#847158]/50'
              : status === 'success'
              ? 'bg-green-500 text-white'
              : 'bg-[#847158] text-white hover:bg-[#847158]/90 hover:shadow-lg'
          }`}
          whileHover={{ scale: status === 'idle' ? 1.02 : 1 }}
          whileTap={{ scale: status === 'idle' ? 0.98 : 1 }}
        >
          {status === 'loading' ? 'Subscribing...' : status === 'success' ? 'Joined!' : 'Notify Me'}
        </motion.button>
      </div>

      <AnimatePresence>
        {message && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className={`text-center ${
              status === 'error' ? 'text-red-500' : 'text-[#847158]/70'
            }`}
          >
            <motion.p
              className="text-lg font-bold"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200, damping: 10 }}
            >
              {message}
            </motion.p>
            {status === 'success' && (
              <motion.p
                className="text-sm mt-2 font-medium"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                We'll keep you updated on our progress
              </motion.p>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.form>
  );
}

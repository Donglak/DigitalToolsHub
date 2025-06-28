import React, { useState } from 'react';
import { Mail, CheckCircle } from 'lucide-react';
import { submitToGoogleSheets } from '../services/googleSheets';

interface NewsletterFormProps {
  className?: string;
}

const NewsletterForm: React.FC<NewsletterFormProps> = ({ className = '' }) => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email.trim()) {
      setError('Please enter your email address');
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Please enter a valid email address');
      return;
    }

    setIsSubmitting(true);
    setError('');

    try {
      await submitToGoogleSheets({
        name: '', // No name field in this form
        email: email.trim(),
        timestamp: new Date().toISOString(),
        source: 'newsletter_form'
      });

      setIsSuccess(true);
      setEmail('');
      
      // Reset success state after 3 seconds
      setTimeout(() => {
        setIsSuccess(false);
      }, 3000);
    } catch (error) {
      console.error('Newsletter subscription failed:', error);
      setError('Failed to subscribe. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className={`flex items-center justify-center gap-2 text-white ${className}`}>
        <CheckCircle className="w-5 h-5" />
        <span>Thank you for subscribing!</span>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className={`space-y-4 ${className}`}>
      <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
        <div className="flex-1">
          <input
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setError(''); // Clear error when user types
            }}
            placeholder="Enter your email"
            className="w-full px-6 py-4 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white"
            disabled={isSubmitting}
          />
          {error && (
            <p className="text-red-200 text-sm mt-2">{error}</p>
          )}
        </div>
        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-white text-primary-600 hover:bg-gray-100 px-8 py-4 rounded-lg font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {isSubmitting ? (
            <>
              <div className="w-5 h-5 border-2 border-primary-600/30 border-t-primary-600 rounded-full animate-spin"></div>
              Subscribing...
            </>
          ) : (
            <>
              <Mail className="w-5 h-5" />
              Subscribe
            </>
          )}
        </button>
      </div>
      
      <p className="text-white/70 text-sm text-center">
        Join 50,000+ subscribers. No spam, unsubscribe anytime.
      </p>
    </form>
  );
};

export default NewsletterForm;
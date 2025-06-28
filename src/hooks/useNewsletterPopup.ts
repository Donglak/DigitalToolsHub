import { useState, useEffect, useCallback } from 'react';

const STORAGE_KEY = 'newsletter_subscribed';
const POPUP_INTERVAL = 30000; // 30 seconds

export const useNewsletterPopup = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);

  useEffect(() => {
    // Check if user has already subscribed
    const subscribed = localStorage.getItem(STORAGE_KEY) === 'true';
    setIsSubscribed(subscribed);

    if (!subscribed) {
      // Show popup after 30 seconds initially
      const initialTimer = setTimeout(() => {
        setIsPopupOpen(true);
      }, POPUP_INTERVAL);

      return () => clearTimeout(initialTimer);
    }
  }, []);

  useEffect(() => {
    if (!isSubscribed && !isPopupOpen) {
      // Set up recurring popup every 30 seconds
      const interval = setInterval(() => {
        setIsPopupOpen(true);
      }, POPUP_INTERVAL);

      return () => clearInterval(interval);
    }
  }, [isSubscribed, isPopupOpen]);

  const closePopup = useCallback(() => {
    setIsPopupOpen(false);
  }, []);

  const handleSubscribe = useCallback(async (email: string, name: string) => {
    try {
      // Mark as subscribed locally
      localStorage.setItem(STORAGE_KEY, 'true');
      setIsSubscribed(true);
      
      return true;
    } catch (error) {
      console.error('Subscription error:', error);
      throw error;
    }
  }, []);

  return {
    isPopupOpen,
    closePopup,
    handleSubscribe,
    isSubscribed
  };
};
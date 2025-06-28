import React from 'react';
import NewsletterPopup from './NewsletterPopup';
import { useNewsletterPopup } from '../hooks/useNewsletterPopup';
import { submitToGoogleSheets, validateEmail, createTimestamp } from '../services/googleSheets';

const PopupManager: React.FC = () => {
  const { isPopupOpen, closePopup, handleSubscribe } = useNewsletterPopup();

  const onSubscribe = async (email: string, name: string) => {
    try {
      // Validate email
      if (!validateEmail(email)) {
        throw new Error('Email không hợp lệ');
      }

      // Validate name
      if (!name.trim()) {
        throw new Error('Tên không được để trống');
      }

      console.log('Đang xử lý đăng ký newsletter:', { email, name });

      // Chuẩn bị dữ liệu để gửi đến Google Sheets
      const subscriptionData = {
        name: name.trim(),
        email: email.trim().toLowerCase(),
        timestamp: createTimestamp(),
        source: 'newsletter_popup'
      };

      // Gửi dữ liệu đến Google Sheets
      await submitToGoogleSheets(subscriptionData);

      // Xử lý subscription trong hook (lưu vào localStorage)
      await handleSubscribe(email, name);

      console.log('Đăng ký newsletter thành công!');
    } catch (error) {
      console.error('Lỗi đăng ký newsletter:', error);
      throw error;
    }
  };

  return (
    <NewsletterPopup
      isOpen={isPopupOpen}
      onClose={closePopup}
      onSubscribe={onSubscribe}
    />
  );
};

export default PopupManager;
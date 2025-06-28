// Google Sheets integration service
export interface SubscriptionData {
  name: string;
  email: string;
  timestamp: string;
  source: string;
}

export const submitToGoogleSheets = async (data: SubscriptionData): Promise<boolean> => {
  try {
    // Lấy Google Apps Script Web App URL từ environment variables
    const GOOGLE_SCRIPT_URL = import.meta.env.VITE_GOOGLE_SCRIPT_URL;
    
    if (!GOOGLE_SCRIPT_URL) {
      throw new Error('VITE_GOOGLE_SCRIPT_URL chưa được cấu hình trong file .env');
    }
    
    console.log('Đang gửi dữ liệu đến Google Sheets:', data);
    
    const response = await fetch(GOOGLE_SCRIPT_URL, {
      method: 'POST',
      mode: 'no-cors', // Bắt buộc cho Google Apps Script
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    // Lưu ý: Với no-cors mode, chúng ta không thể đọc response
    // Chúng ta giả định thành công nếu không có lỗi được throw
    console.log('Dữ liệu đã được gửi thành công đến Google Sheets');
    return true;
  } catch (error) {
    console.error('Lỗi khi gửi dữ liệu đến Google Sheets:', error);
    throw new Error('Không thể lưu email vào Google Sheets');
  }
};

// Phương thức thay thế sử dụng proxy endpoint
export const submitViaProxy = async (data: SubscriptionData): Promise<boolean> => {
  try {
    const response = await fetch('/api/google-sheets', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    return result.success;
  } catch (error) {
    console.error('Lỗi proxy submission:', error);
    throw error;
  }
};

// Utility function để validate email
export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Utility function để tạo timestamp
export const createTimestamp = (): string => {
  return new Date().toISOString();
};
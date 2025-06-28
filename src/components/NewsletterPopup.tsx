import React, { useState, useEffect } from 'react';
import { X, Mail, Gift, CheckCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface NewsletterPopupProps {
  isOpen: boolean;
  onClose: () => void;
  onSubscribe: (email: string, name: string) => void;
}

const NewsletterPopup: React.FC<NewsletterPopupProps> = ({ isOpen, onClose, onSubscribe }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errors, setErrors] = useState<{name?: string; email?: string}>({});

  const validateForm = () => {
    const newErrors: {name?: string; email?: string} = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Tên là bắt buộc';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email là bắt buộc';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Vui lòng nhập email hợp lệ';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    try {
      await onSubscribe(formData.email, formData.name);
      setIsSuccess(true);
      
      // Đóng popup sau 2 giây thành công
      setTimeout(() => {
        onClose();
        setIsSuccess(false);
        setFormData({ name: '', email: '' });
      }, 2000);
    } catch (error) {
      console.error('Đăng ký thất bại:', error);
      // Hiển thị thông báo lỗi cho người dùng
      setErrors({ 
        email: error instanceof Error ? error.message : 'Có lỗi xảy ra, vui lòng thử lại' 
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Xóa lỗi khi người dùng bắt đầu nhập
    if (errors[name as keyof typeof errors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          transition={{ type: "spring", duration: 0.5 }}
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-md w-full mx-4 overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header với gradient background */}
          <div className="bg-gradient-to-r from-primary-600 to-secondary-600 p-6 text-white relative">
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-white/80 hover:text-white transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                {isSuccess ? (
                  <CheckCircle className="w-8 h-8 text-white" />
                ) : (
                  <Gift className="w-8 h-8 text-white" />
                )}
              </div>
              <h2 className="text-2xl font-bold mb-2">
                {isSuccess ? 'Chào mừng bạn!' : 'Nhận thông tin độc quyền'}
              </h2>
              <p className="text-white/90">
                {isSuccess 
                  ? 'Cảm ơn bạn đã đăng ký! Bạn sẽ nhận được cập nhật về các công cụ mới nhất.'
                  : 'Là người đầu tiên khám phá các công cụ số mạnh mẽ và ưu đãi độc quyền'
                }
              </p>
            </div>
          </div>

          {/* Form Content */}
          <div className="p-6">
            {!isSuccess ? (
              <>
                {/* Lợi ích */}
                <div className="mb-6">
                  <div className="grid grid-cols-1 gap-3">
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-primary-500 rounded-full"></div>
                      <span className="text-sm text-gray-600 dark:text-gray-300">
                        Cập nhật hàng tuần về các công cụ thịnh hành
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-secondary-500 rounded-full"></div>
                      <span className="text-sm text-gray-600 dark:text-gray-300">
                        Ưu đãi và giảm giá độc quyền
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-accent-500 rounded-full"></div>
                      <span className="text-sm text-gray-600 dark:text-gray-300">
                        Đánh giá chuyên gia và so sánh
                      </span>
                    </div>
                  </div>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Họ và tên của bạn"
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-colors ${
                        errors.name 
                          ? 'border-red-300 dark:border-red-600' 
                          : 'border-gray-300 dark:border-gray-600'
                      }`}
                    />
                    {errors.name && (
                      <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                    )}
                  </div>

                  <div>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="email@example.com"
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-colors ${
                        errors.email 
                          ? 'border-red-300 dark:border-red-600' 
                          : 'border-gray-300 dark:border-gray-600'
                      }`}
                    />
                    {errors.email && (
                      <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                    )}
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-primary-600 to-secondary-600 hover:from-primary-700 hover:to-secondary-700 text-white py-3 px-6 rounded-lg font-semibold transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        Đang đăng ký...
                      </>
                    ) : (
                      <>
                        <Mail className="w-5 h-5" />
                        Nhận cập nhật miễn phí
                      </>
                    )}
                  </button>
                </form>

                <p className="text-xs text-gray-500 dark:text-gray-400 text-center mt-4">
                  Không spam, hủy đăng ký bất cứ lúc nào. Chúng tôi tôn trọng quyền riêng tư của bạn.
                </p>
              </>
            ) : (
              <div className="text-center py-4">
                <div className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-8 h-8 text-green-600 dark:text-green-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  Bạn đã sẵn sàng!
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Kiểm tra email để xác nhận đăng ký.
                </p>
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default NewsletterPopup;
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Zap, Twitter, Linkedin, Facebook, Mail, Youtube, CheckCircle, AlertCircle } from 'lucide-react';
import { submitToGoogleSheets, validateEmail } from '../services/googleSheets';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Reset states
    setError('');
    
    if (!email.trim()) {
      setError('Vui lòng nhập địa chỉ email');
      return;
    }

    if (!validateEmail(email.trim())) {
      setError('Vui lòng nhập địa chỉ email hợp lệ');
      return;
    }

    setIsSubmitting(true);

    try {
      await submitToGoogleSheets({
        name: '',
        email: email.trim(),
        timestamp: new Date().toISOString(),
        source: 'footer_newsletter'
      });

      setIsSuccess(true);
      setEmail('');
      
      // Reset success state after 3 seconds
      setTimeout(() => {
        setIsSuccess(false);
      }, 3000);
    } catch (error) {
      console.error('Newsletter subscription failed:', error);
      setError('Đã xảy ra lỗi. Vui lòng thử lại sau.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <footer className="bg-gray-900 dark:bg-gray-950 text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-lg flex items-center justify-center">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold">DigitalToolsHub</span>
            </div>
            <p className="text-gray-300 mb-6 leading-relaxed max-w-md">
              Khám phá những công cụ số tốt nhất cho AI, tự động hóa marketing và kiếm tiền online. 
              Đánh giá chuyên sâu, so sánh và ưu đãi độc quyền để tăng năng suất và thu nhập của bạn.
            </p>
            
            {/* Newsletter Signup */}
            <div className="space-y-3">
              <h4 className="font-semibold text-white">Nhận cập nhật mới nhất</h4>
              {isSuccess ? (
                <div className="flex items-center gap-2 text-green-400 font-medium bg-green-500/10 p-3 rounded-lg">
                  <CheckCircle className="w-5 h-5" />
                  Cảm ơn bạn đã đăng ký!
                </div>
              ) : (
                <form onSubmit={handleNewsletterSubmit}>
                  <div className="flex flex-col sm:flex-row gap-2">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        setError('');
                      }}
                      placeholder="Nhập email của bạn"
                      className="flex-1 px-4 py-2 rounded-lg bg-gray-800 text-white placeholder-gray-400 border border-gray-700 focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500 transition-all"
                      disabled={isSubmitting}
                    />
                    <button 
                      type="submit"
                      disabled={isSubmitting || !email.trim()}
                      className="bg-primary-600 hover:bg-primary-700 px-6 py-2 rounded-lg font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed min-w-[100px]"
                    >
                      {isSubmitting ? (
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mx-auto"></div>
                      ) : (
                        'Đăng ký'
                      )}
                    </button>
                  </div>
                  {error && (
                    <div className="flex items-center gap-2 text-red-400 text-sm mt-2">
                      <AlertCircle className="w-4 h-4" />
                      {error}
                    </div>
                  )}
                </form>
              )}
            </div>
          </div>

          {/* Tools */}
          <div>
            <h4 className="font-semibold mb-4 text-white">Danh mục</h4>
            <ul className="space-y-2">
              <li><Link to="/tools?category=ai" className="text-gray-300 hover:text-white transition-colors">Công cụ AI</Link></li>
              <li><Link to="/tools?category=marketing" className="text-gray-300 hover:text-white transition-colors">Công cụ Marketing</Link></li>
              <li><Link to="/tools?category=mmo" className="text-gray-300 hover:text-white transition-colors">Công cụ MMO</Link></li>
              <li><Link to="/tools?tag=free" className="text-gray-300 hover:text-white transition-colors">Công cụ miễn phí</Link></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-semibold mb-4 text-white">Tài nguyên</h4>
            <ul className="space-y-2">
              <li><Link to="/blog" className="text-gray-300 hover:text-white transition-colors">Blog</Link></li>
              <li><Link to="/blog/guides" className="text-gray-300 hover:text-white transition-colors">Hướng dẫn</Link></li>
              <li><Link to="/blog/reviews" className="text-gray-300 hover:text-white transition-colors">Đánh giá</Link></li>
              <li><Link to="/blog/comparisons" className="text-gray-300 hover:text-white transition-colors">So sánh</Link></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-semibold mb-4 text-white">Công ty</h4>
            <ul className="space-y-2">
              <li><Link to="/about" className="text-gray-300 hover:text-white transition-colors">Về chúng tôi</Link></li>
              <li><Link to="/contact" className="text-gray-300 hover:text-white transition-colors">Liên hệ</Link></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Chính sách bảo mật</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Điều khoản dịch vụ</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex flex-col md:flex-row items-center gap-4 mb-4 md:mb-0">
              <p className="text-gray-300">
                © 2024 DigitalToolsHub. Tất cả quyền được bảo lưu.
              </p>
              <div className="flex gap-6">
                <a href="#" className="text-gray-300 hover:text-white transition-colors text-sm">
                  Tiết lộ liên kết
                </a>
                <a href="#" className="text-gray-300 hover:text-white transition-colors text-sm">
                  Chính sách Cookie
                </a>
              </div>
            </div>

            {/* Social Icons */}
            <div className="flex gap-4">
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                <Linkedin size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                <Youtube size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                <Mail size={20} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
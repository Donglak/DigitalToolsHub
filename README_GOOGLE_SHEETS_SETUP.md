# Hướng dẫn thiết lập Google Sheets cho Newsletter

## Tổng quan
Hệ thống newsletter đã được tích hợp với Google Sheets để lưu trữ email đăng ký. Khi người dùng điền email và nhấn subscribe, thông tin sẽ được ghi vào Google Sheets tự động.

## Tính năng
- ✨ Form đăng ký đẹp mắt với validation
- 💾 Lưu dữ liệu vào Google Sheets
- 🔒 Xử lý lỗi và thông báo thành công
- 📱 Responsive design
- 🌙 Hỗ trợ dark mode
- ✅ Validation email
- 🎯 Tracking nguồn đăng ký

## Thiết lập Google Sheets

### Bước 1: Tạo Google Sheet
1. Truy cập [Google Sheets](https://sheets.google.com)
2. Tạo spreadsheet mới
3. Đặt tên "Newsletter Subscriptions" hoặc tương tự
4. Lưu ý Sheet ID từ URL: `https://docs.google.com/spreadsheets/d/{SHEET_ID}/edit`

### Bước 2: Tạo Google Apps Script
1. Truy cập [Google Apps Script](https://script.google.com)
2. Tạo project mới
3. Thay thế code mặc định bằng nội dung từ file `public/google-apps-script.js`
4. Thay `YOUR_GOOGLE_SHEET_ID_HERE` bằng Sheet ID thực tế
5. Lưu project

### Bước 3: Deploy Web App
1. Nhấn "Deploy" > "New deployment"
2. Chọn type "Web app"
3. Set execute as "Me"
4. Set access to "Anyone"
5. Nhấn "Deploy"
6. Copy Web App URL

### Bước 4: Cấu hình Environment Variables
1. Tạo file `.env` từ `.env.example`
2. Thay `YOUR_SCRIPT_ID` bằng URL Google Apps Script deployment thực tế
3. Format URL: `https://script.google.com/macros/s/SCRIPT_ID/exec`

## Cấu trúc dữ liệu

Google Sheet sẽ có các cột:
- **Timestamp**: Thời gian đăng ký
- **Name**: Tên người đăng ký (nếu có)
- **Email**: Địa chỉ email
- **Source**: Nguồn đăng ký (footer_newsletter, newsletter_popup, etc.)
- **IP Address**: Địa chỉ IP (tùy chọn)
- **User Agent**: Thông tin trình duyệt

## Sử dụng

### Form Newsletter trong Footer
- Người dùng nhập email và nhấn "Đăng ký"
- Hệ thống validate email
- Gửi dữ liệu đến Google Sheets
- Hiển thị thông báo thành công

### Newsletter Popup
- Popup xuất hiện sau 30 giây
- Yêu cầu cả tên và email
- Lưu vào Google Sheets với source "newsletter_popup"
- Không hiển thị lại sau khi đăng ký thành công

### Newsletter Form Component
- Component có thể tái sử dụng
- Tùy chỉnh source để tracking
- Validation tự động
- Error handling

## Tùy chỉnh

### Thay đổi thời gian popup
Chỉnh sửa `POPUP_INTERVAL` trong `src/hooks/useNewsletterPopup.ts`:
```typescript
const POPUP_INTERVAL = 30000; // 30 giây
```

### Thêm field mới
1. Cập nhật interface `SubscriptionData` trong `src/services/googleSheets.ts`
2. Thêm cột mới trong Google Apps Script
3. Cập nhật form components

### Thay đổi validation
Chỉnh sửa function `validateEmail` trong `src/services/googleSheets.ts`

## Kiểm tra

1. Xóa localStorage: `localStorage.removeItem('newsletter_subscribed')`
2. Refresh trang
3. Test form đăng ký
4. Kiểm tra Google Sheet có dữ liệu mới

## Xử lý lỗi

### Form không gửi được
- Kiểm tra console browser có lỗi
- Verify Google Apps Script URL trong .env
- Đảm bảo Google Apps Script đã deploy đúng

### Google Sheets không nhận dữ liệu
- Kiểm tra Sheet ID trong Google Apps Script
- Verify quyền truy cập của script
- Kiểm tra network tab trong browser

### CORS Issues
- Google Apps Script yêu cầu `mode: 'no-cors'`
- Không thể đọc response nhưng dữ liệu vẫn được lưu
- Có thể dùng proxy endpoint để xử lý response tốt hơn

## Bảo mật

- Google Apps Script URL công khai nhưng chỉ nhận POST requests
- Không lưu dữ liệu nhạy cảm ở frontend
- Có thể thêm rate limiting trong Google Apps Script
- Validate email ở cả frontend và backend

## Hỗ trợ trình duyệt

- Trình duyệt hiện đại có hỗ trợ localStorage
- Framer Motion animations yêu cầu trình duyệt hiện đại
- Graceful degradation cho trình duyệt cũ
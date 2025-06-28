# Hướng dẫn thiết lập Google Sheets cho Newsletter

## Bước 1: Tạo Google Sheet

1. Truy cập [Google Sheets](https://sheets.google.com)
2. Tạo spreadsheet mới
3. Đặt tên: "Newsletter Subscriptions"
4. Sao chép Sheet ID từ URL: `https://docs.google.com/spreadsheets/d/{SHEET_ID}/edit`

## Bước 2: Tạo Google Apps Script

1. Truy cập [Google Apps Script](https://script.google.com)
2. Tạo project mới
3. Thay thế code mặc định bằng code trong file `public/google-apps-script.js`
4. Thay `YOUR_GOOGLE_SHEET_ID_HERE` bằng Sheet ID thực tế
5. Lưu project

## Bước 3: Deploy Web App

1. Nhấn "Deploy" > "New deployment"
2. Chọn type: "Web app"
3. Execute as: "Me"
4. Who has access: "Anyone"
5. Nhấn "Deploy"
6. Sao chép Web App URL

## Bước 4: Cấu hình Environment Variables

1. Tạo file `.env` từ `.env.example`
2. Thay thế URL trong `VITE_GOOGLE_SCRIPT_URL` bằng Web App URL của bạn

## Bước 5: Test

1. Truy cập website
2. Đợi popup newsletter xuất hiện (30 giây)
3. Điền thông tin và submit
4. Kiểm tra Google Sheet để xem dữ liệu

## Cấu trúc dữ liệu trong Google Sheet

| Timestamp | Name | Email | Source |
|-----------|------|-------|--------|
| 2024-01-15T10:30:00Z | John Doe | john@example.com | newsletter_popup |

## Lưu ý bảo mật

- Web App URL là public nhưng chỉ nhận POST requests
- Không lưu trữ thông tin nhạy cảm trong frontend
- Xem xét thêm rate limiting trong Google Apps Script
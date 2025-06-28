// Google Apps Script code để deploy như Web App
// Deploy code này trong Google Apps Script và thêm URL vào environment variables

function doPost(e) {
  try {
    // Parse request data
    const data = JSON.parse(e.postData.contents);
    
    // Thay YOUR_GOOGLE_SHEET_ID_HERE bằng Sheet ID thực tế của bạn
    const SHEET_ID = 'YOUR_GOOGLE_SHEET_ID_HERE';
    const sheet = SpreadsheetApp.openById(SHEET_ID).getActiveSheet();
    
    // Thêm headers nếu đây là row đầu tiên
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(['Timestamp', 'Name', 'Email', 'Source']);
    }
    
    // Thêm dữ liệu subscription mới
    sheet.appendRow([
      data.timestamp || new Date().toISOString(),
      data.name || '',
      data.email || '',
      data.source || 'newsletter_popup'
    ]);
    
    // Trả về response thành công
    return ContentService
      .createTextOutput(JSON.stringify({ 
        success: true, 
        message: 'Email đã được lưu thành công' 
      }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    // Trả về error response
    return ContentService
      .createTextOutput(JSON.stringify({ 
        success: false, 
        error: error.toString() 
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// Xử lý GET requests (tùy chọn)
function doGet(e) {
  return ContentService
    .createTextOutput(JSON.stringify({ 
      message: 'Newsletter subscription endpoint đang hoạt động' 
    }))
    .setMimeType(ContentService.MimeType.JSON);
}

// Function để test (chạy trong Apps Script editor)
function testFunction() {
  const testData = {
    postData: {
      contents: JSON.stringify({
        name: 'Test User',
        email: 'test@example.com',
        timestamp: new Date().toISOString(),
        source: 'test'
      })
    }
  };
  
  const result = doPost(testData);
  console.log(result.getContent());
}
// Google Apps Script code to deploy as a Web App
// This should be deployed in Google Apps Script and the URL should be added to your environment variables

function doPost(e) {
  try {
    // Parse the request data
    const data = JSON.parse(e.postData.contents);
    
    // Open the Google Sheet (replace with your sheet ID)
    const SHEET_ID = '1yo39qlG02_yKby5is8LcFadZMNAZ-eyZQavIC37ki7M';
    const sheet = SpreadsheetApp.openById(SHEET_ID).getActiveSheet();
    
    // Add headers if this is the first row
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(['Timestamp', 'Name', 'Email', 'Source', 'IP Address', 'User Agent']);
    }
    
    // Get additional data
    const timestamp = new Date().toISOString();
    const userAgent = e.parameter.userAgent || 'Unknown';
    
    // Add the new subscription data
    sheet.appendRow([
      timestamp,
      data.name || '',
      data.email,
      data.source || 'website',
      data.ipAddress || 'Unknown',
      userAgent
    ]);
    
    // Return success response
    return ContentService
      .createTextOutput(JSON.stringify({ 
        success: true, 
        message: 'Subscription recorded successfully',
        timestamp: timestamp
      }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    // Log error for debugging
    console.error('Error processing subscription:', error);
    
    // Return error response
    return ContentService
      .createTextOutput(JSON.stringify({ 
        success: false, 
        error: error.toString(),
        message: 'Failed to record subscription'
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// Handle GET requests (for testing)
function doGet(e) {
  return ContentService
    .createTextOutput(JSON.stringify({ 
      message: 'Newsletter subscription endpoint is active',
      timestamp: new Date().toISOString(),
      status: 'ready'
    }))
    .setMimeType(ContentService.MimeType.JSON);
}

// Test function to verify sheet access
function testSheetAccess() {
  try {
    const SHEET_ID = 'YOUR_GOOGLE_SHEET_ID_HERE';
    const sheet = SpreadsheetApp.openById(SHEET_ID).getActiveSheet();
    
    // Test write
    sheet.appendRow(['Test', 'test@example.com', new Date().toISOString(), 'test']);
    
    return 'Sheet access successful';
  } catch (error) {
    return 'Sheet access failed: ' + error.toString();
  }
}
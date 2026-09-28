// Paste this into Extensions → Apps Script from the admin's private Google Sheet.
// Deploy as a web app: Execute as Me; Who has access: Anyone.
function doPost(e) {
  try {
    const data = e && e.parameter ? e.parameter : {};
    if (data['bot-field']) return page_('Thank you', 'Your message has been received.');

    const name = String(data.name || '').trim();
    const email = String(data.email || '').trim();
    const type = String(data.type || '');
    const message = String(data.message || '').trim();
    if (name.length > 100 || email.length > 254 ||
        (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) ||
        !['suggestion', 'issue', 'other'].includes(type) ||
        message.length < 10 || message.length > 2000) {
      return page_('Feedback not sent', 'Please check the fields and try again.');
    }

    const book = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = book.getSheetByName('Feedback') || book.insertSheet('Feedback');
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(['Submitted at', 'Name', 'Email', 'Type', 'Message']);
      sheet.setFrozenRows(1);
    }
    // Prefix text with an apostrophe so spreadsheet formulas are never evaluated.
    const safe = value => "'" + value;
    sheet.appendRow([new Date(), safe(name), safe(email), safe(type), safe(message)]);
    return page_('Feedback received', 'Thank you. Your message was sent privately to the AgriSentry team.');
  } catch (error) {
    console.error(error);
    return page_('Feedback not sent', 'There was a problem saving your message. Please try again later.');
  }
}

function page_(title, message) {
  return HtmlService.createHtmlOutput(
    '<!doctype html><html><head><meta name="viewport" content="width=device-width,initial-scale=1">' +
    '<title>AgriSentry Feedback</title></head><body style="font:16px Arial,sans-serif;max-width:600px;margin:80px auto;padding:24px;color:#0b5d43">' +
    '<h1>' + title + '</h1><p>' + message + '</p>' +
    '<p><a href="https://vanix19.github.io/Agrisentry/">Back to AgriSentry</a></p></body></html>'
  );
}

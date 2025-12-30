# Assets Directory

This directory contains the digital products for the store.

## PDF Setup

To enable PDF delivery, place your PDF file here with the following name:

```
Fundamentos_Python_Ian_Saura.pdf
```

### Required file:
- `Fundamentos_Python_Ian_Saura.pdf` - The Python programming book that will be delivered via email

### Security Notes:
- This directory should be protected from direct web access
- PDF files are delivered via secure email only
- Never expose direct download links to PDF files

### File Requirements:
- Format: PDF
- Size: Recommended under 10MB for email delivery
- Name: Must match exactly `Fundamentos_Python_Ian_Saura.pdf`

## How PDF Delivery Works:

1. User purchases through https://onei.la/10x
2. Payment processor redirects to success page with token
3. Success page calls `/api/pdf-delivery.php` with payment token
4. System validates payment and sends PDF via email
5. User receives PDF attachment in their email

## Testing:

Use the success page with test parameters:
```
/success.html?token=test123456789012345678901234567890&email=test@example.com&name=Test%20User
``` 
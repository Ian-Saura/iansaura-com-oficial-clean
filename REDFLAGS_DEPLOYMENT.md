# Red Flags Lead Magnet - Deployment Guide

## ✅ Completed Setup

### 1. Landing Page
- **URL**: `iansaura.com/redflags`
- **Component**: `src/pages/RedFlags.tsx`
- **Route**: Added to `src/App.tsx`
- **Status**: ✅ Built and ready

### 2. API Endpoint
- **Endpoint**: `/api/redflags-delivery.php`
- **Functionality**: 
  - Receives email via POST request
  - Validates email address
  - Sends PDF as email attachment via SMTP
  - Does NOT expose PDF URL publicly
  - Logs all deliveries
- **Status**: ✅ Created and tested

### 3. PDF File
- **Location**: `public/15-RED-FLAGS-EN-TU-CODIGO-DE-DATA-ENGINEERING.pdf`
- **Size**: 1.65 MB
- **Delivery**: Email attachment only (not exposed via direct URL)
- **Status**: ✅ Present and accessible

### 4. Email Template
- **Design**: HTML email with branding
- **Content**: 
  - Welcome message
  - PDF attached
  - CTAs to bootcamps and mentorías
  - Professional signature
- **Status**: ✅ Configured in API

### 5. SMTP Configuration
- **Provider**: Ferozo SMTP
- **Host**: c2621673.ferozo.com
- **Port**: 465 (SSL)
- **From**: info@iansaura.com
- **Status**: ✅ Tested and reachable

### 6. Logging
- **Log File**: `logs/redflags-delivery.log`
- **Error Log**: `logs/redflags-delivery-errors.log`
- **Status**: ✅ Directory writable

## 🚀 Deployment Steps

### Step 1: Verify Local Build
```bash
npm run build
php tests/test-redflags-funnel.php
```

### Step 2: Deploy to Production
```bash
# Use your existing deployment script
./deploy-ferozo.sh
```

### Step 3: Verify Production
1. Visit `https://iansaura.com/redflags`
2. Enter a test email address
3. Check email inbox for PDF delivery
4. Verify PDF attachment opens correctly

### Step 4: Monitor Logs
```bash
# On production server
tail -f logs/redflags-delivery.log
```

## 📊 Testing Checklist

- [x] PDF file exists and is readable
- [x] API endpoint exists
- [x] Email validation works
- [x] SMTP server is reachable
- [x] Logs directory is writable
- [x] JSON encoding/decoding works
- [x] React build exists
- [x] .htaccess is configured correctly

## 🎯 How the Funnel Works

1. **User visits**: `iansaura.com/redflags`
2. **User enters email** in the form
3. **Frontend sends POST** to `/api/redflags-delivery.php` with JSON: `{"email": "user@example.com"}`
4. **Backend validates** email address
5. **Backend reads PDF** from `public/` directory (not exposed)
6. **Backend sends email** via SMTP with PDF attached
7. **User receives email** with PDF in their inbox
8. **Success message** shown on landing page
9. **CTAs** encourage user to explore bootcamps/mentorías

## 🔒 Security Features

- ✅ PDF not directly accessible via URL
- ✅ Email validation on backend
- ✅ SMTP over SSL (port 465)
- ✅ CORS configured for allowed origins
- ✅ Input sanitization (htmlspecialchars, filter_var)
- ✅ Error logging without exposing sensitive data
- ✅ .htaccess protects sensitive files

## 📈 Analytics & Conversion Tracking

### Recommended Next Steps:
1. **Add Google Analytics** event tracking on form submission
2. **Track email opens** (optional: use email tracking pixels)
3. **Monitor conversion rate** from landing page to bootcamp signup
4. **A/B test** different headlines and CTAs

### Key Metrics to Track:
- Landing page visits
- Form submissions
- Email delivery rate
- PDF download/open rate
- Bootcamp page visits from email CTAs
- Conversion to paid products

## 🎨 Marketing Integration

### Traffic Sources:
- LinkedIn posts
- Instagram stories/posts
- TikTok videos
- Email signature
- YouTube video descriptions
- Blog posts

### Short URL:
Consider creating a short link for easy sharing:
- `iansaura.com/redflags` (already short!)
- Or use bit.ly/ian-redflags for tracking

## 🔧 Maintenance

### Weekly Tasks:
- Check logs for errors: `logs/redflags-delivery-errors.log`
- Monitor delivery success rate
- Review email bounces

### Monthly Tasks:
- Analyze conversion funnel
- Update email template if needed
- Test from different email providers (Gmail, Outlook, etc.)

## 🆘 Troubleshooting

### Issue: Email not received
**Possible causes:**
1. Email in spam folder
2. SMTP credentials incorrect
3. Server IP blacklisted
4. Email address invalid

**Solution:**
- Check logs: `logs/redflags-delivery.log`
- Verify SMTP connection
- Test with different email providers

### Issue: PDF not attached
**Possible causes:**
1. PDF file moved or deleted
2. File permissions issue
3. SMTP size limit exceeded

**Solution:**
- Verify PDF exists: `public/15-RED-FLAGS-EN-TU-CODIGO-DE-DATA-ENGINEERING.pdf`
- Check file permissions
- Verify PDF size < 10MB

### Issue: Form not submitting
**Possible causes:**
1. CORS issue
2. API endpoint not reachable
3. JavaScript error

**Solution:**
- Check browser console
- Verify API URL in RedFlags.tsx
- Test API directly with curl

## 📞 Support

For issues, contact:
- Developer: (you!)
- Email: info@iansaura.com

---

## 🎉 Launch Checklist

Before announcing publicly:

- [ ] Deploy to production
- [ ] Test with real email addresses
- [ ] Verify PDF delivery works
- [ ] Check mobile responsiveness
- [ ] Test on different browsers (Chrome, Firefox, Safari)
- [ ] Verify email looks good on Gmail, Outlook, Apple Mail
- [ ] Set up analytics tracking
- [ ] Prepare social media posts
- [ ] Create short links for sharing
- [ ] Update email signature with link
- [ ] Add to website navigation (optional)

**Ready to launch!** 🚀





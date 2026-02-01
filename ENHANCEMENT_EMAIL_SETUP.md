# 📧 Enhancement Request Email Setup

## Quick Configuration

The enhancement request form now automatically opens the user's email client with a pre-filled message.

---

## 🔧 **Setup Required: Update Support Email**

### **Step 1: Edit enhancement-request.html**

1. Open `enhancement-request.html` in a text editor
2. Find this line (around line 530):
   ```javascript
   const supportEmail = 'support@yourcompany.com'; // UPDATE THIS!
   ```

3. Replace with your actual support email:
   ```javascript
   const supportEmail = 'youremail@example.com';
   ```

### **Example:**
```javascript
// Before:
const supportEmail = 'support@yourcompany.com'; // UPDATE THIS!

// After:
const supportEmail = 'patrick@docucapture.com';
```

---

## 📋 **How It Works**

### **User Experience:**
1. User fills out enhancement request form
2. Clicks "Submit Request"
3. **Email client opens automatically** with:
   - To: Your support email
   - Subject: "DocuCapture Enhancement Request: [Title] [Reference ID]"
   - Body: Complete form details formatted nicely
4. User sends the email
5. Success message displays

### **What You Receive:**
```
DOCUCAPTURE ENHANCEMENT REQUEST
Reference ID: ER-12345678
Submitted: 2/1/2026, 3:30:45 PM

═══════════════════════════════════════

CONTACT INFORMATION
Name: John Doe
Email: john@company.com
Organization: Acme Corp

REQUEST DETAILS
Type: New Feature
Priority: HIGH

Title: Add PowerPoint export

Description:
It would be great if we could export directly to PowerPoint...

Use Case:
We create training presentations weekly...

Affected Areas:
Export, UI

Current Workaround:
Manually copy screenshots to PowerPoint

Additional Information:
This would save us 2 hours per week

═══════════════════════════════════════
Please review and respond to: john@company.com
```

---

## 💾 **Data Storage**

Enhancement requests are stored in **two places**:

1. **User's browser localStorage** - For their reference
2. **Email to you** - Primary notification method

---

## ✅ **Benefits of This Approach**

- ✅ **No server required** - Works immediately
- ✅ **No third-party dependencies** - No EmailJS, Formspree, etc.
- ✅ **Privacy-friendly** - Data goes directly to you
- ✅ **User can edit** - They can add more details before sending
- ✅ **Professional format** - Clean, organized email

---

## ⚠️ **Limitations**

- Requires user to have email client configured (Gmail, Outlook, etc.)
- Some browsers may block `mailto:` links (rare)
- User must manually send the email (not automatic)

---

## 🆘 **Troubleshooting**

**Email doesn't open automatically?**
- User needs default email client configured
- Some browsers ask permission first
- User can copy Reference ID and email manually

**Want fully automatic emails?**
- Would require server-side integration (Option B or C from earlier)
- Current solution works for most use cases

---

## 🔄 **Alternative: Change to Different Email**

You can set different emails for different purposes:

```javascript
// Support requests
const supportEmail = 'support@yourcompany.com';

// Or route to specific person
const supportEmail = 'patrick@example.com';

// Or use a shared inbox
const supportEmail = 'team@yourcompany.com';
```

---

## 📊 **Viewing Submitted Requests**

Users can also view their submitted requests by:
1. Opening browser console (F12)
2. Going to Application → Local Storage
3. Finding `enhancementRequests`

**Or you can add a simple admin page to view all requests** (optional - let me know if you want this!)

---

## ✅ **Setup Complete!**

Once you update the support email address:
1. Save the file
2. Upload to GitHub
3. Test by submitting a request
4. You should receive an email!

---

**Questions? The enhancement request form is ready to collect user feedback!** 🚀

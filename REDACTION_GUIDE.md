# 🔒 Data Redaction Feature Guide

## Overview

DocuCapture includes intelligent redaction tools to protect sensitive information in your documentation. The system automatically detects potential sensitive data and provides powerful redaction tools.

---

## 🎯 Key Features

### Automatic Detection
The system automatically scans captured screenshots for potential sensitive information:
- Password fields
- Email addresses
- Account numbers
- Credit card patterns
- Social Security numbers
- API keys and tokens
- Phone numbers

### Visual Alerts
When sensitive data is detected:
- ⚠ Red border highlights the step
- Alert banner shows detected items
- Status bar displays warning message
- "Redact Data" button prominently displayed

### Three Redaction Methods

**1. Blur** (Recommended)
- Applies gaussian blur effect
- Makes text unreadable while showing something was there
- Professional appearance
- **Best for**: Most use cases

**2. Pixelate**
- Creates mosaic/pixel effect
- Strong visual indicator of redaction
- Modern look
- **Best for**: Creative documentation, when you want redaction to be obvious

**3. Black Box**
- Solid black rectangle
- Complete coverage
- Maximum privacy
- **Best for**: Highly sensitive data, when complete obscuring is required

---

## 📋 How to Use

### Automatic Detection (Recommended Workflow)

1. **Capture Your Screenshot**
   - Click "Capture Step" as usual
   - System automatically scans for sensitive patterns

2. **Review Detection Alert**
   - If sensitive data is detected, you'll see:
     - Red border around the step
     - ⚠ Alert banner listing detected items
     - Warning in status bar

3. **Open Redaction Tool**
   - Click the "Redact Data" button
   - Review the detected items list
   - Proceed to manual redaction

4. **Apply Redactions**
   - Choose redaction style (Blur, Pixelate, or Black Box)
   - Click and drag on sensitive areas
   - Apply multiple redactions as needed
   - Click "Apply & Save"

### Manual Redaction (For Any Screenshot)

1. **Open Redaction Tool**
   - Click "Redact Data" on any step with a screenshot
   - Or click directly on the screenshot

2. **Select Redaction Style**
   - Choose from: Blur, Pixelate, or Black Box
   - Can change between redactions

3. **Draw Redaction Areas**
   - Click and drag to select area to redact
   - Release to apply redaction
   - Repeat for multiple areas

4. **Refine as Needed**
   - Click "Undo Last" to remove last redaction
   - Click "Clear All" to start over
   - Continue adding redactions until satisfied

5. **Save Changes**
   - Click "Apply & Save" to finalize
   - Step will be updated with redacted image
   - Alert banner will be removed

---

## 🛡️ Sensitive Data Patterns Detected

The system looks for these patterns:

| Type | What It Detects | Example |
|------|----------------|---------|
| **Passwords** | Password fields, labels | "Password:", "pwd:", "secret" |
| **Credit Cards** | 16-digit card numbers | 4532-1234-5678-9010 |
| **SSN** | Social Security numbers | 123-45-6789 |
| **Email** | Email addresses | user@company.com |
| **Phone** | Phone numbers | (555) 123-4567 |
| **API Keys** | API keys, tokens | "api_key", "bearer", "token" |
| **Accounts** | Account numbers | "Account #12345" |

---

## 💡 Best Practices

### When to Redact
✅ **Always redact**:
- Passwords and login credentials
- Credit card numbers
- Social Security numbers
- Bank account numbers
- API keys and tokens
- Employee ID numbers
- Personal addresses
- Confidential business data

✅ **Consider redacting**:
- Email addresses (if public documentation)
- Phone numbers
- Internal IP addresses
- Customer names (depending on context)

### Redaction Tips

**1. Review Before Sharing**
- Always review all screenshots before exporting
- Check for data in unexpected places (URLs, error messages, etc.)
- Look for reflections in shiny surfaces (mirrors, monitors)

**2. Choose Appropriate Method**
- **Blur**: General use, professional look
- **Pixelate**: When you want to be obvious about redaction
- **Black Box**: Maximum security, complete coverage

**3. Be Thorough**
- Redact data in multiple places if it appears more than once
- Check status bars, title bars, and URL fields
- Review system notifications and pop-ups

**4. Test Your Redactions**
- Zoom in to ensure text is unreadable
- Check that important context remains visible
- Verify redaction quality before exporting

---

## 🚨 Important Security Notes

### What Gets Detected vs. What Doesn't

**✅ Currently Detected:**
- Common password field patterns
- Standard formatted data (SSN, credit cards)
- Common sensitive keywords

**⚠ May Not Detect:**
- Custom formatted data
- Sensitive data without standard patterns
- Data in images within screenshots
- Handwritten information
- Encoded or encrypted data

**Important**: Automatic detection is a helper tool, not a guarantee. **Always manually review** all screenshots before sharing.

### Detection Limitations

The automatic detection system:
- Uses pattern matching (not OCR in this version)
- May have false positives (flagging non-sensitive data)
- May have false negatives (missing some sensitive data)
- Works best with standard formats

**Best Practice**: Treat automatic detection as a reminder to review, not a complete solution.

---

## 🔄 Workflow Examples

### Example 1: Banking Application Training

**Scenario**: Creating guide for online banking login

**Steps**:
1. Capture login screen
2. System detects: "Password field"
3. Open redaction tool
4. Use **Black Box** to redact password field
5. Use **Blur** to redact account number
6. Apply and continue

**Result**: Safe training documentation without credentials

---

### Example 2: Customer Support Documentation

**Scenario**: Documenting how to look up customer accounts

**Steps**:
1. Capture customer record screen
2. System detects: Email, phone number
3. Open redaction tool
4. Use **Pixelate** for customer email
5. Use **Pixelate** for customer phone
6. Leave customer name visible (if appropriate)
7. Apply and continue

**Result**: Clear documentation that protects PII

---

### Example 3: Software Configuration

**Scenario**: Documenting API setup process

**Steps**:
1. Capture API configuration screen
2. System detects: "API key"
3. Open redaction tool
4. Use **Black Box** for API key
5. Use **Black Box** for secret key
6. Leave field labels visible for reference
7. Apply and continue

**Result**: Useful guide without exposing credentials

---

## 📤 Export Behavior

### What Happens to Redacted Images

**HTML Export**: Redacted images are embedded as base64 (redactions preserved)
**Markdown Export**: Redacted images are embedded as base64 (redactions preserved)
**PDF Export**: Redacted images are printed (redactions preserved)
**JSON Export**: Redacted images included for analyst review

**Important**: Once redacted and saved, the original unredacted image is replaced. Keep backup copies if you need original screenshots.

---

## ❓ FAQ

**Q: Can I undo redactions after saving?**
A: No, once you click "Apply & Save", redactions are permanent. Use "Undo Last" or "Clear All" before saving.

**Q: Does this work for uploaded images?**
A: Yes! Any step with a screenshot can be redacted, whether captured or uploaded.

**Q: Will redacted data appear in the analysis tool?**
A: Only if you export after redacting. Redacted images are included in exports.

**Q: How accurate is automatic detection?**
A: It's a helpful reminder but not perfect. Always manually review all screenshots.

**Q: Can I redact non-sensitive data?**
A: Yes! You can redact anything - the tool doesn't limit what you can redact.

**Q: What if I forget to redact something?**
A: You can always go back, click "Redact Data" on any step, add more redactions, and save again.

**Q: Does it work on mobile?**
A: The redaction tool works best on desktop/laptop with a mouse. Touch/mobile support is limited.

---

## 🆘 Troubleshooting

**Alert shows but I don't see sensitive data**
- Detection may have false positive
- Review anyway - data might be there
- You can ignore alert if no sensitive data present

**Sensitive data not detected**
- Detection isn't perfect
- Manually review all screenshots
- Use manual redaction tool

**Redaction looks blurry/poor quality**
- This is intentional - data should be unreadable
- Try different redaction method
- Increase redaction area size

**Can't click and drag**
- Make sure you're in redaction modal
- Check that you've selected a redaction style
- Try refreshing and opening tool again

---

## 🔐 Privacy Compliance

### GDPR Considerations
- Redact personal data before sharing
- Consider right to be forgotten
- Document what data was redacted

### HIPAA Considerations
- Redact all PHI (Protected Health Information)
- Use strongest redaction (Black Box) for medical data
- Maintain audit trail of redactions

### PCI-DSS Considerations
- Never capture full credit card numbers
- Redact even partial card numbers
- Use Black Box for payment data

---

**Security is everyone's responsibility. Always review before sharing!** 🔒

---

*For technical support or questions about the redaction feature, refer to the main documentation or contact your system administrator.*

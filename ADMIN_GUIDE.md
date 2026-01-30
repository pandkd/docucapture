# 🔧 DocuCapture - System Administrator Guide

This guide is for system administrators who need to deploy and manage DocuCapture for their organization.

---

## 📋 Table of Contents

1. [System Requirements](#system-requirements)
2. [Deployment Options](#deployment-options)
3. [GitHub Pages Deployment (Recommended)](#github-pages-deployment)
4. [Alternative Hosting Options](#alternative-hosting-options)
5. [Configuration](#configuration)
6. [User Management](#user-management)
7. [Maintenance & Updates](#maintenance--updates)
8. [Troubleshooting](#troubleshooting)
9. [Security Considerations](#security-considerations)

---

## 🖥️ System Requirements

### Server Requirements (for hosting)
- **Web Server**: Any static file server (Apache, Nginx, IIS, or cloud hosting)
- **HTTPS**: Required for screen capture functionality
- **Storage**: Minimal (~5MB for all files)
- **Bandwidth**: Low (static HTML/CSS/JS only)

### Client Requirements (for users)
- **Browser**: Chrome 72+, Edge 79+, Firefox 66+, Safari 13+
- **Operating System**: Windows 10+, macOS 10.15+, Linux
- **Internet**: Required for hosted capture tool
- **Permissions**: Screen recording permission (browser will prompt)

---

## 🚀 Deployment Options

### Option 1: GitHub Pages (Recommended - FREE)
- ✅ Free hosting
- ✅ Automatic HTTPS
- ✅ Global CDN
- ✅ Easy updates
- ✅ Version control
- **Best for**: Most organizations

### Option 2: Internal Web Server
- ✅ Complete control
- ✅ Stays on internal network
- ✅ Custom domain
- ⚠️ Requires IT infrastructure
- **Best for**: Large enterprises with strict security requirements

### Option 3: Cloud Hosting (AWS, Azure, Netlify, Vercel)
- ✅ Professional hosting
- ✅ Custom domains
- ✅ Advanced features
- ⚠️ May have costs
- **Best for**: Organizations with existing cloud infrastructure

---

## 🌐 GitHub Pages Deployment (Recommended)

### Prerequisites
- GitHub account (free)
- All DocuCapture files downloaded

### Step-by-Step Deployment

#### 1. Create GitHub Repository
1. Go to [github.com](https://github.com) and sign in
2. Click **"+"** (top right) → **"New repository"**
3. Repository settings:
   - **Name**: `docucapture` (or your preferred name)
   - **Visibility**: **Public** (required for free GitHub Pages)
   - **Initialize**: Leave all checkboxes unchecked
4. Click **"Create repository"**

#### 2. Upload Files
**Method A: Web Interface (Easiest)**
1. On your new repository page, click **"uploading an existing file"**
2. Drag and drop these files:
   ```
   ✅ index.html
   ✅ capture.html
   ✅ analyze.html
   ✅ tutorial.html
   ✅ enhancement-request.html
   ✅ README.md
   ✅ USER_GUIDE.md
   ✅ QUICK_START.md
   ✅ DEPLOYMENT_CHECKLIST.md
   ✅ CAPTURE_CAPABILITIES.md
   ✅ REDACTION_GUIDE.md
   ```
3. Commit message: "Initial deployment - DocuCapture v1.0"
4. Click **"Commit changes"**

**Method B: Command Line (For Git Users)**
```bash
# Navigate to your DocuCapture folder
cd /path/to/docucapture

# Initialize git repository
git init

# Add all files
git add .

# Commit
git commit -m "Initial deployment - DocuCapture v1.0"

# Add remote (replace YOUR-USERNAME and REPO-NAME)
git remote add origin https://github.com/YOUR-USERNAME/REPO-NAME.git

# Push to GitHub
git branch -M main
git push -u origin main
```

#### 3. Enable GitHub Pages
1. In your repository, go to **Settings** (top menu bar)
2. Scroll to **"Pages"** in the left sidebar
3. Under **"Source"**:
   - Branch: Select **"main"**
   - Folder: Select **"/ (root)"**
4. Click **"Save"**
5. Wait 2-3 minutes for deployment

#### 4. Get Your URL
- GitHub Pages URL: `https://[your-username].github.io/[repository-name]/`
- Example: `https://johndoe.github.io/docucapture/`
- Copy this URL for distribution to users

#### 5. Test Deployment
1. Open the URL in your browser
2. Verify landing page loads
3. Test capture tool functionality
4. Download and test analyze.html locally
5. Check tutorial and enhancement request pages

### Custom Domain (Optional)
If you want a custom domain like `docucapture.yourcompany.com`:

1. In repository **Settings** → **Pages**
2. Under "Custom domain", enter your domain
3. Click **"Save"**
4. Configure DNS:
   - Add CNAME record pointing to `[username].github.io`
   - Wait for DNS propagation (up to 24 hours)
5. Enable "Enforce HTTPS" (appears after DNS verification)

---

## 🏢 Alternative Hosting Options

### Option 1: Internal Web Server

**Apache Configuration**
```apache
<VirtualHost *:443>
    ServerName docucapture.internal.company.com
    DocumentRoot /var/www/docucapture
    
    SSLEngine on
    SSLCertificateFile /path/to/certificate.crt
    SSLCertificateKeyFile /path/to/private.key
    
    <Directory /var/www/docucapture>
        Options -Indexes +FollowSymLinks
        AllowOverride None
        Require all granted
    </Directory>
</VirtualHost>
```

**Nginx Configuration**
```nginx
server {
    listen 443 ssl;
    server_name docucapture.internal.company.com;
    
    ssl_certificate /path/to/certificate.crt;
    ssl_certificate_key /path/to/private.key;
    
    root /var/www/docucapture;
    index index.html;
    
    location / {
        try_files $uri $uri/ =404;
    }
}
```

### Option 2: Netlify

1. Go to [netlify.com](https://netlify.com)
2. Sign up for free account
3. Drag and drop your folder
4. Get instant URL
5. Optional: Configure custom domain

### Option 3: AWS S3 + CloudFront

1. Create S3 bucket
2. Enable static website hosting
3. Upload files
4. Create CloudFront distribution
5. Configure SSL certificate

---

## ⚙️ Configuration

### File Structure
```
docucapture/
├── index.html                  # Landing page
├── capture.html                # Capture tool (host remotely)
├── analyze.html                # Analyst tool (users download)
├── tutorial.html               # Interactive tutorial
├── enhancement-request.html    # Feature request form
├── README.md                   # User documentation
├── USER_GUIDE.md              # Detailed user guide
├── ADMIN_GUIDE.md             # This file
├── QUICK_START.md             # Quick reference
├── DEPLOYMENT_CHECKLIST.md    # Deployment steps
├── CAPTURE_CAPABILITIES.md    # What can be captured
└── REDACTION_GUIDE.md         # Security features
```

### Customization Options

#### 1. Branding
Edit these files to add your company branding:

**Colors** (search and replace in all HTML files):
```css
/* Primary blue: #2c5282 */
/* Gradient: #1e40af to #0c4a6e */
```

**Logo** (add to index.html):
```html
<div class="header">
    <img src="your-logo.png" alt="Company Logo">
    <h1>DocuCapture</h1>
</div>
```

#### 2. Support Contact
Update support links in:
- `index.html` - Footer
- `enhancement-request.html` - Form submission
- `README.md` - Contact section

#### 3. Analytics (Optional)
Add Google Analytics or similar:
```html
<!-- Add before </head> in index.html, capture.html, tutorial.html -->
<script async src="https://www.googletagmanager.com/gtag/js?id=YOUR-ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'YOUR-TRACKING-ID');
</script>
```

---

## 👥 User Management

### User Access

**For Capture Tool** (Remote):
- Share URL with all users who need to create documentation
- No login required
- Works from any device with internet

**For Process Analyst** (Local):
- Distribute `analyze.html` file directly
- Users download and run on their computers
- Keep this file internal (contains analysis features)

### Distribution Methods

**Option 1: Email**
```
Subject: DocuCapture - New Documentation Tool

Team,

We've deployed DocuCapture for creating process documentation:

📹 Capture Tool: https://your-url-here.github.io/docucapture/
📖 Tutorial: https://your-url-here.github.io/docucapture/tutorial.html

For process analysis, download the analyst tool:
[Attach analyze.html]

Questions? See the user guide or submit an enhancement request.
```

**Option 2: Internal Wiki/Portal**
- Add bookmark to company intranet
- Include in onboarding materials
- Add to IT tools catalog

**Option 3: Slack/Teams**
- Pin link in relevant channels
- Add to team resources

### Training Users

**Recommended Approach:**
1. Send link to interactive tutorial
2. Schedule 15-minute demo session
3. Provide USER_GUIDE.md as reference
4. Be available for questions

**Key Points to Cover:**
- How to start recording
- Capturing steps effectively
- Redacting sensitive data
- Exporting documentation
- When to use Process Analyst

---

## 🔄 Maintenance & Updates

### Updating Files

#### GitHub Pages (Web Interface):
1. Go to repository on GitHub
2. Click file to edit
3. Click pencil icon
4. Make changes
5. Commit changes
6. Wait 1-2 minutes for deployment

#### GitHub Pages (Command Line):
```bash
# Make your changes to local files
# Then:
git add .
git commit -m "Description of changes"
git push
```

#### Other Hosting:
- Upload updated files via FTP/SFTP
- Use your hosting provider's file manager
- Update files on server directly

### Version Control

**Recommended Practice:**
- Tag releases: `git tag v1.0`, `git tag v1.1`
- Document changes in CHANGELOG.md
- Test updates before deploying
- Keep backup of previous version

### Monitoring Usage

**Enhancement Requests:**
- Check browser localStorage for submissions
- Set up server endpoint to receive requests (optional)
- Review and prioritize user feedback

**User Feedback:**
- Monitor enhancement-request.html submissions
- Track common issues
- Identify training needs

---

## 🐛 Troubleshooting

### Common Issues

**Issue: Screen capture not working**
- ✅ Verify HTTPS is enabled (required)
- ✅ Check browser compatibility
- ✅ Ensure user grants permission
- ✅ Try different browser

**Issue: Files not loading**
- ✅ Verify file paths are correct
- ✅ Check browser console for errors
- ✅ Ensure all files uploaded
- ✅ Clear browser cache

**Issue: Redaction not saving**
- ✅ Ensure user clicks "Apply & Save"
- ✅ Check browser console for errors
- ✅ Verify localStorage not blocked

**Issue: Analysis not working**
- ✅ Confirm analyze.html is running locally
- ✅ Verify JSON file format is correct
- ✅ Check browser console for errors
- ✅ Ensure API access is available

### Browser Compatibility

| Browser | Minimum Version | Screen Capture | Redaction | Analysis |
|---------|----------------|----------------|-----------|----------|
| Chrome | 72+ | ✅ | ✅ | ✅ |
| Edge | 79+ | ✅ | ✅ | ✅ |
| Firefox | 66+ | ✅ | ✅ | ✅ |
| Safari | 13+ | ✅ | ✅ | ✅ |

### Getting Help

1. Check USER_GUIDE.md FAQ section
2. Review TROUBLESHOOTING section in docs
3. Check browser console (F12) for errors
4. Search existing enhancement requests
5. Submit new enhancement request

---

## 🔒 Security Considerations

### Data Privacy

**What stays local:**
- All screenshots (until exported)
- Step descriptions
- Redaction work
- Enhancement requests (stored in localStorage)

**What gets sent to analysis:**
- Only step descriptions (no screenshots)
- When user explicitly exports for analysis
- Only if analyze tool is used

### Best Practices

**For Administrators:**
1. ✅ Use HTTPS (required for screen capture)
2. ✅ Keep analyze.html internal only
3. ✅ Train users on redaction features
4. ✅ Regular security audits
5. ✅ Monitor enhancement requests
6. ✅ Keep files updated

**For Users:**
1. ✅ Always redact sensitive data
2. ✅ Review screenshots before sharing
3. ✅ Use appropriate redaction method
4. ✅ Don't share unredacted exports
5. ✅ Keep analyze.html file secure

### Compliance

**GDPR:**
- Redact personal data before sharing
- Document what data is collected
- Provide data deletion capability

**HIPAA:**
- Redact all PHI (Protected Health Information)
- Use Black Box redaction for medical data
- Limit access to authorized personnel

**PCI-DSS:**
- Never capture full credit card numbers
- Redact payment information
- Follow data handling procedures

### Network Security

**Recommendations:**
- Host on internal network if possible
- Use VPN for remote access
- Implement access controls
- Monitor usage logs
- Regular security updates

---

## 📊 Deployment Checklist

Use this checklist for deployment:

### Pre-Deployment
- [ ] All files downloaded and verified
- [ ] Hosting platform selected
- [ ] HTTPS certificate ready (if self-hosting)
- [ ] Custom domain configured (if using)
- [ ] Branding customization complete
- [ ] Support contacts updated
- [ ] User access plan defined

### Deployment
- [ ] Files uploaded to hosting
- [ ] HTTPS enabled and verified
- [ ] All pages load correctly
- [ ] Screen capture tested
- [ ] Redaction tools tested
- [ ] Export functionality tested
- [ ] Tutorial accessible
- [ ] Enhancement request form working

### Post-Deployment
- [ ] URL shared with users
- [ ] Tutorial link distributed
- [ ] analyze.html distributed securely
- [ ] User training scheduled
- [ ] Documentation accessible
- [ ] Feedback channel established
- [ ] Monitoring in place

---

## 📞 Support & Resources

### Documentation Files
- **README.md** - Overview and quick start (for users)
- **USER_GUIDE.md** - Complete user documentation
- **ADMIN_GUIDE.md** - This file (for admins)
- **QUICK_START.md** - Fast reference guide
- **CAPTURE_CAPABILITIES.md** - What can be captured
- **REDACTION_GUIDE.md** - Security features guide

### Key URLs (After Deployment)
- Landing Page: `https://your-domain/`
- Capture Tool: `https://your-domain/capture.html`
- Tutorial: `https://your-domain/tutorial.html`
- Enhancement Requests: `https://your-domain/enhancement-request.html`

### Getting Help
1. Review documentation
2. Check troubleshooting section
3. Review enhancement requests for similar issues
4. Contact your DocuCapture administrator

---

## 🎯 Success Metrics

### Track These Metrics:
- Number of active users
- Documentation created per week
- Enhancement requests submitted
- Common issues reported
- User satisfaction scores
- Training completion rates

### Improvement Opportunities:
- Regular user feedback sessions
- Monthly enhancement review
- Quarterly feature updates
- Annual security audit
- User training refreshers

---

## 📝 Notes

### Version Information
- **Current Version**: 1.0
- **Last Updated**: [Deployment Date]
- **Maintained By**: [Your Name/Team]

### Change Log
Keep track of updates:
```
v1.0 - Initial deployment
- All core features
- Redaction capabilities
- Process analysis
- Interactive tutorial
```

---

**Questions?** Review the documentation or submit an enhancement request!

**Ready to deploy?** Follow the GitHub Pages deployment section above for the easiest setup.

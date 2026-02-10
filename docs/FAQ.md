# ❓ DocuCapture - Frequently Asked Questions (FAQ)

**Quick answers to common questions**

---

## General Questions

### What is DocuCapture?

DocuCapture is a free desktop application that helps you create professional step-by-step documentation by automatically capturing screenshots as you work and organizing them into clear, shareable guides.

### How much does it cost?

**Completely free!** No subscription, no hidden fees, no feature limits.

### What makes DocuCapture different from Scribe?

| Feature | Scribe | DocuCapture |
|---------|--------|-------------|
| **Price** | $23-29/month | **FREE** |
| Multi-app capture | ✅ | ✅ |
| Global shortcuts | ✅ | ✅ |
| Timeline view | ❌ | ✅ |
| Smart grouping | ❌ | ✅ |
| AI redaction | Limited | ✅ |
| Open source | ❌ | ✅ |

### Is DocuCapture safe to use?

Yes! DocuCapture:
- Stores all data locally on your computer
- Doesn't send data to external servers
- Doesn't require internet connection (after installation)
- Open source (you can review the code)
- No telemetry or tracking

### What operating systems are supported?

Currently:
- ✅ Windows 10 (64-bit)
- ✅ Windows 11 (64-bit)

Coming soon:
- macOS
- Linux

---

## Installation & Setup

### How do I install DocuCapture?

1. Download `DocuCapture-Setup.exe`
2. Double-click to run
3. Click "More info" → "Run anyway" if SmartScreen appears
4. Follow the installation wizard
5. Launch from Start Menu

See the [Installation Guide](INSTALLATION_GUIDE.md) for details.

### Why does Windows show a security warning?

Windows SmartScreen shows this warning for new software without a paid code-signing certificate ($400+/year). DocuCapture is safe to install.

**To proceed:**
- Click "More info"
- Click "Run anyway"

### Do I need administrator rights to install?

Yes, to install to Program Files. But you can:
- Ask your IT department to install it
- Install to your user folder instead

### How much disk space does it need?

- Download: ~150 MB
- Installed: ~220 MB
- While running: ~300 MB RAM

### Can I install it on multiple computers?

Yes! Install on as many computers as you want. It's free.

---

## Using DocuCapture

### How do I capture a step?

Two ways:
1. **Keyboard:** Press `Ctrl + Shift + S` (works from any app!)
2. **Mouse:** Click "Capture Step" button

### Do I need to switch back to DocuCapture to capture?

No! Press `Ctrl + Shift + S` from any application. The floating button also stays on top.

### Can I capture across multiple applications?

Yes! That's the main feature. Document workflows that span Excel, browsers, QuickBooks, SAP, or any other applications.

### What if I capture too many steps?

Simply delete unwanted steps:
1. Click the step
2. Click "Delete" button
3. Steps automatically renumber

### Can I reorder steps?

Yes! Two ways:
1. **Timeline View:** Drag and drop thumbnails
2. **List View:** Use ↑↓ arrow buttons

### How do I add text to steps?

Click each step and type in the description field. Good descriptions make better documentation!

### Can I add steps without screenshots?

Yes! Click "Add Manual Step" for text-only steps like:
- "Wait 5 minutes"
- "Call customer"
- "Review results"

---

## Features

### What is Smart Grouping?

AI-powered feature that automatically organizes your steps into logical sections by analyzing the descriptions you wrote.

**Example:**
- All "login" steps → "Setup Phase"
- All "customer" steps → "Customer Information"
- All "save" steps → "Final Steps"

**To use:** Press `Ctrl + Shift + G` after adding descriptions.

### What is the Timeline View?

Visual horizontal view of your steps with thumbnail previews. Great for:
- Seeing the big picture
- Reordering multiple steps
- Long processes (15+ steps)
- Presentations

**Toggle:** Press `Ctrl + Shift + T`

### How does redaction work?

Two modes:

**Auto-Detect:**
- Finds SSN, credit cards, emails, passwords
- One-click to hide all

**Manual:**
- Click and drag to select area
- Choose: Blur, Pixelate, or Black Box
- Hide anything you want

### Can I edit the screenshots?

Currently you can:
- Redact (hide) sensitive areas
- Replace with uploaded image

Coming soon:
- Annotations
- Highlighting
- Arrows and callouts

### What export formats are available?

- **HTML** - Web page (best for sharing)
- **Markdown** - Plain text with formatting
- **PDF** - Via browser print function
- **JSON** - For analysis/integration

---

## Performance

### Is DocuCapture fast?

Yes! Captures are instant. However:
- First capture may take 1-2 seconds
- Subsequent captures are immediate
- Performance depends on your computer specs

### How many steps can I capture?

**Recommended:** 5-20 steps per session

**Technical limit:** 100+ steps possible, but:
- Larger files take longer to export
- More RAM usage
- Better to split into multiple sessions

### Does it slow down my computer?

Normal usage:
- ~300 MB RAM while running
- ~5% CPU during capture
- Minimal impact

High usage (50+ steps):
- More RAM needed
- May slow on older PCs
- Close other apps if needed

### Can I capture 4K screens?

Yes, but:
- Screenshots will be large (~5-10 MB each)
- Exports will be slower
- Consider capturing specific windows instead

---

## Troubleshooting

### The floating window disappeared!

Check:
1. Bottom-right corner (default location)
2. Behind other windows
3. On other monitor (if using multiple)
4. Recording indicator is on

**Fix:** Stop and restart recording.

### Keyboard shortcuts don't work

Possible causes:
1. Another app using same shortcuts
2. Recording not active
3. Need administrator rights

**Fix:**
- Run as administrator
- Close conflicting software
- Verify recording started

### Screenshots are poor quality

Check:
1. Capture specific window (not full screen)
2. Display scaling (should be 100%)
3. Application window size
4. Graphics drivers up to date

### Export failed

Common causes:
1. Disk full
2. File path too long
3. Permissions issue

**Fix:**
- Save to shorter path (C:\Temp)
- Free up disk space
- Run as administrator

### App won't start

Try:
1. Restart computer
2. Run as administrator
3. Reinstall application
4. Check Windows version (must be 64-bit)

---

## Exporting & Sharing

### How do I share my documentation?

**HTML files:**
- Email as attachment
- Upload to SharePoint/Wiki
- Post on internal network
- Host on website

**PDF files:**
- Email attachment
- Print for physical copies
- Archive for records

**Markdown:**
- GitHub/GitLab
- Developer documentation
- Version control

### Can multiple people work on same documentation?

Currently: No (single user)

Coming soon:
- Cloud sync
- Team collaboration
- Shared libraries

### Where are my exported files saved?

Default location: Documents folder

You choose location when exporting.

### Can I edit exported HTML files?

HTML files are self-contained and can be opened in text editors, but they're not designed for easy editing. Better to:
1. Edit in DocuCapture
2. Re-export

### How do I create a PDF?

1. Export as HTML
2. Open in browser
3. Press `Ctrl + P`
4. Select "Save as PDF"
5. Save file

---

## Advanced Questions

### Does DocuCapture work with virtual machines?

Yes! Capture from within the VM or capture the VM window.

### Can I automate captures?

Not currently. All captures are manual (keyboard or button).

Coming soon:
- Scheduled captures
- API for automation

### Can I integrate with other tools?

Export as JSON includes all data:
- Screenshots (base64)
- Timestamps
- Descriptions
- Metadata

Use JSON for custom integrations.

### Is there an API?

Not yet. Planned for future release.

### Can I customize the export template?

Not in current version. Coming soon:
- Custom CSS for HTML exports
- Template system
- Branding options

### Does it support multiple languages?

Currently: English only

Coming soon:
- Spanish
- French
- German
- Others based on demand

---

## Pricing & Licensing

### Is it really free forever?

Yes! No trials, no feature limits, no catch.

### Can I use it for commercial purposes?

Yes! Free for:
- Personal use
- Business use
- Commercial projects
- Training materials
- Anything you want

### What's the license?

MIT License - very permissive:
- Use for any purpose
- Modify if you want
- Distribute copies
- No attribution required (but appreciated!)

### Will you add paid features later?

Core features will always be free. Possible future paid add-ons:
- Cloud sync (optional)
- Advanced analytics
- Team features
- Priority support

But basic app stays free forever!

### Can I donate to support development?

Not yet set up, but thank you for wanting to support the project! ❤️

---

## Updates & Roadmap

### How do I update DocuCapture?

Currently: Manual updates
1. Download new version
2. Install over old version
3. Settings preserved

Coming soon: Auto-update checker

### What's coming next?

**Version 1.1 (Q2 2025):**
- Screenshot annotations
- Custom themes
- macOS support

**Version 1.2 (Q3 2025):**
- Cloud sync (optional)
- Team collaboration
- Video recording

**Version 2.0 (Q4 2025):**
- AI-powered descriptions
- Voice narration
- Advanced analytics

### Can I request features?

Yes! Please do:
1. Go to GitHub Issues
2. Click "New Issue"
3. Select "Feature Request"
4. Describe your idea

Or join the community forum!

### Is the source code available?

Yes! DocuCapture is open source:
- GitHub: [Link]
- MIT License
- Contributions welcome

---

## Getting Help

### Where can I get help?

**Documentation:**
- [Installation Guide](INSTALLATION_GUIDE.md)
- [User Manual](USER_MANUAL.md)
- This FAQ

**Community:**
- GitHub Discussions
- Community Forum (coming soon)

**Bug Reports:**
- GitHub Issues

**Video Tutorials:**
- YouTube channel (coming soon)

### How do I report a bug?

1. Go to GitHub Issues
2. Click "New Issue"
3. Select "Bug Report"
4. Include:
   - What you were doing
   - What happened
   - What you expected
   - Your Windows version
   - Screenshots if helpful

### Is there email support?

Not currently - use GitHub Issues instead. Response within 24-48 hours typically.

---

## Comparison Questions

### DocuCapture vs SnagIt?

| Feature | SnagIt | DocuCapture |
|---------|--------|-------------|
| Price | $50 one-time | Free |
| Screenshots | ✅ Manual | ✅ Workflow |
| Process docs | ❌ | ✅ |
| Global shortcuts | ✅ | ✅ |
| Smart grouping | ❌ | ✅ |

**DocuCapture is for processes, SnagIt for individual images.**

### DocuCapture vs Loom?

| Feature | Loom | DocuCapture |
|---------|------|-------------|
| Focus | Video | Screenshots |
| Price | Free/Paid tiers | Free |
| File size | Large | Small |
| Editing | Complex | Simple |
| Sharing | Cloud only | Any method |

**DocuCapture creates lighter-weight step-by-step guides.**

### DocuCapture vs screen recording?

**Screen recording:**
- Large files
- Hard to skip around
- Can't edit easily
- Bandwidth-intensive

**DocuCapture:**
- Small files
- Jump to any step
- Edit anytime
- Easy sharing

**Use DocuCapture for processes, video for complex interactions.**

---

## Privacy & Security

### What data does DocuCapture collect?

**None!** DocuCapture:
- Doesn't connect to internet (after installation)
- Doesn't track usage
- Doesn't collect telemetry
- Doesn't send screenshots anywhere
- Everything stays on your computer

### Where is my data stored?

All data stored locally:
- Application: `C:\Program Files\DocuCapture`
- Your documents: Where you choose to export
- Temporary data: `%TEMP%` (cleared on close)

### Can I use it offline?

Yes! After installation, DocuCapture works completely offline.

### Is it GDPR compliant?

Yes - because it doesn't collect any personal data!

### Can IT departments audit it?

Yes! Source code is open source on GitHub. IT can review before deployment.

---

## Still Have Questions?

**Can't find your answer?**

1. Check the [User Manual](USER_MANUAL.md)
2. Visit [GitHub Discussions]
3. Open an [Issue on GitHub]
4. Join the [Community Forum]

**We're here to help!** 😊

---

*Last updated: [Date]*
*DocuCapture FAQ v1.0.0*

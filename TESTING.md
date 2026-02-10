# Testing DocuCapture

## Manual Testing Checklist

Since this is an Electron desktop application, manual testing is required. Here's how to test:

### Build and Run
```bash
npm run build
npm start
```

### Test Cases

#### 1. Application Startup
- [ ] Application window opens with correct size (1200x800)
- [ ] Welcome screen is displayed
- [ ] Sidebar shows project details section

#### 2. Project Management
- [ ] Can set project name
- [ ] Can set project description
- [ ] "New Project" menu item works (Cmd/Ctrl+N)

#### 3. Screenshot Capture
- [ ] "Capture Screenshot" button is visible
- [ ] Clicking button captures screen
- [ ] Screenshot appears in steps list
- [ ] Screenshot is displayed in step editor

#### 4. Step Management
- [ ] Can edit step title
- [ ] Can edit step description
- [ ] Can select different steps
- [ ] Can reorder steps (up/down buttons)
- [ ] Can delete steps

#### 5. Save/Load
- [ ] Can save project to .json file
- [ ] Can load project from .json file
- [ ] Screenshots are saved to _files directory
- [ ] Loaded project retains all data

#### 6. Export
- [ ] Can export to HTML
- [ ] HTML file is well-formatted
- [ ] Screenshots are embedded as base64
- [ ] HTML displays correctly in browser

#### 7. Keyboard Shortcuts
- [ ] Cmd/Ctrl+N creates new project
- [ ] Cmd/Ctrl+O opens project
- [ ] Cmd/Ctrl+S saves project
- [ ] Cmd/Ctrl+Shift+S captures screenshot

#### 8. Security
- [ ] No console errors about CSP violations
- [ ] contextIsolation is enabled
- [ ] nodeIntegration is disabled
- [ ] IPC communication works through preload script

## Expected Behavior

### On First Run
1. Welcome screen with getting started instructions
2. Empty project with "New Project" as default name
3. No steps in the list

### After Capturing Screenshot
1. New step appears in sidebar
2. Step is automatically selected
3. Screenshot preview shows in editor
4. Step has default title "Step N"

### After Saving
1. File dialog appears
2. .json file is created
3. _files directory is created with screenshots
4. Success message is displayed

### After Exporting
1. File dialog appears
2. HTML file is created
3. HTML contains all steps and screenshots
4. Success message is displayed

## Known Limitations
- Screenshot capture in sandboxed environments may not work
- Application must be built before running
- Some features require desktop environment (file dialogs, etc.)

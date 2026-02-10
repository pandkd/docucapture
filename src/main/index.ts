const { app, BrowserWindow, ipcMain, desktopCapturer, dialog, Menu } = require('electron');
const path = require('path');
const fs = require('fs');
const os = require('os');

let mainWindow: typeof BrowserWindow.prototype | null = null;
let currentProject: any = null;

// Create the main application window
function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      enableRemoteModule: true,
    },
  });

  // Load the HTML file
  if (process.env.NODE_ENV === 'development') {
    mainWindow.loadFile('dist/index.html');
  } else {
    mainWindow.loadFile(path.join(__dirname, '../dist/index.html'));
  }

  // Open DevTools in development
  if (process.env.NODE_ENV === 'development') {
    mainWindow.webContents.openDevTools();
  }

  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  createMenu();
}

// Create application menu
function createMenu() {
  const template: any = [
    {
      label: 'File',
      submenu: [
        {
          label: 'New Project',
          accelerator: 'CmdOrCtrl+N',
          click: () => {
            mainWindow?.webContents.send('new-project');
          },
        },
        {
          label: 'Open Project',
          accelerator: 'CmdOrCtrl+O',
          click: async () => {
            const result = await dialog.showOpenDialog(mainWindow!, {
              properties: ['openFile'],
              filters: [{ name: 'DocuCapture Project', extensions: ['json'] }],
            });
            if (!result.canceled && result.filePaths.length > 0) {
              mainWindow?.webContents.send('open-project', result.filePaths[0]);
            }
          },
        },
        {
          label: 'Save Project',
          accelerator: 'CmdOrCtrl+S',
          click: () => {
            mainWindow?.webContents.send('save-project');
          },
        },
        { type: 'separator' },
        { role: 'quit' },
      ],
    },
    {
      label: 'Capture',
      submenu: [
        {
          label: 'Take Screenshot',
          accelerator: 'CmdOrCtrl+Shift+S',
          click: () => {
            mainWindow?.webContents.send('take-screenshot');
          },
        },
      ],
    },
    {
      label: 'View',
      submenu: [
        { role: 'reload' },
        { role: 'toggleDevTools' },
        { type: 'separator' },
        { role: 'resetZoom' },
        { role: 'zoomIn' },
        { role: 'zoomOut' },
      ],
    },
  ];

  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);
}

// Handle screenshot capture
ipcMain.handle('capture-screenshot', async () => {
  try {
    const sources = await desktopCapturer.getSources({
      types: ['screen'],
      thumbnailSize: { width: 1920, height: 1080 },
    });

    if (sources.length > 0) {
      const screenshot = sources[0].thumbnail.toPNG();
      return {
        success: true,
        data: screenshot.toString('base64'),
      };
    }
    return { success: false, error: 'No screen source found' };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
});

// Handle save project
ipcMain.handle('save-project', async (event: any, projectData: any) => {
  try {
    const result = await dialog.showSaveDialog(mainWindow!, {
      filters: [{ name: 'DocuCapture Project', extensions: ['json'] }],
      defaultPath: projectData.name + '.json',
    });

    if (!result.canceled && result.filePath) {
      // Create project directory
      const projectDir = result.filePath.replace('.json', '_files');
      if (!fs.existsSync(projectDir)) {
        fs.mkdirSync(projectDir, { recursive: true });
      }

      // Save screenshots
      const savedSteps = projectData.steps.map((step: any, index: number) => {
        if (step.screenshot && step.screenshot.startsWith('data:image')) {
          const base64Data = step.screenshot.replace(/^data:image\/png;base64,/, '');
          const filename = `screenshot_${index + 1}.png`;
          const filepath = path.join(projectDir, filename);
          fs.writeFileSync(filepath, base64Data, 'base64');
          return { ...step, screenshot: filename };
        }
        return step;
      });

      // Save project file
      const projectToSave = {
        ...projectData,
        steps: savedSteps,
        projectDir: projectDir,
      };

      fs.writeFileSync(result.filePath, JSON.stringify(projectToSave, null, 2));
      return { success: true, path: result.filePath };
    }
    return { success: false, error: 'Save cancelled' };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
});

// Handle load project
ipcMain.handle('load-project', async (event: any, filePath: any) => {
  try {
    const projectData = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    const projectDir = projectData.projectDir || filePath.replace('.json', '_files');

    // Load screenshots
    const loadedSteps = projectData.steps.map((step: any) => {
      if (step.screenshot && !step.screenshot.startsWith('data:image')) {
        const filepath = path.join(projectDir, step.screenshot);
        if (fs.existsSync(filepath)) {
          const imageData = fs.readFileSync(filepath);
          return {
            ...step,
            screenshot: `data:image/png;base64,${imageData.toString('base64')}`,
          };
        }
      }
      return step;
    });

    return {
      success: true,
      project: { ...projectData, steps: loadedSteps },
    };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
});

// Handle export to HTML
ipcMain.handle('export-html', async (event: any, projectData: any) => {
  try {
    const result = await dialog.showSaveDialog(mainWindow!, {
      filters: [{ name: 'HTML', extensions: ['html'] }],
      defaultPath: projectData.name + '.html',
    });

    if (!result.canceled && result.filePath) {
      const html = generateHTML(projectData);
      fs.writeFileSync(result.filePath, html);
      return { success: true, path: result.filePath };
    }
    return { success: false, error: 'Export cancelled' };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
});

// Generate HTML documentation
function generateHTML(projectData: any): string {
  const steps = projectData.steps
    .map(
      (step: any, index: number) => `
    <div class="step">
      <h2>Step ${index + 1}: ${step.title || 'Untitled'}</h2>
      ${step.description ? `<p>${step.description}</p>` : ''}
      ${step.screenshot ? `<img src="${step.screenshot}" alt="Screenshot ${index + 1}" />` : ''}
    </div>
  `
    )
    .join('\n');

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${projectData.name || 'Documentation'}</title>
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
      max-width: 900px;
      margin: 0 auto;
      padding: 20px;
      line-height: 1.6;
      color: #333;
    }
    h1 {
      color: #2c3e50;
      border-bottom: 3px solid #3498db;
      padding-bottom: 10px;
    }
    .step {
      margin: 30px 0;
      padding: 20px;
      background: #f9f9f9;
      border-radius: 8px;
      border-left: 4px solid #3498db;
    }
    .step h2 {
      color: #2c3e50;
      margin-top: 0;
    }
    .step img {
      max-width: 100%;
      height: auto;
      border-radius: 4px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
      margin-top: 10px;
    }
    .description {
      margin: 15px 0;
    }
  </style>
</head>
<body>
  <h1>${projectData.name || 'Documentation'}</h1>
  ${projectData.description ? `<p class="description">${projectData.description}</p>` : ''}
  ${steps}
</body>
</html>
  `;
}

// App lifecycle
app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

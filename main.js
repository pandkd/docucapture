const { app, BrowserWindow, ipcMain, globalShortcut, desktopCapturer, screen, Tray, Menu, nativeImage } = require('electron');
const path = require('path');

let mainWindow;
let floatingWindow;
let tray;
let isRecording = false;

// Create main window
function createMainWindow() {
    mainWindow = new BrowserWindow({
        width: 1400,
        height: 900,
        minWidth: 1000,
        minHeight: 700,
        webPreferences: {
            nodeIntegration: false,
            contextIsolation: true,
            preload: path.join(__dirname, 'preload.js')
        },
        icon: path.join(__dirname, 'build', 'icon.png'),
        title: 'DocuCapture',
        backgroundColor: '#1e40af'
    });

    mainWindow.loadFile('index.html');

    // Open DevTools in development
    if (process.argv.includes('--dev')) {
        mainWindow.webContents.openDevTools();
    }

    mainWindow.on('closed', () => {
        mainWindow = null;
        if (floatingWindow) {
            floatingWindow.close();
        }
    });

    // Prevent window title changes
    mainWindow.on('page-title-updated', (event) => {
        event.preventDefault();
    });
}

// Create always-on-top floating capture window
function createFloatingWindow() {
    const displays = screen.getAllDisplays();
    const primaryDisplay = displays[0];
    const { width, height } = primaryDisplay.workAreaSize;

    floatingWindow = new BrowserWindow({
        width: 220,
        height: 180,
        x: width - 250,
        y: height - 210,
        frame: false,
        transparent: true,
        alwaysOnTop: true,
        skipTaskbar: true,
        resizable: false,
        webPreferences: {
            nodeIntegration: false,
            contextIsolation: true,
            preload: path.join(__dirname, 'preload.js')
        }
    });

    floatingWindow.loadFile('floating.html');
    floatingWindow.setVisibleOnAllWorkspaces(true, { visibleOnFullScreen: true });
    floatingWindow.setAlwaysOnTop(true, 'screen-saver');

    // Make window draggable
    floatingWindow.on('closed', () => {
        floatingWindow = null;
    });
}

// Create system tray
function createTray() {
    // Create a simple icon (you can replace with actual icon file)
    const trayIcon = nativeImage.createFromDataURL('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAGASURBVFhH7ZbBTsJAEIb/pYmJiYknb76BJ0/GxyAmPoBP4AuYeOEBfAJjvHjx5sWLN0+ePHkz8eJBY/wnO8UW2i20tNuE/pNvM7Pd/WZ2ujsFRERERERERERERP9JkiRn0Wh0YRjGwnVdx7btpeu6jmmaa9M0V1EULaPRaBGNRs+DweDM9/1ZkiTT/X6/2e12m91ut97tdruu67oej8fVer1er1ar1Xq9Xq/X6/V6vV6v1+v1er1er9fr9Xq9Xq/X6/V6vV6v1+v1+gfr9Xq9Xq/X6/V6vV6v1+v1er1er9fr9Xq9Xq/X6/V6vf7Ber1er9fr9Xq9Xq/X6/V6vV6v1+v1er1er9fr9fpH2+12PVmWXzRNe1ZV9UlRlEdZlh9kWX6QZflBlmVXkiRXkiRXkiRXkiRXkiRXkiRXkiRXkiRXkiRX/12SJLkSRfFOEIRbXuRvBUG44Xn+muf5a57nr3mev+Z5/prjuGuWZdeMMTfCGHMjDMP3sizfhWH4LgjCLc/zt4IgXLMsuy7L8h/8A5VXZYEHt5cAAAAASUVORK5CYII=');
    
    tray = new Tray(trayIcon.resize({ width: 16, height: 16 }));
    
    const contextMenu = Menu.buildFromTemplate([
        {
            label: 'Show DocuCapture',
            click: () => {
                if (mainWindow) {
                    mainWindow.show();
                    mainWindow.focus();
                }
            }
        },
        {
            label: isRecording ? 'Recording...' : 'Ready',
            enabled: false
        },
        { type: 'separator' },
        {
            label: 'Capture Step',
            accelerator: 'CommandOrControl+Shift+S',
            enabled: isRecording,
            click: () => {
                if (mainWindow) {
                    mainWindow.webContents.send('capture-step');
                }
            }
        },
        {
            label: isRecording ? 'Stop Recording' : 'Start Recording',
            accelerator: 'CommandOrControl+Shift+R',
            click: () => {
                if (mainWindow) {
                    mainWindow.webContents.send('toggle-recording');
                }
            }
        },
        { type: 'separator' },
        {
            label: 'Quit',
            click: () => {
                app.quit();
            }
        }
    ]);

    tray.setToolTip('DocuCapture');
    tray.setContextMenu(contextMenu);

    // Show window on tray click
    tray.on('click', () => {
        if (mainWindow) {
            if (mainWindow.isVisible()) {
                mainWindow.hide();
            } else {
                mainWindow.show();
                mainWindow.focus();
            }
        }
    });
}

// App ready
app.whenReady().then(() => {
    createMainWindow();
    createTray();

    // Register global shortcuts
    registerGlobalShortcuts();

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createMainWindow();
        }
    });
});

// Register global keyboard shortcuts
function registerGlobalShortcuts() {
    // Capture Step
    globalShortcut.register('CommandOrControl+Shift+S', () => {
        if (isRecording && mainWindow) {
            mainWindow.webContents.send('capture-step');
            mainWindow.flashFrame(true);
            setTimeout(() => mainWindow.flashFrame(false), 200);
        }
    });

    // Toggle Recording
    globalShortcut.register('CommandOrControl+Shift+R', () => {
        if (mainWindow) {
            mainWindow.webContents.send('toggle-recording');
        }
    });

    // Show/Hide main window
    globalShortcut.register('CommandOrControl+Shift+D', () => {
        if (mainWindow) {
            if (mainWindow.isVisible()) {
                mainWindow.hide();
            } else {
                mainWindow.show();
                mainWindow.focus();
            }
        }
    });

    // Show keyboard shortcuts
    globalShortcut.register('CommandOrControl+Shift+H', () => {
        if (mainWindow) {
            mainWindow.show();
            mainWindow.focus();
            mainWindow.webContents.send('show-shortcuts');
        }
    });

    // Timeline view toggle
    globalShortcut.register('CommandOrControl+Shift+T', () => {
        if (mainWindow) {
            mainWindow.webContents.send('toggle-timeline');
        }
    });

    // Smart grouping
    globalShortcut.register('CommandOrControl+Shift+G', () => {
        if (mainWindow) {
            mainWindow.webContents.send('smart-group');
        }
    });
}

// IPC Handlers

// Get available sources for screen capture
ipcMain.handle('get-sources', async () => {
    try {
        const sources = await desktopCapturer.getSources({
            types: ['screen', 'window'],
            thumbnailSize: { width: 150, height: 150 }
        });
        return sources;
    } catch (error) {
        console.error('Error getting sources:', error);
        return [];
    }
});

// Recording state change
ipcMain.on('recording-state-changed', (event, recording) => {
    isRecording = recording;
    
    if (recording) {
        // Show floating window
        if (!floatingWindow) {
            createFloatingWindow();
        }
    } else {
        // Hide floating window
        if (floatingWindow) {
            floatingWindow.close();
            floatingWindow = null;
        }
    }

    // Update tray menu
    if (tray) {
        const contextMenu = Menu.buildFromTemplate([
            {
                label: 'Show DocuCapture',
                click: () => {
                    if (mainWindow) {
                        mainWindow.show();
                        mainWindow.focus();
                    }
                }
            },
            {
                label: isRecording ? 'Recording...' : 'Ready',
                enabled: false
            },
            { type: 'separator' },
            {
                label: 'Capture Step',
                accelerator: 'CommandOrControl+Shift+S',
                enabled: isRecording,
                click: () => {
                    if (mainWindow) {
                        mainWindow.webContents.send('capture-step');
                    }
                }
            },
            {
                label: isRecording ? 'Stop Recording' : 'Start Recording',
                accelerator: 'CommandOrControl+Shift+R',
                click: () => {
                    if (mainWindow) {
                        mainWindow.webContents.send('toggle-recording');
                    }
                }
            },
            { type: 'separator' },
            {
                label: 'Quit',
                click: () => {
                    app.quit();
                }
            }
        ]);
        tray.setContextMenu(contextMenu);
    }
});

// Floating window actions
ipcMain.on('floating-capture', () => {
    if (mainWindow) {
        mainWindow.webContents.send('capture-step');
    }
});

ipcMain.on('floating-stop', () => {
    if (mainWindow) {
        mainWindow.webContents.send('toggle-recording');
    }
});

ipcMain.on('floating-show-main', () => {
    if (mainWindow) {
        mainWindow.show();
        mainWindow.focus();
    }
});

// Window quit
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

// Cleanup on quit
app.on('will-quit', () => {
    globalShortcut.unregisterAll();
});

// Prevent multiple instances
const gotTheLock = app.requestSingleInstanceLock();

if (!gotTheLock) {
    app.quit();
} else {
    app.on('second-instance', () => {
        if (mainWindow) {
            if (mainWindow.isMinimized()) mainWindow.restore();
            mainWindow.focus();
        }
    });
}

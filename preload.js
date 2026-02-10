const { contextBridge, ipcRenderer } = require('electron');

// Expose protected methods that allow the renderer process to use
// the ipcRenderer without exposing the entire object
contextBridge.exposeInMainWorld('electronAPI', {
    // Screen capture
    getSources: () => ipcRenderer.invoke('get-sources'),
    
    // Recording state
    setRecordingState: (isRecording) => ipcRenderer.send('recording-state-changed', isRecording),
    
    // Receive events from main process
    onCaptureStep: (callback) => ipcRenderer.on('capture-step', callback),
    onToggleRecording: (callback) => ipcRenderer.on('toggle-recording', callback),
    onShowShortcuts: (callback) => ipcRenderer.on('show-shortcuts', callback),
    onToggleTimeline: (callback) => ipcRenderer.on('toggle-timeline', callback),
    onSmartGroup: (callback) => ipcRenderer.on('smart-group', callback),
    
    // Floating window actions
    floatingCapture: () => ipcRenderer.send('floating-capture'),
    floatingStop: () => ipcRenderer.send('floating-stop'),
    floatingShowMain: () => ipcRenderer.send('floating-show-main'),
    
    // Platform info
    platform: process.platform,
    isElectron: true
});

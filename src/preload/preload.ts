const { contextBridge, ipcRenderer } = require('electron');

// Expose protected methods that allow the renderer process to use
// the ipcRenderer without exposing the entire object
contextBridge.exposeInMainWorld('electronAPI', {
  captureScreenshot: () => ipcRenderer.invoke('capture-screenshot'),
  saveProject: (projectData: any) => ipcRenderer.invoke('save-project', projectData),
  loadProject: (filePath: string) => ipcRenderer.invoke('load-project', filePath),
  exportHTML: (projectData: any) => ipcRenderer.invoke('export-html', projectData),
  
  // Listeners for menu events
  onNewProject: (callback: () => void) => {
    ipcRenderer.on('new-project', callback);
    return () => ipcRenderer.removeListener('new-project', callback);
  },
  onTakeScreenshot: (callback: () => void) => {
    ipcRenderer.on('take-screenshot', callback);
    return () => ipcRenderer.removeListener('take-screenshot', callback);
  },
  onSaveProject: (callback: () => void) => {
    ipcRenderer.on('save-project', callback);
    return () => ipcRenderer.removeListener('save-project', callback);
  },
  onOpenProject: (callback: (filePath: string) => void) => {
    const listener = (_event: any, filePath: string) => callback(filePath);
    ipcRenderer.on('open-project', listener);
    return () => ipcRenderer.removeListener('open-project', listener);
  },
});

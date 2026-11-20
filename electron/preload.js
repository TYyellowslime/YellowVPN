const { contextBridge, ipcRenderer } = require('electron');
contextBridge.exposeInMainWorld('__nativeProxy', {
  set: (config) => ipcRenderer.invoke('proxy:set', config),
  clear: () => ipcRenderer.invoke('proxy:clear')
});

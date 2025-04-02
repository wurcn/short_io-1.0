const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('api', {
  generate: (url) => ipcRenderer.invoke('generate-shortlink', url),
  getHistory: () => ipcRenderer.invoke('get-history')
})
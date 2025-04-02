const { app, BrowserWindow, ipcMain } = require('electron')
const path = require('path')
const shortener = require('./lib/shortener')
const storage = require('./lib/storage')

let mainWindow

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      enableRemoteModule: false
    }
  })

  mainWindow.loadFile('src/renderer/index.html')

  mainWindow.on('closed', function () {
    mainWindow = null
  })
}

app.whenReady().then(createWindow)

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})

app.on('activate', function () {
  if (mainWindow === null) createWindow()
})

// 短链接生成处理
ipcMain.handle('generate-shortlink', async (event, longUrl) => {
  const shortUrl = await shortener.generate(longUrl)
  storage.addRecord(longUrl, shortUrl)
  return shortUrl
})
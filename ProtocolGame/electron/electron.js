const { app, BrowserWindow } = require('electron');
const path = require('path');
const url = require('url');

const isDev = process.env.IS_DEV === "true";

function createWindow() {
  const win = new BrowserWindow({
    width: 1024,
    height: 550,
    autoHideMenuBar: true,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      preload: path.join(__dirname, 'preload.js')
    }
  });

  if (isDev) {
    win.loadURL('http://localhost:3000');
    win.webContents.openDevTools();
  } else {
    const indexPath = path.join(__dirname, '../dist/index.html');

    win.loadURL(
      url.format({
        pathname: indexPath,
        protocol: 'file:',
        slashes: true
      })
    );
  }
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
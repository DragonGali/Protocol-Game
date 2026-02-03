const { app, BrowserWindow } = require('electron');
const path = require('path');

const isDev = process.env.IS_DEV === "true";

function createWindow() {
  const win = new BrowserWindow({
    width: 1024,
    height: 550,
    autoHideMenuBar: true
  });

  if (isDev) {
    win.loadURL('http://localhost:3000');
  } else {
    win.loadFile(path.join(__dirname, '../dist/index.html'));
  }
}

app.whenReady().then(createWindow);

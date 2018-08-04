// Include dotenv to process.env
require('dotenv').config(); // eslint-disable-line

// Module to control application life.
// Module to create native browser window.
const { app, BrowserWindow } = require('electron'); // eslint-disable-line

const IS_DEV = process.env.NODE_ENV === 'development';

const APP_URL = IS_DEV
  ? `http://localhost:${process.env.PORT || 3000}`
  : process.env.APP_URL || 'https://www.teamrad.io';

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;

function createWindow() {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    webPreferences: {
      webSecurity: false,
      allowRunningInsecureContent: true,
    },
    frame: false,
  });

  // and load the index.html of the app.
  mainWindow.loadURL(APP_URL);

  mainWindow.maximize();

  if (IS_DEV) {
    mainWindow.webContents.openDevTools();
  }

  // Emitted when the window is closed.
  mainWindow.on('closed', () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null;
  });
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow();
  }
});

// Resolve in secure certificate issue in browser
app.commandLine.appendSwitch('ignore-certificate-errors');

app.on(
  'certificate-error',
  (event, webContents, url, error, certificate, callback) => {
    if (url === APP_URL) {
      // Verification logic.
      event.preventDefault();
      callback(true);
    } else {
      callback(false);
    }
  },
);

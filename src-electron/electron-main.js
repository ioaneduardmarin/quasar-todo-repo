/* eslint-disable no-alert */
/* eslint-disable no-unreachable */
/* eslint-disable global-require */
import {
  app, BrowserWindow, nativeTheme, ipcMain,
} from 'electron';
import path from 'path';

const fs = require('fs').promises;

try {
  if (process.platform === 'win32' && nativeTheme.shouldUseDarkColors === true) {
    require('fs')
      .unlinkSync(
        require('path')
          .join(
            app.getPath('userData'),
            'DevTools Extensions',
          ),
      );
  }
} catch (error) { console.log(error); }

let mainWindow;

function createWindow() {
  /**
   * Initial window options
   */
  mainWindow = new BrowserWindow({
    width: 1000,
    height: 600,
    useContentSize: true,
    webPreferences: {
      contextIsolation: true,
      // More info: /quasar-cli/developing-electron-apps/electron-preload-script
      preload: path.resolve(__dirname, process.env.QUASAR_ELECTRON_PRELOAD),
    },
  });

  mainWindow.loadURL(process.env.APP_URL);

  if (process.env.DEBUGGING) {
    // if on DEV or Production with debug enabled
    mainWindow.webContents.openDevTools();
  } else {
    // we're on production; no access to devtools pls
    mainWindow.webContents.on('devtools-opened', () => {
      mainWindow.webContents.closeDevTools();
    });
  }

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});

ipcMain.handle('load-todos', async () => {
  let results;
  try {
    const filePath = app.getPath('appData');
    results = await fs.readFile(`${filePath}/Electron/todoList.txt`, { encoding: 'utf-8' });
  } catch (error) {
    if (error.errno === -4058) {
      return { errorMessage: 'File does not exist', data: null };
    }
  }

  return { errorMessage: null, data: results };
});

ipcMain.handle('save-todos', async (event, arg) => {
  const filePath = app.getPath('appData');
  try {
    await fs.writeFile(`${filePath}/Electron/todoList.txt`, arg, { encoding: 'utf-8' });
  } catch (error) {
    alert(error);
  }
});

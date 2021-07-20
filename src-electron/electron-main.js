/* eslint-disable no-alert */
/* eslint-disable no-unreachable */
/* eslint-disable global-require */
import {
  app, BrowserWindow, nativeTheme, ipcMain,
} from 'electron';
import path from 'path';

const fs = require('fs');

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

async function readTodoList(filePath) {
  const readPromise = new Promise((resolve, reject) => {
    fs.readFile(filePath, 'utf8', (err, file) => {
      if (err) {
        reject(err);
      } else {
        resolve(file);
      }
    });
  });

  const result = await readPromise
    .then((file) => ({ errorCode: null, data: file }))
    .catch((err) => {
      if (err.code !== 'ENOENT') {
        alert(err);
      }
      return { errorCode: err.code, data: null };
    });

  return result;
}

async function accessTodoList(filePath) {
  const accessPromise = new Promise((resolve, reject) => {
    fs.access(filePath, fs.constants.F_OK, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });

  const result = await accessPromise.then(() => ({ errorCode: null }))
    .catch((err) => {
      if (err.code !== 'ENOENT') {
        alert(err);
      }
      return { errorCode: err.code, data: null };
    });
  return result;
}

ipcMain.handle('load-todos', async () => {
  let results;
  const filePath = app.getPath('appData');
  const todoListPath = `${filePath}/Electron/todoList.txt`;

  results = await accessTodoList(todoListPath);
  if (results.errorCode !== null) {
    return results;
  }

  results = await readTodoList(todoListPath);

  return results;
});

function writeTodoList(filePath, arg) {
  const writePromise = new Promise((resolve, reject) => {
    fs.writeFile(filePath, arg, 'utf8', (err) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });

  writePromise.then().catch((err) => { alert(err); });
}

ipcMain.handle('save-todos', async (event, arg) => {
  const filePath = app.getPath('appData');
  const todoListPath = `${filePath}/Electron/todoList.txt`;
  writeTodoList(todoListPath, arg);
});

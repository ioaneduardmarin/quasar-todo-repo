/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src-electron/electron-main.js":
/*!***************************************!*\
  !*** ./src-electron/electron-main.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("var __dirname = \"src-electron\";\n__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var electron__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! electron */ \"electron\");\n/* harmony import */ var electron__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(electron__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! path */ \"path\");\n/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(path__WEBPACK_IMPORTED_MODULE_1__);\n/* eslint-disable no-alert */\n\n/* eslint-disable no-unreachable */\n\n/* eslint-disable global-require */\n\n\n\nconst fs = __webpack_require__(/*! fs */ \"fs\");\n\ntry {\n  if (process.platform === 'win32' && electron__WEBPACK_IMPORTED_MODULE_0__.nativeTheme.shouldUseDarkColors === true) {\n    __webpack_require__(/*! fs */ \"fs\").unlinkSync(__webpack_require__(/*! path */ \"path\").join(electron__WEBPACK_IMPORTED_MODULE_0__.app.getPath('userData'), 'DevTools Extensions'));\n  }\n} catch (error) {\n  console.log(error);\n}\n\nlet mainWindow;\n\nfunction createWindow() {\n  /**\n   * Initial window options\n   */\n  mainWindow = new electron__WEBPACK_IMPORTED_MODULE_0__.BrowserWindow({\n    width: 1000,\n    height: 600,\n    useContentSize: true,\n    webPreferences: {\n      contextIsolation: true,\n      // More info: /quasar-cli/developing-electron-apps/electron-preload-script\n      preload: path__WEBPACK_IMPORTED_MODULE_1___default().resolve(__dirname, \"C:\\\\Github\\\\quasar-todo-repo\\\\quasar-todo-repo\\\\.quasar\\\\electron\\\\electron-preload.js\")\n    }\n  });\n  mainWindow.loadURL(\"http://localhost:8080\");\n\n  if (true) {\n    // if on DEV or Production with debug enabled\n    mainWindow.webContents.openDevTools();\n  } else {}\n\n  mainWindow.on('closed', () => {\n    mainWindow = null;\n  });\n}\n\nelectron__WEBPACK_IMPORTED_MODULE_0__.app.on('ready', createWindow);\nelectron__WEBPACK_IMPORTED_MODULE_0__.app.on('window-all-closed', () => {\n  if (process.platform !== 'darwin') {\n    electron__WEBPACK_IMPORTED_MODULE_0__.app.quit();\n  }\n});\nelectron__WEBPACK_IMPORTED_MODULE_0__.app.on('activate', () => {\n  if (mainWindow === null) {\n    createWindow();\n  }\n});\n\nasync function readTodoList(filePath) {\n  const readPromise = new Promise((resolve, reject) => {\n    fs.readFile(filePath, 'utf8', (err, file) => {\n      if (err) {\n        reject(err);\n      } else {\n        resolve(file);\n      }\n    });\n  });\n  const result = await readPromise.then(file => ({\n    errorCode: null,\n    data: file\n  })).catch(err => {\n    if (err.code !== 'ENOENT') {\n      alert(err);\n    }\n\n    return {\n      errorCode: err.code,\n      data: null\n    };\n  });\n  return result;\n}\n\nasync function accessTodoList(filePath) {\n  const accessPromise = new Promise((resolve, reject) => {\n    fs.access(filePath, fs.constants.F_OK, err => {\n      if (err) {\n        reject(err);\n      } else {\n        resolve();\n      }\n    });\n  });\n  const result = await accessPromise.then(() => ({\n    errorCode: null\n  })).catch(err => {\n    if (err.code !== 'ENOENT') {\n      alert(err);\n    }\n\n    return {\n      errorCode: err.code,\n      data: null\n    };\n  });\n  return result;\n}\n\nelectron__WEBPACK_IMPORTED_MODULE_0__.ipcMain.handle('load-todos', async () => {\n  let results;\n  const filePath = electron__WEBPACK_IMPORTED_MODULE_0__.app.getPath('appData');\n  const todoListPath = `${filePath}/Electron/todoList.txt`;\n  results = await accessTodoList(todoListPath);\n\n  if (results.errorCode !== null) {\n    return results;\n  }\n\n  results = await readTodoList(todoListPath);\n  return results;\n});\n\nfunction writeTodoList(filePath, arg) {\n  const writePromise = new Promise((resolve, reject) => {\n    fs.writeFile(filePath, arg, 'utf8', err => {\n      if (err) {\n        reject(err);\n      } else {\n        resolve();\n      }\n    });\n  });\n  writePromise.then().catch(err => {\n    alert(err);\n  });\n}\n\nelectron__WEBPACK_IMPORTED_MODULE_0__.ipcMain.handle('save-todos', async (event, arg) => {\n  const filePath = electron__WEBPACK_IMPORTED_MODULE_0__.app.getPath('appData');\n  const todoListPath = `${filePath}/Electron/todoList.txt`;\n  writeTodoList(todoListPath, arg);\n});\n\n//# sourceURL=webpack://quasar-todo/./src-electron/electron-main.js?");

/***/ }),

/***/ "electron":
/*!***************************!*\
  !*** external "electron" ***!
  \***************************/
/***/ ((module) => {

module.exports = require("electron");

/***/ }),

/***/ "fs":
/*!*********************!*\
  !*** external "fs" ***!
  \*********************/
/***/ ((module) => {

module.exports = require("fs");

/***/ }),

/***/ "path":
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("path");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src-electron/electron-main.js");
/******/ 	module.exports = __webpack_exports__;
/******/ 	
/******/ })()
;
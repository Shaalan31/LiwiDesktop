// Modules to control application life and create native browser window

const {app, BrowserWindow, Menu} = require('electron')
const path = require('path')

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow

function createWindow () {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    center: true,
    webPreferences: {
      nodeIntegration: true
    },
    icon: path.join(__dirname, 'public/img/icon.png')
  })

  mainWindow.maximize()

  // mainWindow.setMenu(null)

  // load the index.html of the public.
  mainWindow.loadFile('index.html')

  // Open the DevTools.
  // mainWindow.webContents.openDevTools()

  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    // Dereference the window object
    mainWindow = null
  })

  // const mainMenu = Menu.buildFromTemplate([])
  // Menu.setApplicationMenu(mainMenu)
}

// This method will be called when Electron has finished
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') app.quit()
})

app.on('activate', function () {
  if (mainWindow === null) createWindow()
})

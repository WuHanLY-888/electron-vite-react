import { app, BrowserWindow } from 'electron'
import { electronApp, optimizer } from '@electron-toolkit/utils'
import WindowManager from './services/windowManager'
import ipcMainFun from './services/ipcMain'

function AppReady(): void {
    // Create the browser window.
    const win = WindowManager.init()

    ipcMainFun(win)
    // mainWindow.on('ready-to-show', () => {
    //     mainWindow.show()
    // })         

    // mainWindow.webContents.setWindowOpenHandler((details) => {
    //     shell.openExternal(details.url)
    //     return { action: 'deny' }
    // })
}

// 程序准备就绪，可以使用一些api了
app.whenReady().then(() => {
    // Set app user model id for windows
    electronApp.setAppUserModelId('com.electron')

    // Default open or close DevTools by F12 in development
    // and ignore CommandOrControl + R in production.
    // see https://github.com/alex8088/electron-toolkit/tree/master/packages/utils
    app.on('browser-window-created', (_, window) => {
        optimizer.watchWindowShortcuts(window)
    })

    AppReady()

    app.on('activate', function () {
        // On macOS it's common to re-create a window in the app when the
        // dock icon is clicked and there are no other windows open.
        if (BrowserWindow.getAllWindows().length === 0) AppReady()
    })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

// In this file you can include the rest of your app"s specific main process
// code. You can also put them in separate files and require them here.

import { BrowserWindow } from 'electron'
import userManager from './userManager'
import configs from '../config'
import { is } from '@electron-toolkit/utils'
import { join } from 'path'

const server = process.env['ELECTRON_RENDERER_URL']
const baseURL = is.dev && server ? server : join('file://', __dirname, '../renderer/index.html')

type BrowserWindowInit = BrowserWindow | null
class WindowManager {
    private constructor() {
        // 窗口初始化
        const userdata = userManager.init()

        const win = userdata.getUserData('isLogin') ? this.mainWin() : this.loginWin()
        win.on('ready-to-show', () => {
            win.show()
        })
    }
    public mainWindow: BrowserWindowInit = null
    public loginWindow: BrowserWindowInit = null

    mainWin(): BrowserWindow {
        if (!this.mainWindow) {
            this.mainWindow = new BrowserWindow(configs.browser)
            this.mainWindow.loadURL(baseURL + '#about')
        }
        return this.mainWindow
    }
    loginWin(): BrowserWindow {
        if (!this.loginWindow) {
            this.loginWindow = new BrowserWindow(configs.browser)
            this.loginWindow.loadURL(baseURL + '#login')
        }
        return this.loginWindow
    }
    // public initBrowserWindow(
    //     win: BrowserWindowInit,
    //     browser?: BrowserWindowConstructorOptions,
    //     webPreferences?: WebPreferences
    // ): BrowserWindow {
    //     if (!win) {
    //         win = new BrowserWindow({
    //             ...configs.browser,
    //             ...browser,
    //             webPreferences: {
    //                 ...configs.webPreferences,
    //                 ...webPreferences
    //             }
    //         })

    //         win[is.dev ? 'loadURL' : 'loadFile'](baseURL)
    //     }
    //     win.on('ready-to-show', () => {
    //         win?.show()
    //     })
    //     return win
    // }
    // 单实例
    public static init(): WindowManager {
        if (!WindowManager.instance) {
            WindowManager.instance = new WindowManager()
        }

        return WindowManager.instance
    }
    private static instance: WindowManager | null = null
}

export default WindowManager

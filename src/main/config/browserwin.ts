import { BrowserWindowConstructorOptions, WebPreferences } from 'electron'
import { is } from '@electron-toolkit/utils'

const config: BrowserWindowConstructorOptions = {
    titleBarStyle: 'hidden'
}

export const webPreferences: WebPreferences = {
    devTools: is.dev
}

export default config

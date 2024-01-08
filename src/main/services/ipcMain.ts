import { ipcHelper } from "@electron-toolkit/utils";
import WindowManager from "./windowManager";


const Default = (win: WindowManager) => {
    ipcHelper.handle('user-login1', () => {
        // 
        win.loginWindow?.destroy()
        win.mainWindow?.show()
    })
}

export default Default

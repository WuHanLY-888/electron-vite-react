import userManager from './userManager'

class WindowManager {
    private constructor() {
        // 窗口初始化
        const userdata = userManager.init()
        if (userdata.getUserData('isLogin')) {
            // 加载主窗口
        } else {
            // 加载登录窗口
        }
    }
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

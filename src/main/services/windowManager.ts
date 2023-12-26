class WindowManager {
    private constructor() {
        // 窗口初始化
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

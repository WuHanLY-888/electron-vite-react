import { ipcHelper } from '@electron-toolkit/utils'

interface userdata {
    // [key: string]: unknown
    isLogin: boolean
    realName?: string
    nickName?: string
    avatar?: string
    token?: string
    sex?: 'male' | 'female' | 'unknown'
    id?: string
    email?: string
}
class userManager {
    private constructor() {
        // 用户信息
        ipcHelper.handle('set-userdata', (_, data) => {
            this.userdata = {
                ...this.userdata,
                ...data
            }
        })

        ipcHelper.handle('get-userdata', (_, key?: keyof userdata | Array<keyof userdata>) =>
            this.getUserData(key)
        )

        ipcHelper.handle('user-logout', this.logout)
    }

    private userdata: userdata = {
        isLogin: false
    }

    public getUserData(key?: keyof userdata | Array<keyof userdata>): unknown {
        // 如果没有传入key，则返回全部userdata
        if (key === undefined) {
            return this.userdata
        }
        // 如果传入的是一个数组，则返回userdata中对应的字段
        if (Array.isArray(key)) {
            return key.reduce((result, currentKey) => {
                result[currentKey] = this.userdata[currentKey]
                return result
            }, {})
        }
        // 如果传入的是一个字符串，则返回userdata中对应的字段
        return this.userdata[key]
    }

    public setUserdata(data: userdata): void {
        this.userdata = {
            ...this.userdata,
            ...data
        }
    }

    public logout() {
        this.userdata = {
            isLogin: false
        }
    }

    // 单实例
    public static init(): userManager {
        if (!userManager.instance) {
            userManager.instance = new userManager()
        }

        return userManager.instance
    }
    private static instance: userManager | null = null
}

export default userManager

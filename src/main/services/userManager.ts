import { ipcHelper } from '@electron-toolkit/utils'

interface userdata {
    isLogin: boolean
    avatar: string
    token: string
    [key: string]: unknown
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

        ipcHelper.handle(
            'get-userdata',
            (_, key?: keyof typeof this.userdata | Array<keyof typeof this.userdata>) =>
                this.getUserData(key)
        )
    }

    private userdata: userdata = {
        isLogin: false,
        avatar: '',
        token: ''
    }

    public getUserData(
        key?: keyof typeof this.userdata | Array<keyof typeof this.userdata>
    ): unknown {
        // 如果没有传入key，则返回全部userdata
        if (key === undefined) {
            return this.userdata
        }
        // 如果传入的是一个数组，则返回userdata中对应的字段
        if (Array.isArray(key)) {
            return key.reduce(
                (result, currentKey) => {
                    result[currentKey] = this.userdata[currentKey]
                    return result
                },
                {} as Pick<typeof this.userdata, keyof typeof this.userdata>
            )
        }
        // 如果传入的是一个字符串，则返回userdata中对应的字段
        return this.userdata[key]
    }

    public setUserdata(data) {
        this.userdata = {
            ...this.userdata,
            ...data
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

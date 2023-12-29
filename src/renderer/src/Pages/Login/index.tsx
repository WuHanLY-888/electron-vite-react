import { ChangeEvent, useEffect, useState } from 'react'
import { Input, Space, Button, message } from 'antd'
import styles from './login.module.less'
import 'antd/dist/antd.css' // or 'antd/dist/antd.less'
import { generateCaptcha } from '@renderer/utils/getCaptchaImage'

const view = (): JSX.Element => {
    useEffect(() => {
        getCaptchaImg()
    }, [])
    // 获取用户输入的信息
    const [usernameVal, setUsernameVal] = useState('') // 定义用户输入用户名这个变量
    const [passwordVal, setPasswordVal] = useState('') // 定义用户输入密码这个变量
    const [captchaVal, setCaptchaVal] = useState('') // 定义用户输入验证码这个变量
    // 定义一个变量保存验证码图片信息
    const [captchaImg, setCaptchaImg] = useState('')
    const [captchaText, setCaptchaText] = useState('')

    const usernameChange = (e: ChangeEvent<HTMLInputElement>): void => {
        // 获取用户输入的用户名
        // console.log(e.target.value);
        // 修改usernameVal这个变量为用户输入的那个值。 以后拿到usernameVal这个变量就相当于拿到用户输入的信息。
        setUsernameVal(e.target.value)
    }
    const passwordChange = (e: ChangeEvent<HTMLInputElement>) => {
        setPasswordVal(e.target.value)
    }
    const captchaChange = (e: ChangeEvent<HTMLInputElement>) => {
        setCaptchaVal(e.target.value)
    }
    // 点击登录按钮的事件函数
    const gotoLogin = async () => {
        console.log('用户输入的用户名，密码，验证码分别是：', usernameVal, passwordVal, captchaVal)
        console.log(captchaVal.trim())
        console.log(captchaText)

        if (captchaVal != captchaText) {
            message.warning('验证码输入错误！')
            getCaptchaImg()
            return
        }
        console.log('验证码正确')

        // 验证是否有空值
        if (!usernameVal.trim() || !passwordVal.trim() || !captchaVal.trim()) {
            message.warning('请完整输入信息！')
            return
        }
    }

    function getCaptchaImg() {
        const res = generateCaptcha()
        console.log(res.text)
        setCaptchaText(res.text)
        setCaptchaImg(res.url)
    }

    return (
        <div className={styles.loginPage}>
            <div className={styles.top}></div>
            {/* 登录盒子 */}
            <div className={styles.loginbox}>
                {/* 标题部分 */}
                <div className={styles.title}>
                    <h1>react&nbsp;·&nbsp;通用后台系统</h1>
                    <p>Strive Everyday</p>
                </div>
                {/* 表单部分 */}
                <div className="form">
                    <Space direction="vertical" size="large" style={{ display: 'flex' }}>
                        <Input placeholder="用户名" onChange={usernameChange} />
                        <Input.Password placeholder="密码" onChange={passwordChange} />
                        {/* 验证码盒子 */}
                        <div className={styles.captchaBox}>
                            <Input placeholder="验证码" onChange={captchaChange} />
                            <div className={styles.captchaImg} onClick={getCaptchaImg}>
                                <img height="38" src={captchaImg} alt="" />
                            </div>
                        </div>
                        <Button type="primary" className="loginBtn" block onClick={gotoLogin}>
                            登录
                        </Button>
                    </Space>
                </div>
            </div>
        </div>
    )
}

export default view

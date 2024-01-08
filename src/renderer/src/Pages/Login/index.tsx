import { ChangeEvent, useEffect, useState } from 'react'
import { Input, Space, Button, message, Card } from 'antd'
import styles from './login.module.less'
import { generateCaptcha } from '@renderer/utils/getCaptchaImage'
import QRCodeLogin from './QRCodeLogin'


const usernamelist = ['amdin']
const View = (): JSX.Element => {
    useEffect(() => {
        getCaptchaImg()
    }, [])
    // 获取用户输入的信息
    const [usernameVal, setUsernameVal] = useState('amdin') // 定义用户输入用户名这个变量
    const [passwordVal, setPasswordVal] = useState('amdin') // 定义用户输入密码这个变量
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
        if (captchaVal.toLowerCase() != captchaText.toLowerCase()) {
            message.warning('验证码输入错误！')
            getCaptchaImg()
            return
        }

        // 验证是否有空值
        if (!usernameVal.trim() || !passwordVal.trim() || !captchaVal.trim()) {
            message.warning('请完整输入信息！')
            return
        }

        if (usernameVal ==='admin' && passwordVal === 'admin') {
            console.log('密码输入正确');
            window.ipc.invoke('user-login')
        } else {
            message.warning('账号或密码输入错误！')
        }
    }

    function getCaptchaImg() {
        const res = generateCaptcha()

        setCaptchaText(res.text)
        setCaptchaImg(res.url)
        
        if (import.meta.env.MODE === 'development') {
            setCaptchaVal(res.text)
        }

    }

    return (
        <div className={styles.loginPage}>
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
                        {/* <div className={styles.captchaBox}> */}
                        <Space size="large" style={{ display: 'flex' }}>
                            <Input placeholder="验证码" onChange={captchaChange} />
                            <div className={styles.captchaImg} onClick={getCaptchaImg}>
                                <img height="38" src={captchaImg} alt="" />
                            </div>
                        </Space>
                        {/* </div> */}
                        <Button type="primary" className="loginBtn" block onClick={gotoLogin}>
                            登录
                        </Button>
                    </Space>
                </div>
            </div>
        </div>
    )
}

const loginBox: React.FC = () => {

    const contentList: Record<string, React.ReactNode> = {
        tab1: <View />,
        tab2: <QRCodeLogin></QRCodeLogin>,
    };
    const [activeTabKey, setActiveTabKey] = useState<string>('tab1');
    const tabList = [
        {
            key: 'tab1',
            tab: '账号密码登陆',
        },
        {
            key: 'tab2',
            tab: '二维码登陆',
        },
    ];

    const onTabChange = (e) => {
        setActiveTabKey(e)
    }
    return (
        <div>
            <div className={styles.top}></div>
            <Card
                style={{ width: '80%', margin: '0 auto' }}
                // title="登 陆"
                tabList={tabList}
                activeTabKey={activeTabKey}
                onTabChange={onTabChange}
            >
                {contentList[activeTabKey]}
            </Card>
        </div>
    )
}


export default loginBox

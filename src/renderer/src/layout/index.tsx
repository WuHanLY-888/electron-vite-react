import { Breadcrumb, Layout } from 'antd'
import React, { useState } from 'react'
import './index.less'
import { Outlet } from 'react-router-dom'
import MainMenu from './MainMenu'

const { Header, Content, Footer, Sider } = Layout

const App: React.FC = () => {
    const [collapsed, setCollapsed] = useState(false)
    console.log('layout')

    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
                <div className="logo" />
                <MainMenu />
            </Sider>
            <Layout className="site-layout">
                <Header className="site-layout-background" style={{ paddingLeft: '20px' }}>
                    <Breadcrumb style={{ lineHeight: '64px' }}>
                        <Breadcrumb.Item>User</Breadcrumb.Item>
                        <Breadcrumb.Item>Bill</Breadcrumb.Item>
                    </Breadcrumb>
                </Header>
                <Content style={{ margin: '0 16px' }}>
                    <Outlet />
                </Content>
                <Footer style={{ textAlign: 'center' }}>
                    Ant Design ©2018 Created by Ant UED
                </Footer>
            </Layout>
        </Layout>
    )
}

export default App

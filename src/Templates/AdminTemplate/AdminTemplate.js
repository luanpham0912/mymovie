import './AdminTemplate.css'
import React, { useState } from 'react';
import { NavLink, Redirect, Route } from 'react-router-dom';
import { FileOutlined, PieChartOutlined, UserOutlined, DesktopOutlined, TeamOutlined } from '@ant-design/icons';
import { Breadcrumb, Button, Layout, Menu, theme } from 'antd';
import { USERLOGIN } from '../../Utils/ConstantDoMain/ConstantDomain';

const { Header, Content, Footer, Sider } = Layout;

const items = [
    {
        key: "1",
        label: <NavLink to='/admin'  activeStyle={{color:"rgb(140,12,64)",fontWeight : "bold"}}>Movies</NavLink>,
        icon : <FileOutlined/>,
        children: [{
            key: '4',
            label: <NavLink  to='/admin' exact activeStyle={{color:"rgb(140,12,64)",fontWeight : "bold"}}>Movies</NavLink>,
            className : 'customMenuItem'

        },
        {
            key: '5',
            label: <NavLink  to='/admin/addnew' activeStyle={{color:"rgb(140,12,64)",fontWeight : "bold"}}>Add new</NavLink>,
            className : 'customMenuItem'


        }],
        className : 'customMenuItem'
    },
    {
        key: "2",
        label:  <NavLink to='/users' activeStyle={{color:"rgb(140,12,64)",fontWeight : "bold"}}>Users</NavLink>,
        children: [{
            key: '6',
            label: <NavLink  to='/users' exact activeStyle={{color:"rgb(140,12,64)",fontWeight : "bold"}}>Users</NavLink>,
            className : 'customMenuItem'

        },
        {
            key: '7',
            label: <NavLink  to='/users/adduser' activeStyle={{color:"rgb(140,12,64)",fontWeight : "bold"}}>Add Users</NavLink>,
            className : 'customMenuItem'


        }],
        className : 'customMenuItem',
        icon : <UserOutlined/>
    },
    // {
    //     key: "3",
    //     label: "Showtimes",
    //     className : 'customMenuItem',
    //     disabled : true
    // },
];


export const AdminTemplate = (props) => {
    const { Component, ...restProps } = props;
    const [collapsed, setCollapsed] = useState(false);
    const {
        token: { colorBgContainer },
    } = theme.useToken();

    return <Route {...restProps} render={(propsRoute) => {
        if(!localStorage.getItem(USERLOGIN)){
            return <Redirect to="/login"/>
        }
    
        return <>
            <Layout
                style={{
                    minHeight: '100vh',
                }}
            >
                <Sider className='customSider' width={200} collapsible collapsed={collapsed} onCollapse={(value,type) => {
                   
                    
                    setCollapsed(value)}}>
                    <div
                    className='divCustom'
                        style={{
                            height: 50,
                            margin: 16,
                            background: 'rgba(255, 255, 255, 0.2)',
                            display : "flex",
                            justifyContent : "space-around",
                            alignItems : "center"
                        }}
                    >
                        <p className='m-0 text-violet-400'>{JSON.parse(localStorage.getItem("UserLogin")).taiKhoan}</p>
                        <img className='rounded-full' src={`https://i.pravatar.cc/35?img=${JSON.parse(localStorage.getItem("UserLogin")).hoTen}`} alt='...'/>
                    </div>
                    <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" items={items} />
                </Sider>
                <Layout className="site-layout">
                    <Content
                        style={{
                            margin: '16px',
                        }}
                    >
                        <div
                            style={{
                                padding: 24,
                                height: "auto",
                                background: colorBgContainer,
                            }}
                        >
                            <Component  {...propsRoute} />
                        </div>
                    </Content>

                </Layout>
            </Layout>


        </>
    }} />
}


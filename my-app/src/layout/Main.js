import { Breadcrumb, Layout, Menu } from "antd";
import React from "react";
import { Outlet, Link } from 'react-router-dom';

const { Header, Content, Footer } = Layout;

const items = [
    {
        key: "home",
        label: "Home",
        url: "/"
    },
    {
        key: "posts",
        label: "Posts",
        url: "/posts"
    },
    {
        key: "profile",
        label: "Profile",
        url: '/profile'
    },
    {
        key: "login",
        label: "Login",
        url: '/login'
    },
];

const Main = () => (
    <Layout className="layout">
        <Header>
            <div className="logo" />
            <Menu
                theme="dark"
                mode="horizontal"
                defaultSelectedKeys={["2"]}
            >
                {
                    items?.map((item) => (

                        <Menu.Item key={item.key} >
                            <Link to={item.url}>
                                {item.label}
                            </Link>
                        </Menu.Item>
                    ))
                }
            </Menu>
        </Header>
        <Content
            style={{
                padding: "0 50px",
            }}
        >
            <Breadcrumb
                style={{
                    margin: "16px 0",
                }}
            >
                <Breadcrumb.Item>Home</Breadcrumb.Item>
                <Breadcrumb.Item>List</Breadcrumb.Item>
                <Breadcrumb.Item>App</Breadcrumb.Item>
            </Breadcrumb>
            <Outlet />
        </Content>
        <Footer
            style={{
                textAlign: "center",
            }}
        >
            Ant Design ©2018 Created by Ant UED
        </Footer>
    </Layout>
);
export default Main;
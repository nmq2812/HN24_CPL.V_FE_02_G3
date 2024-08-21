/*
import Link from "next/link";

export default function Header() {
    return (
        <nav className="navbar navbar-light">
            <div className="container">
                <a className="navbar-brand" href="index.html">
                    conduit
                </a>
                <ul className="nav navbar-nav pull-xs-right">
                    <li className="nav-item">
                        <Link href="/" className="nav-link">
                            Home
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link href="/editor" className="nav-link">
                            New Article
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link href="/settings" className="nav-link">
                            &nbsp;Settings
                        </Link>

                    </li>
                    <li className="nav-item">
                        <Link href="/profile" className="nav-link">
                            Profile
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link href="/login" className="nav-link">
                            Login
                        </Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
}
*/
 
"use client";

import React from 'react';
import { Layout, Menu } from 'antd';
import { SettingOutlined, EditOutlined  } from '@ant-design/icons';
import Link from 'next/link';

const { Header } = Layout;

const AppHeader: React.FC = () => {
  const items1 = [
    {
      key: '1',
      label: <Link href="/">Home</Link>,
    },
    {
      key: '2',
      label: <Link href="/editor"><EditOutlined/> New Article</Link>,
    },
    {
      key: '3',
      label: <Link href="/settings"><SettingOutlined /> Settings</Link>,
    },
    {
        key: '4',
        label: <Link href="/profile">Profile</Link>,
      }
  ];

  return (
    <Header style={{ display: 'flex', alignItems: 'center'}}>
      <div className="demo-logo" style={{ color: 'white', fontSize: '24px', fontWeight: 'bold', marginRight: 'auto' }}>
        conduit
      </div>
      <Menu
        theme="dark"
        mode="horizontal"
        defaultSelectedKeys={['1']}
        items={items1}
        style={{ flex: 1, justifyContent: 'flex-end', minWidth: 0 }}
      />
    </Header>
  );
};

export default AppHeader;

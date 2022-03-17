import { DownOutlined } from '@ant-design/icons';
import { Badge, Button, Dropdown, Layout, Menu } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';
import { ReactSVG } from 'react-svg';
import MainDemo from '../Menu/Main';

const { Header } = Layout;

type Props = {
  user?: any;
};

const HeaderMainDemo: React.FC<Props> = ({ user }) => {
  return (
    <Header className={`site-header`}>
      <div className="logo">
        <>
          <Link to="/">
            <img src="/logo-admin.svg" alt="logo" />
          </Link>
        </>
      </div>
      <MainDemo />
      <div className="account-info">
        <Badge count={100} overflowCount={99}>
          <span className="anticon">
            <ReactSVG src="/icons/bell-badge.svg" />
          </span>
        </Badge>
        <div className="avatar">
          <img
            src={`https://ui-avatars.com/api/?length=1&name=${
              user.full_name ? user.full_name : user.email
            }&size=32&font-size=0.4&bold=true&background=5f5f5f&color=FFFFFF&rounded=true`}
            alt=""
          />
        </div>
        <div className="info">
          <div className="fullname">{user?.full_name}</div>
          <Dropdown
            overlay={
              <Menu>
                <Menu.Item>
                  <Link to="/logout" className="logout">
                    <Button type="text" size="small">
                      Log out
                    </Button>
                  </Link>
                </Menu.Item>
              </Menu>
            }
          >
            <div className="email">
              {user?.email} <DownOutlined />
            </div>
          </Dropdown>
        </div>
      </div>
    </Header>
  );
};

export default HeaderMainDemo;

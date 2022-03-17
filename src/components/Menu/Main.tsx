import { Menu } from 'antd';
import React from 'react';
import { Link, RouteComponentProps, withRouter } from 'react-router-dom';
import { ReactSVG } from 'react-svg';
import './Main.scss';

const ROOT_PATH_REGEX = /(^[/portal]+[^/]+).*/;

const MainMenu: React.FC<RouteComponentProps> = ({ history }) => {
  const {
    location: { pathname },
  } = history;

  let selectedKey = pathname.replace(ROOT_PATH_REGEX, '$1');

  console.log(selectedKey);

  if (selectedKey.includes('admin')) {
    selectedKey = '/admin';
  }

  console.log(selectedKey);

  return (
    <Menu
      className='main-menu'
      mode="horizontal"
      defaultSelectedKeys={[selectedKey]}
      triggerSubMenuAction="hover"
    >
      <Menu.Item key="/admin">
        <Link to="/admin">
          <ReactSVG src="/icons/menu/demo/admin.svg" />
          <span>Admin</span>
        </Link>
      </Menu.Item>
    </Menu>
  );
};

export default withRouter(MainMenu);

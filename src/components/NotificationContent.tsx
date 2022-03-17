import React from 'react';
import { Button } from 'antd';

import './NotificationContent.scss';

type Props = {
  urlLogo?: string;
  content?: any;
  textButton?: string;
  onSubmit?: any;
};
const NotificationContent: React.FC<Props> = ({ urlLogo, content, textButton, onSubmit }) => (
  <div className="NotificationContent">
    {urlLogo && (
      <div className="logo">
        <img src={urlLogo} alt="notification"></img>
      </div>
    )}
    <div className="content">{content}</div>
    <div className="button">
      <Button type="primary" onClick={onSubmit}>
        {textButton}
      </Button>
    </div>
  </div>
);

export default NotificationContent;

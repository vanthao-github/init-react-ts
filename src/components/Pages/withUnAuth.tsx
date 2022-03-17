import React from 'react';
import { useWindowSize } from '../../utils/layout';
import './withUnAuth.scss';

export default function <T = any>(Component: React.ComponentType<T>) {
  const UnAuthPage: React.FC<T> = (props) => {
    const [, height] = useWindowSize();
    return (
      <div className="UnAuthPage">
        <div className="page-container" style={{ minHeight: height }}>
          <Component {...(props as T)} />
        </div>
      </div>
    );
  };
  return UnAuthPage;
}

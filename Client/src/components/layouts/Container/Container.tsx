import React from 'react';
import { Col } from 'antd';

import cl from './Container.module.sass';

const Container: React.FC<ContainerProps> = ({ className = '', children }) => (
  <Col className={`${cl.col} ${className}`} span={16}>
    {children}
  </Col>
);

type ContainerProps = {
  className?: string;
};

export default Container;

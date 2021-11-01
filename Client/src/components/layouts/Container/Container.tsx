import React from 'react';
import { Col } from 'antd';

import cl from './Container.module.sass';

const Container: React.FC = (props) => (
	<Col className={cl.col} span={16}>
		{props.children}
	</Col>
);

export default Container;

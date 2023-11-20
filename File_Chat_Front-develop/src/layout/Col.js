import React from 'react';
import { Col } from 'antd';

/**
 * Col
 * --
 */
const ColComp = ({ x, children, style }) => {
  return (
    <Col span={x} style={style}>
      {children}
    </Col>
  );
};

ColComp.defaultProps = {
  x: 12,
  style: { padding: 7 },
};

export default ColComp;

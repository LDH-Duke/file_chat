import React from 'react';
import { Row } from 'antd';

/**
 * Container
 * --
 */
const Container = ({ justify, gutter, children, style }) => {
  /* RENDEr */
  return (
    <Row justify={justify} style={style}>
      {children}
    </Row>
  );
};

/* Default props */
Container.defaultProps = {
  justify: 'start', // ['center','start','end']
  gutter: [16, 16],
  style: {},
};

export default Container;

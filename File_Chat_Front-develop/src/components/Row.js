import React from 'react';
import { Row } from 'antd';

/**
 * Container
 * --
 */
const Container = ({ justify, gutter, style, padding, children }) => {
  /* Render */
  return (
    <Row justify={justify} style={{ ...style, ...(padding && { padding }) }}>
      {children}
    </Row>
  );
};

/* Default props */
Container.defaultProps = {
  justify: 'start', // ['center','start','end']
  gutter: [16, 16],
  style: {},
  padding: null,
};

export default Container;

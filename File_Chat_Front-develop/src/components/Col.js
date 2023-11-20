import React from 'react';
import { Col } from 'antd';

/**
 * Col
 * --
 */
const ColComp = (props) => {
  /* Props */
  const {
    x,
    children,
    style,
    alignvertical,
    xs,
    sm,
    md,
    lg,
    xl,
    xxl,
    padding,
  } = props;

  /*  */
  const alignCenterOption = {
    display: 'flex',
    ...(alignvertical && { alignItems: alignvertical }),
  };

  /* RENDER */
  return (
    <Col
      span={x}
      {...props}
      style={{
        ...style,
        ...(alignvertical && alignCenterOption),
        ...(xs && xs),
        ...(sm && sm),
        ...(md && md),
        ...(lg && lg),
        ...(xl && xl),
        ...(xxl && xxl),
        ...(padding && { padding }),
      }}
    >
      {children}
    </Col>
  );
};

ColComp.defaultProps = {
  style: { padding: 0 },
  alignvertical: null,
  padding: null,
  x: 12,
  xs: null,
  sm: null,
  md: null,
  lg: null,
  xl: null,
  xxl: null,
};

export default ColComp;

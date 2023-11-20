import React from 'react';
import { Card } from 'antd';

/**
 * CardComp
 * --
 */
const CardComp = (props) => {
  /* Props */
  const {
    id,
    className,
    hoverable,
    shadow,
    style,
    bodyStyle,
    onClick,
    children,
    borderRadius,
  } = props;

  /* RENDER */
  return (
    <Card
      id={id}
      className={className}
      hoverable={hoverable}
      // cardB
      style={{
        // margin: '0 auto',
        borderRadius,
        ...(shadow && { boxShadow: '2px 2px 5px -1px rgba(0, 0, 0, 0.08)' }),
        ...style,
      }}
      bodyStyle={{
        padding: 16,
        ...bodyStyle,
      }}
      onClick={onClick}
    >
      {children}
    </Card>
  );
};

CardComp.defaultProps = {
  id: '',
  className: '',
  hoverable: true,
  shadow: false,
  style: {},
  borderRadius: 10,
  bodyStyle: {},
  onClick: () => {},
};

export default CardComp;

import React from 'react';
import { Layout, Divider } from 'antd';
const { Content } = Layout;
/**
 * ContentComp
 * --
 */
const ContentComp = ({
  id,
  title,
  maxWidth,
  height,
  minHeight,
  maxHeight,
  style,
  children,
  className,
  backgroundColor,
  layout,
  padding,
  fullWidth,
}) => {
  /* RENDER */
  const view = (
    <Content
      id={id}
      className={className}
      style={{
        //   padding: '0 50px',
        width: '100%',
        maxWidth: fullWidth ? '100%' : maxWidth,
        margin: '0 auto',
        background: backgroundColor,
        // borderBottom: '1px solid #f1f1f1',
        padding,
        ...(minHeight && { minHeight }),
        ...(maxHeight && { maxHeight }),
        ...(height && { height }),
        ...style,
      }}
    >
      {title && <Divider orientation="center">{title}</Divider>}
      {children}
    </Content>
  );
  return layout ? <Layout>{view}</Layout> : view;
};

/*  */
ContentComp.defaultProps = {
  id: '',
  title: '',
  maxWidth: 500,
  minHeight: null,
  maxHeight: null,
  height: null,
  style: {},
  className: '',
  backgroundColor: '#fff',
  layout: false,
  padding: 15,
  margin: 0,
  block: false,
  center: false,
  fullWidth: false,
  // useHeader:
};

export default ContentComp;

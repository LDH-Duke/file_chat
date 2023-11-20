import React from 'react';
import { Layout, Divider } from 'antd';
const { Content } = Layout;
/**
 * ContentComp
 * --
 */
const ContentComp = ({ title, maxWidth, minHeight, style, children }) => {
  return (
    // <Layout>
    <Content
      style={{
        //   padding: '0 50px',
        width: '100%',
        maxWidth,
        minHeight,
        margin: '0 auto',
        // background: 'red',
        ...style,
      }}
    >
      {title && <Divider orientation="center">{title}</Divider>}
      {children}
    </Content>
    // </Layout>
  );
};

/*  */
ContentComp.defaultProps = {
  title: '',
  maxWidth: 1024,
  minHeight: 10,
  style: {},
};

export default ContentComp;

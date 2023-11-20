/* eslint-disable */
import { Button, Card, Space, Typography } from 'antd';
import React, { useEffect, useState } from 'react';

const AssetsModify = ({ assets, setAssets }) => {
  /* State */
  const [displayAssets, setDisplayAssets] = useState([]);
  const [addAssets, setAddAssets] = useState([]);
  const [removeAssets, setRemoveAssets] = useState([]);

  /* Hooks */
  useEffect(() => {
    setDisplayAssets(assets);
  }, [assets]);

  return (
    <>
      <Space style={{ width: '100%' }} align="">
        <Typography.Title level={3} style={{ width: '150px' }}>
          첨부파일
        </Typography.Title>
        <Typography.Paragraph style={{ width: '950px' }}>
          <Space direction="vertical" className="w-100">
            {displayAssets
              .sort((a, b) => a.created_at - b.created_at)
              .map((item) => {
                const { assets_id, assets_nm } = item;
                return (
                  <Card bordered key={assets_id}>
                    {assets_nm} <Button type="link">상세보기</Button>
                  </Card>
                );
              })}
          </Space>
          {/* {JSON.stringify(assets)} */}
        </Typography.Paragraph>
      </Space>
    </>
  );
};

export default AssetsModify;

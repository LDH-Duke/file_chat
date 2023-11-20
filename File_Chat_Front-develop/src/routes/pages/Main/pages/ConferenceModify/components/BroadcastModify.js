import MDEditor from '@uiw/react-md-editor';
import { Divider, Input, Space, Switch, Typography } from 'antd';
import React, { useEffect, useState } from 'react';
import { TypeManager } from 'utils';

const BroadcastModify = ({
  conference_type,
  conference_scope,
  conference_nm,
  conference_desc,
  onChangeConference,
}) => {
  const [desc, setDesc] = useState('');
  useEffect(() => {
    if (desc.length !== 0) {
      onChangeConference('conference_desc', desc);
    } else {
      setDesc(conference_desc);
    }
    // eslint-disable-next-line
  }, [desc]);

  const handleScope = (val) => {
    onChangeConference('conference_scope', val);
  };

  return (
    <>
      <Space style={{ width: '100%' }} align="">
        <Typography.Title level={3} style={{ width: '150px' }}>
          타입
        </Typography.Title>
        <Typography.Paragraph style={{ width: '950px' }}>
          {TypeManager.getConferenceType(conference_type).value}
        </Typography.Paragraph>
      </Space>
      <Space style={{ width: '100%' }} align="">
        <Typography.Title level={3} style={{ width: '150px' }}>
          제목
        </Typography.Title>
        <Typography.Paragraph style={{ width: '950px' }}>
          <Input
            name="conference_nm"
            style={{ fontSize: '1.5rem' }}
            className="w-100"
            value={conference_nm}
            onChange={(e) => onChangeConference(e.target.name, e.target.value)}
          />
        </Typography.Paragraph>
      </Space>
      <Space style={{ width: '100%' }} align="">
        <Typography.Title level={3} style={{ width: '150px' }}>
          설명
        </Typography.Title>
        <Typography.Paragraph style={{ width: '950px', minHeight: '450px' }}>
          <MDEditor.Markdown source={conference_desc} />
          <Divider />
          <MDEditor value={desc} height={'300'} onChange={setDesc} />
        </Typography.Paragraph>
      </Space>
      <Space style={{ width: '100%' }} align="center">
        <Typography.Title level={3} style={{ width: '150px' }}>
          공개여부
        </Typography.Title>
        <Typography.Paragraph style={{ width: '950px' }}>
          <Switch
            checkedChildren="공개"
            unCheckedChildren="비공개"
            defaultChecked={conference_scope}
            onChange={handleScope}
          />
        </Typography.Paragraph>
      </Space>
    </>
  );
};

export default BroadcastModify;

import { Card, Avatar } from 'antd';
import { Line } from 'components';
import React from 'react';
import { Link } from 'react-router-dom';

const { Meta } = Card;

const GroupCard = ({
  group_id,
  group_icon,
  member_count,
  group_nm,
  group_desc,
  group_manager,
}) => {
  return (
    <Link to={`/groups/${group_id}`}>
      <Card style={{ height: '' }} hoverable>
        <Meta title={group_nm} description={`멤버 ${member_count}명`} />
        <div style={{ paddingTop: '1vh' }}>
          {group_desc.length >= 25
            ? `${group_desc.slice(0, 20)}...`
            : group_desc}
        </div>
        <Line />
        <h4
          style={{
            display: 'flex',
            justifyContent: 'flex-start',
            alignItems: 'center',
            padding: 0,
            margin: 0,
          }}
        >
          <Avatar size="small" src={group_icon}>
            {group_manager.slice(0, 1)}
          </Avatar>{' '}
          <span> {group_manager}</span>
        </h4>
      </Card>
    </Link>
  );
};

export default GroupCard;

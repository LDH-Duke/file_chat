import React, { useEffect, useState } from 'react';
import BannerItem from './BannerItem';
import EmptyBanner from './EmptyBanner';

const BannerSchedule = ({ slide }) => {
  const [banner, setBanner] = useState({});
  const [count, setCount] = useState(0);

  useEffect(() => {
    setBanner(slide[count]);
  }, [slide, count]);
  const onBannerPrev = () => {
    if (count - 1 < 0) {
      setCount(slide.length - 1);
      return;
    }
    setCount(count - 1);
  };

  const onBannerNext = () => {
    if (count + 1 >= slide.length) {
      setCount(0);
      return;
    }
    setCount(count + 1);
  };
  return slide.length !== 0 ? (
    <BannerItem banner={banner} prev={onBannerPrev} next={onBannerNext} />
  ) : (
    <EmptyBanner />
  );
};

BannerSchedule.defaultProps = {
  slide: [
    {
      conference_id: 1,
      group_id: 3,
      conference_nm: 'AWSKRUG - AWS한국사용자모임',
      group_nm: 'AWSKRUG 데이터사이언스 온라인 모임 (3월 4일)',
      user_nm: 'Henry',
      user_id: '',
    },
    {
      conference_id: 2,
      conference_nm: 'Slicon Valley Career Fair',
      group_id: 2,
      group_nm: 'SV Developer Group',
      user_nm: 'austin',
    },
    {
      conference_id: 3,
      conference_nm: 'FREE! How to Protect Your Intellectual Property',
      group_id: 1,
      group_nm: 'Pusan Startup: Idea to IPO',
      user_nm: 'Derek',
      user_icon: '',
      user_desc: 'Planet designer',
    },
  ],
};

export default BannerSchedule;

/* eslint-disable */
import { Button, Card, Space, Typography } from 'antd';
import React, { useEffect, useState } from 'react';

const SurveyModify = ({ survey, setSurvey }) => {
  /* State */
  const [displaySurvey, setDisplaySurvey] = useState(survey);
  const [addSurvey, setAddSurvey] = useState([]);
  const [removeSurvey, setRemoveSurvey] = useState([]);

  /* Hooks */
  useEffect(() => {
    setDisplaySurvey(survey);
  }, [survey]);
  return (
    <>
      <Space style={{ width: '100%' }} align="">
        <Typography.Title level={3} style={{ width: '150px' }}>
          질문/설문
        </Typography.Title>
        <Typography.Paragraph style={{ width: '950px' }}>
          <Space direction="vertical" className="w-100">
            {displaySurvey
              .sort((a, b) => a.created_at - b.created_at)
              .map((item) => {
                const { survey_id, survey } = item;
                const { title } = survey;
                return (
                  <Card key={survey_id}>
                    {title} <Button type="link">상세보기</Button>
                  </Card>
                );
              })}
          </Space>
          {/* {JSON.stringify(survey)} */}
        </Typography.Paragraph>
      </Space>
    </>
  );
};

export default SurveyModify;

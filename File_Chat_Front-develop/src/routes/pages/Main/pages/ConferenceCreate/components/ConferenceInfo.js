import React from 'react';
import { Row, Col } from 'layout';
import { documentActions } from 'redux/module/document';
import MDEditor from '@uiw/react-md-editor';

import { Line } from 'components';
import {
  Empty,
  Select,
  Card,
  Button,
  Input,
  Upload,
  Checkbox,
  Radio,
  DatePicker,
  Divider,
} from 'antd';
import {
  QuestionCircleOutlined,
  FormOutlined,
  FundOutlined,
  AudioOutlined,
  CloudUploadOutlined,
  DeleteOutlined,
} from '@ant-design/icons';
import './ConferenceInfo.css';
import { useDispatch } from 'react-redux';
import { MessageAlert } from 'utils';
import { v4 } from 'uuid';
const { Option } = Select;
const { Dragger } = Upload;

const SERVER_URL = 'https://convert.livecon.kr/convert';
const types = [
  {
    key: 't1',
    title: '회의',
    value: 'conference',
    icon: <FormOutlined style={{ fontSize: '1.85em' }} />,
  },
  {
    key: 't2',
    title: '강의',
    value: 'class',
    icon: <FundOutlined style={{ fontSize: '1.85em' }} />,
  },
  {
    key: 't3',
    title: '인터뷰',
    value: 'interview',
    icon: <AudioOutlined style={{ fontSize: '1.85em' }} />,
  },
];
const ConferenceInfo = ({
  conference,
  data,
  setData,
  handleChageData,
  setConference,
}) => {
  /* Config */

  /**
   * 파일업로드 설정
   * --
   */
  const dndConfig = {
    name: 'file',
    multiple: true,
    action: SERVER_URL,

    onChange: (info) => {
      const { status } = info.file;
      if (status === 'done') {
        const { resultData } = info.file.response;
        dispatch(
          documentActions.addDocument({
            fileName: info.file.name,
            imageUrlList: resultData,
          })
        );
        setData({
          ...data,
          assets: [
            ...data.assets,
            {
              assets_nm: info.file.name,
              assets_type: info.file.type,
              assets_content: resultData,
            },
          ],
        });

        MessageAlert.success(`${info.file.name} 파일 업로드 완료`);
      } else if (status === 'error') {
        if (info.file.response) {
          const { resultCode } = info.file.response;

          if (resultCode === 400) {
            MessageAlert.error(`${info.file.name} 지원하지 않는 형식입니다`);
          } else {
            MessageAlert.error(`${info.file.name} 내부 서버 오류입니다`);
          }
        } else {
          MessageAlert.error(`${info.file.name} 내부 서버 오류입니다`);
        }
      }
    },
  };

  /* Redux */
  const dispatch = useDispatch();

  /* Functions */

  /**
   * 컨퍼런스 설명 수정
   * @param {*} val
   */
  // eslint-disable-next-line
  const handleDescription = (val) => {
    setConference({ ...conference, conference_desc: val });
  };

  /**
   * 설문추가 함수
   * --
   */
  const handleAddSurvey = () => {
    setData({
      ...data,
      survey: [
        {
          id: v4(),
          title: '',
          replys: [],
          type: 'single', // ['single','multi','text']
        },
        ...data.survey,
      ],
    });
  };

  /**
   * 설문답변 추가 함수
   * --
   */
  const handleAddSurveyAnswer = (idx) => {
    setData({
      ...data,
      survey: [
        ...data.survey.slice(0, idx),
        {
          ...data.survey[idx],
          replys: [
            ...data.survey[idx].replys,
            {
              id: v4(),
              value: '',
            },
          ],
        },
        ...data.survey.slice(idx + 1),
      ],
    });
  };

  /**
   * 설문 타이틀 변경
   * --
   * @param {*} id
   * @param {*} value
   */
  const handleSurveyTitle = (id, value) => {
    const temp = data.survey.map((item) =>
      id === item.id ? { ...item, title: value } : item
    );
    setData({
      ...data,
      survey: temp,
    });
  };

  /**
   * 설문 답변 변경
   * --
   * @param {*} surveyIndex
   * @param {*} id
   * @param {*} value
   */
  const handleSurveyAnswer = (surveyIndex, id, value) => {
    const temp = data.survey[surveyIndex].replys.map((item) =>
      id === item.id ? { ...item, value } : item
    );
    const surveyTemp = data.survey.map((item, idx) =>
      idx === surveyIndex ? { ...item, replys: temp } : item
    );
    // console.log(surveyTemp);
    setData({
      ...data,
      survey: surveyTemp,
    });
  };

  /**
   * 설문 삭제
   * --
   */
  const handleDeleteSurvey = (idx) => {
    setData({
      ...data,
      survey: [...data.survey.slice(0, idx), ...data.survey.slice(idx + 1)],
    });
  };

  /**
   * 설문답변 삭제
   * --
   */
  const handleDeleteSurveyAnswer = (idx, childId) => {
    setData({
      ...data,
      survey: [
        ...data.survey.slice(0, idx),
        {
          ...data.survey[idx],
          replys: [
            ...data.survey[idx].replys.slice(0, childId),
            ...data.survey[idx].replys.slice(childId + 1),
          ],
        },
        ...data.survey.slice(idx + 1),
      ],
    });
  };
  /* Render */
  return (
    <>
      <Col x={24}>
        {/* === 도움말 === */}
        <div
          style={{
            width: '100%',
            lineHeight: 0.8,
            padding: 3,
            marginBottom: -10,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div>
            <h1>Help</h1>
            <p>
              라이브 생성실에는 방송유형, 강의자료, 질문/투표 등 실시간 컨텐츠가
              준비되어있습니다
            </p>
          </div>
          <div style={{ textAlign: 'right' }}>
            <Button type="link" size="large">
              <QuestionCircleOutlined />
              사용방법
            </Button>
          </div>
        </div>
      </Col>

      {/* ===== 입력폼 =====  */}
      <Col x={17} style={{ padding: 5 }}>
        <Card>
          <Row>
            {/* 유형 */}
            <Col x={1} />
            <Col x={3}>
              <h3>유형</h3>
            </Col>
            <Col x={19} style={{ textAlign: 'left', display: 'flex' }}>
              {types.map((type) => {
                const checked = data.conference_type === type.value;
                return (
                  <div
                    key={type.key}
                    onClick={() =>
                      handleChageData('conference_type', type.value)
                    }
                    style={{
                      textAlign: 'center',
                      width: 135,
                      lineHeight: 2.5,
                    }}
                  >
                    <Checkbox checked={checked} />
                    <Button
                      type={checked ? 'primary' : 'dashed'}
                      shape="round"
                      size="large"
                      block
                      icon={type.icon}
                      style={{
                        width: 120,
                        height: 120,
                        borderRadius: 18,
                        color: checked ? '#fff' : '#b8b8b8',
                      }}
                    >
                      <br />
                      {type.title}
                    </Button>
                  </div>
                );
              })}
            </Col>
            <Col x={1} />
            <Line />

            {/* 제목 */}
            <Col x={1} />
            <Col x={3}>
              <h3>제목</h3>
            </Col>
            <Col x={19}>
              <Input
                placeholder="제목을 입력해 주세요"
                name="conference_nm"
                value={conference.conference_nm}
                onChange={(e) =>
                  setConference({
                    ...conference,
                    [e.target.name]: e.target.value,
                  })
                }
              />
            </Col>
            <Col x={1} />

            <Line />

            {/* 설명 */}
            <Col x={1} />
            <Col x={3}>
              <h3>설명</h3>
            </Col>
            <Col x={19}>
              <MDEditor
                preview="edit"
                previewOptions={false}
                value={conference.conference_desc}
                onChange={(e) =>
                  setConference({ ...conference, conference_desc: e })
                }
              />
              <Divider />
              <MDEditor.Markdown source={conference.conference_desc} />
              {/* <TextArea
                rows={4}
                name="conference_desc"
                placeholder="내용을 입력해 주세요"
                value={conference.conference_desc}
                onChange={(e) =>
                  setConference({
                    ...conference,
                    [e.target.name]: e.target.value,
                  })
                }
              /> */}
            </Col>
            <Col x={1} />

            <Line />

            {/* 날짜 */}
            <Col x={1} />
            <Col x={3}>
              <h3>라이브</h3>
            </Col>
            <Col x={19}>
              <DatePicker
                showTime
                name="conference_date"
                onChange={(value) =>
                  setConference({
                    ...conference,
                    conference_date: value,
                  })
                }
              />
            </Col>
            <Col x={1} />
            <Line />

            <Col x={1} />
            <Col x={3}>
              <h3>첨부파일</h3>
            </Col>
            <Col x={19}>
              <div>
                <Dragger {...dndConfig} style={{ lineHeight: 0.5 }}>
                  <p className="ant-upload-drag-icon" style={{ margin: 0 }}>
                    <CloudUploadOutlined style={{ fontSize: '2.2em' }} />
                    <br />
                    클릭하거나 파일을 드래그해서 업로드해주세요.
                  </p>
                </Dragger>
              </div>
            </Col>
            <Col x={1} />

            <Line />

            {/* 질문/투표 */}

            {/* 멤버 */}
            <Col x={1} />
            <Col x={3}>
              <h3>질문/투표</h3>
            </Col>
            <Col x={19}>
              <Button block type="dashed" onClick={handleAddSurvey}>
                추가+
              </Button>
              {data.survey.length < 1 ? (
                <div>
                  <br />
                  <Empty description="위의 추가버튼을 눌러서 설문지를 추가해주세요." />
                </div>
              ) : (
                data.survey.map((item, itemIndex) => (
                  <div
                    key={itemIndex}
                    style={{
                      marginTop: 15,
                      borderRadius: 10,
                      border: '1px solid #cacaca',
                      padding: '15px 15px 15px 22px',
                      display: 'flex',
                      justifyContent: 'space-between',
                      // alignItems: 'center',
                    }}
                  >
                    <div style={{ width: '80%' }}>
                      <Input
                        placeholder="질문을 입력해 주세요"
                        value={item.title}
                        style={{
                          marginBottom: 8,
                          width: '99%',
                        }}
                        onChange={(e) =>
                          handleSurveyTitle(item.id, e.target.value)
                        }
                      />
                      <Radio.Group name="radiogroup">
                        {item.replys.map((answer, answerIndex) => (
                          <Radio
                            key={answerIndex}
                            style={{ display: 'block' }}
                            value={answerIndex}
                          >
                            <Input
                              size="small"
                              placeholder="Answer"
                              value={answer.value}
                              style={{ marginBottom: 5, width: '100%' }}
                              onChange={(e) =>
                                handleSurveyAnswer(
                                  itemIndex,
                                  answer.id,
                                  e.target.value
                                )
                              }
                            />
                            <DeleteOutlined
                              onClick={() =>
                                handleDeleteSurveyAnswer(itemIndex, answerIndex)
                              }
                              style={{ marginLeft: 8, opacity: 0.65 }}
                            />
                          </Radio>
                        ))}
                        <Radio style={{ display: 'block' }}>
                          <Button
                            onClick={() => handleAddSurveyAnswer(itemIndex)}
                          >
                            +
                          </Button>
                        </Radio>
                      </Radio.Group>
                    </div>
                    <div style={{ width: '20%' }}>
                      <Select defaultValue={item.type} placeholder="분류">
                        <Option value="single">객관식</Option>
                        <Option value="text">주관식</Option>
                      </Select>
                      <DeleteOutlined
                        onClick={() => handleDeleteSurvey(itemIndex)}
                        style={{
                          fontSize: '1.2em',
                          marginLeft: 12,
                          color: 'orange',
                        }}
                      />
                    </div>
                  </div>
                ))
              )}
            </Col>
            <Col x={1} />
          </Row>
          {/* <div
                style={{ width: '100%', marginTop: 20, textAlign: 'center' }}
              >
                <Button
                  type="primary"
                  shape="round"
                  size="large"
                  disabled
                  style={{ paddingLeft: 35, paddingRight: 35 }}
                >
                  생성하기
                </Button>
              </div> */}
        </Card>
      </Col>
    </>
  );
};

export default ConferenceInfo;

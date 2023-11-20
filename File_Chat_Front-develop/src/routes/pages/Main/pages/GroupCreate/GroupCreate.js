/**
 *
 */

import { useEffect, useState } from 'react';
import { Content, Row, Col } from 'layout';
import { Select, Card, Button, PageHeader, Input } from 'antd';
import {
  EyeOutlined,
  EyeInvisibleOutlined,
  QuestionCircleOutlined,
} from '@ant-design/icons';
import { useHistory } from 'react-router-dom';
import { LCGroupApi } from 'api';
import LCUserApi from 'api/LCUserApi';
import { MessageAlert } from 'utils';
import { useSelector } from 'react-redux';

const { TextArea } = Input;
const { Option } = Select;

/**
 * 그룹생성
 * --
 */
const GroupCreate = () => {
  /* Router */
  const history = useHistory();

  /* State */
  // 생성버튼 활성화 플래그
  const [createButtonIsOpen, setCreateButtonIsOpen] = useState(false);
  const userInfo = useSelector((state) => state.userInfo.userInfo);
  // Data
  const [data, setData] = useState({
    group_nm: '',
    group_desc: '',
    group_scope: true,
  });
  const [member, setMember] = useState([]);
  const [userList, setUserList] = useState([]);
  const [keyword, setKeyword] = useState('');

  /* Hooks */
  useEffect(() => {
    handleGetUserList();
    // eslint-disable-next-line
  }, [keyword]);

  useEffect(() => {
    if (!userInfo) {
      MessageAlert.warning('로그인 후 사용가능합니다.');
      history.push('/signin');
    }
    // eslint-disable-next-line
  }, [userInfo]);

  /* Functions */

  const handleGetUserList = async () => {
    if (keyword.length < 1) {
      return;
    }
    const result = await LCUserApi.getUserList(keyword);
    if (result) {
      setUserList(result);
    }
  };
  /**
   * 데이터 변경함수
   * --
   */
  const handleChangeData = ({ target }) => {
    const { name, value } = target;
    setData({ ...data, [name]: value });
    handleCheckDataValidation();
  };

  const handleKeyword = (e) => {
    setKeyword(e.target.value);
  };

  /**
   * 생성버튼 감지
   * --
   */
  const handleCheckDataValidation = () => {
    if (data.group_nm !== '' && data.group_desc !== '') {
      setCreateButtonIsOpen(true);
    } else if (createButtonIsOpen) {
      setCreateButtonIsOpen(false);
    }
  };

  /**
   * 멤버 검색 후 등ㄹㄱ
   * --
   * @param {*} obj
   */
  const handleMember = (t, obj) => {
    const { key, value } = obj;
    setMember([...member, { key, value, user_id: key }]);
    setKeyword('');
  };

  /**
   * 멤버 제외
   * @param {*} obj
   */
  const handleDeselectMember = (t, obj) => {
    const result = member.filter((item) => {
      return obj.key !== item.key;
    });
    setMember(result);
  };

  /**
   * 데이터 저장
   * --
   */
  const handleSubmit = async () => {
    const { user_id, user_nm } = userInfo;
    const postData = {
      ...data,
      members: member,
      user_id,
      user_nm,
    };
    const result = await LCGroupApi.insertGroup(postData);
    if (result) {
      MessageAlert.success('그룹생성 완료!');
      history.push('/groups');
    }
  };

  const filteredOptions = userList.filter((o) => !member.includes(o));

  /* RENDER */
  return (
    <>
      {/* ===== 헤더 ===== */}
      <PageHeader
        className="site-page-header"
        onBack={() => history.goBack()}
        title="그룹생성"
        // subTitle="This is a subtitle"
        style={{
          background: '#fff',
          boxShadow: '1px 2px 9px -6px rgba(0,0,0, 0.3)',
        }}
      />
      <br />

      {/* ===== 폼 ===== */}
      <Content maxWidth={900}>
        <Row>
          {/* === 도움말 === */}
          <Col x={24}>
            <div
              style={{
                width: '100%',
                lineHeight: 1,
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
                  라이브 생성실에는 방송유형, 강의자료, 질문/투표 등 실시간
                  컨텐츠가 준비되어있습니다
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

          {/* === 폼 === */}
          <Col x={24}>
            <Card>
              <Row>
                {/* 제목 */}
                <Col x={1} />
                <Col x={3}>
                  <h3>제목</h3>
                </Col>
                <Col x={19}>
                  <Input
                    name="group_nm"
                    value={data.group_nm}
                    onChange={handleChangeData}
                    placeholder="제목을 입력해 주세요"
                    onBlur={handleCheckDataValidation}
                  />
                </Col>
                <Col x={1} />

                {/* 설명 */}
                <Col x={1} />
                <Col x={3}>
                  <h3>설명</h3>
                </Col>
                <Col x={19}>
                  <TextArea
                    rows={4}
                    name="group_desc"
                    value={data.group_desc}
                    onChange={handleChangeData}
                    placeholder="내용을 입력해 주세요"
                    onBlur={handleCheckDataValidation}
                  />
                </Col>
                <Col x={1} />

                {/* 공개범위 */}
                <Col x={1} />
                <Col x={3}>
                  <h3>공개범위</h3>
                </Col>
                <Col x={19}>
                  <Select
                    style={{ width: 200 }}
                    placeholder="분류"
                    name="group_scope"
                    value={data.group_scope}
                    onChange={(value) =>
                      handleChangeData({
                        target: { name: 'group_scope', value },
                      })
                    }
                  >
                    <Option value={true}>
                      <EyeOutlined /> 공개
                    </Option>
                    <Option value={false}>
                      <EyeInvisibleOutlined /> 비공개
                    </Option>
                  </Select>
                </Col>
                <Col x={1} />

                {/* 멤버 */}
                <Col x={1} />
                <Col x={3}>
                  <h3>멤버</h3>
                </Col>
                <Col x={19}>
                  <Select
                    mode="multiple"
                    // mode="tags"
                    style={{ width: '100%' }}
                    placeholder="유저를 검색후 선택해 주세요"
                    tokenSeparators={[',']}
                    // onChange={handleMember}
                    // onKeyUp={() => {}}
                    // inputValue={keyword}
                    onSelect={handleMember}
                    onDeselect={handleDeselectMember}
                    onInputKeyDown={handleKeyword}

                    // onFocus={handleSearchUser}
                  >
                    {/* {r} */}
                    {/* <Option value="1">김데릭</Option>
                    <Option value="2">정데릭</Option> */}
                    {filteredOptions.map((item) => {
                      const { user_id, user_nm } = item;
                      return (
                        <Option key={user_id} value={user_nm}>
                          {user_nm}({user_id})
                        </Option>
                      );
                    })}
                  </Select>
                </Col>
                <Col x={1} />
              </Row>
              <div
                style={{ width: '100%', marginTop: 20, textAlign: 'center' }}
              >
                <Button
                  type="primary"
                  shape="round"
                  size="large"
                  style={{ paddingLeft: 35, paddingRight: 35 }}
                  disabled={!createButtonIsOpen}
                  onClick={handleSubmit}
                >
                  생성하기
                </Button>
              </div>
            </Card>
          </Col>
        </Row>
      </Content>
    </>
  );
};

export default GroupCreate;

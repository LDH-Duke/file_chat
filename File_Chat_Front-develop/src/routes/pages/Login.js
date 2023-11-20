/*  eslint-disable */
/**
 *
 *
 */

import {
  useState,
  useEffect,
  // useContext
} from 'react';
import { useHistory } from 'react-router-dom';
import { Form, Input, Button, Radio, Card } from 'antd';
import { setCookie, getCookie } from 'utils';
// import { Context as CommonContext } from 'context/Common';
import { Loading, ModalLayout, Row, Col } from 'components';
import { Content } from 'components/Layout';
import MessageAlert from 'utils/MessageAlert';
import APIManager from 'utils/APIManager';
import queryString from 'query-string';
// import { UserApi } from 'api';
import { InfoCircleOutlined } from '@ant-design/icons';

const $ = new APIManager();

/**
 * 로그인
 * --
 */
const Login = () => {
  /* ===== Router ===== */
  const history = useHistory();
  const { type } = queryString.parse(history.location.search);

  /* ===== State ===== */
  // 폼데이터
  const [form] = Form.useForm();
  // 접속자 타입
  const [userType, setUserType] = useState(type ? type : 'student');
  // 접속 아이디
  const [id, setId] = useState('');
  // const [id, setId] = useState('21379');
  // const [id, setId] = useState('20202020');
  // 패스워드
  const [pw, setPw] = useState('');
  // 학생이름
  const [name, setName] = useState('');
  // 학생등록모달
  // const [subjectMappingModal, setSubjectMappingModal] = useState(false);
  // 학생등록모달
  const [modal, setModal] = useState(false);
  // 로딩
  const [loading, setLoading] = useState(false);

  /* ===== Context ===== */
  // const { onUpdateStatus: onUpdateCommonStatus } = useContext(CommonContext); // 유저 상태 관리

  /* ===== Functions ===== */
  /**
   * 최초 학생 등록
   * --
   */
  const handleSaveFirstLogin = async () => {
    try {
      if (!id || name === '') {
        return MessageAlert.warning('입력정보를 확인해 주세요.');
      }
      // await UserApi.setStudent(id, name);
      setModal(false);
      setLoading(false);
      MessageAlert.success('학생정보가 등록되었습니다.');
    } catch (e) {
      MessageAlert.error('학생정보를 등록할 수 없습니다. 다시 시도해 주세요');
    }
  };

  /**
   * 값 변경함수
   */
  const onChange = ({ target }) => {
    const { name, value } = target;
    if (name === 'id') {
      setId(value);
    } else if (name === 'pw') {
      setPw(value);
    } else {
      setName(value);
    }
  };

  /**
   * GET 패스
   * --
   */
  const handleGetPath = (value) => {
    return value === 'administrator'
      ? '/administrator/classes'
      : value === 'student'
      ? '/students/mypage?tab=dashboard'
      : '/professor';
  };

  /**
   * 로그인 함수
   * --
   */
  const handleLogin = async () => {
    try {
      setLoading(true);
      // 데이터
      const body = {
        // userId: '20111894',
        // userPw: '123456',
        userId: id,
        userPw: pw,
        userType:
          userType === 'administrator' ? 0 : userType === 'student' ? 1 : 2,
      };
      if (!id || !pw) {
        setLoading(false);
        return MessageAlert.warning('계정정보를 모두 입력해 주세요.');
      }
      // 로그인 성공 시 이동 경로
      const redirectPath = handleGetPath(userType);
      // if (userType === 'professor') {
      //   const { status, data } = await $.post(
      //     '/users/login',
      //     {
      //       userId: id,
      //       userPw: pw,
      //     },
      //     false,
      //     true,
      //     false
      //   );
      //   // debugger;
      //   setCookie('AIM_ACCESS_LEVEL', userType);
      //   return history.push(redirectPath);
      // }

      // API Call
      const result = await UserApi.login(userType, id, pw);
      if (result.status === 401) {
        return setTimeout(() => {
          setLoading(false);
          return MessageAlert.warning(result.data);

          // MessageAlert.warning('최초 접속 시 회원등록이 필요합니다.');
          // setModal(true);
        }, 350);
      }

      setCookie('AIM_ACCESS_ID', id);
      setCookie('AIM_ACCESS_LEVEL', userType);
      setCookie('AIM_ACCESS_TOKEN', result.data.token);
      setCookie('AIM_ACCESS_DATA', JSON.stringify(result.data));
      // 컨텍스트에 저장
      // onUpdateCommonStatus({
      //   token: result.data.token,
      // });
      // 로그인 후처리
      setTimeout(() => {
        setLoading(false);
        history.push(redirectPath);
      }, 500);
    } catch (e) {
      setLoading(false);
      // console.log('e: ', e);
      MessageAlert.error('로그인을 할 수 없습니다.');
    }
  };

  /* ===== useEffect ===== */
  useEffect(() => {
    const init = async () => {
      const accessLevel = getCookie('AIM_ACCESS_LEVEL');
      const path = handleGetPath(accessLevel);
      const { status } = await $.post('/auth/verify', null, false, true, true);
      if (status === 200) {
        history.push(`${path}`);
      }
    };
    init();

    // AntModal.warning({
    //   title: '시스템 공지',
    //   content: `09:00부터 16:00까지 시스템 점검으로 인하여 일부 기능이 제한될 수 있습니다`,
    //   okText: '확인',
    //   onOk: () => {
    //     // clearInterval(timerId.current);
    //     // handleChangeProblem();
    //   },
    // });
  }, []);

  /* ===== RENDER ===== */
  return (
    <>
      <Content layout maxWidth="100%" style={{ background: '#ddd' }}>
        <Loading value={loading} />
        <Content maxWidth={400}>
          <br />

          <Card
            bordered={false}
            className="slide-in-top"
            style={{
              width: '100%',
              marginBottom: 15,
              boxShadow: '2px 2px 10px -3px rgba(0,0,0,0.1)',
              textAlign: 'center',
            }}
          >
            <br />
            <img
              width={'50%'}
              src={
                'https://3.bp.blogspot.com/-xwDmOg5jMlk/Wot_95iGeoI/AAAAAAAAAgA/hdzUKOwSwBQrMqXVmG4cgFbPDpoFZYnfgCLcBGAs/s1600/9762247_orig.jpg'
              }
            />
            <br />
            <br />
            <br />
            <Form form={form} layout="vertical" onSubmitCapture={handleLogin}>
              <Form.Item style={{ textAlign: 'center' }}>
                <Radio.Group
                  size="large"
                  value={userType}
                  buttonStyle="solid"
                  onChange={(e) => setUserType(e.target.value)}
                  // onChange={handleChangeUserType}
                >
                  <Radio.Button value="student">학생</Radio.Button>
                  <Radio.Button value="professor">교수</Radio.Button>
                  <Radio.Button value="administrator">관리자</Radio.Button>
                </Radio.Group>
              </Form.Item>
              <Form.Item>
                <Input
                  size="large"
                  placeholder="Account"
                  type="text"
                  value={id}
                  name="id"
                  onChange={onChange}
                />
              </Form.Item>
              <Form.Item>
                <Input
                  size="large"
                  placeholder="Password"
                  type="password"
                  value={pw}
                  name="pw"
                  onChange={onChange}
                />
              </Form.Item>

              <Form.Item
                style={{
                  // background: 'red',
                  textAlign: 'left',
                  padding: 2,
                  marginTop: -17,
                  marginBottom: 10,
                  fontSize: '0.78em',
                }}
              >
                <InfoCircleOutlined /> 기존 학사시스템과 동일한 계정/패스워드를
                사용해주세요
              </Form.Item>

              <Form.Item>
                <Button type="primary" block size="large" htmlType="submit">
                  로그인
                </Button>
              </Form.Item>
            </Form>
            {/* <Link to="/common/signup">회원가입</Link>
            <br /> */}
            {/* <Footer /> */}
          </Card>
        </Content>
      </Content>

      {/* ===== Modal ===== */}
      <ModalLayout
        visible={modal}
        type={'modal'}
        title={'회원등록'}
        width={450}
        closable={true}
        onOk={() => {
          setModal(false);
          setLoading(false);
        }}
        onCancel={() => {
          setModal(false);
          setLoading(false);
        }}
        footer={
          <Button
            size={'large'}
            type="primary"
            style={{ marginRight: 8 }}
            onClick={handleSaveFirstLogin}
          >
            제출하기
          </Button>
        }
      >
        <Row>
          <Col x={24}>
            <Input
              placeholder=""
              value={id}
              disabled
              size="large"
              style={{ marginBottom: 5 }}
            />
          </Col>
          <Col x={24}>
            <Input
              name="name"
              size="large"
              placeholder="이름을 입력해 주세요"
              value={name}
              onChange={onChange}
            />
          </Col>
        </Row>
      </ModalLayout>

      {/* ===== Modal2 ===== */}
      <ModalLayout
        visible={modal}
        type={'modal'}
        title={'수업맵핑'}
        width={450}
        closable={true}
        onOk={() => {
          setModal(false);
          setLoading(false);
        }}
        onCancel={() => {
          setModal(false);
          setLoading(false);
        }}
        footer={
          <Button
            size={'large'}
            type="primary"
            style={{ marginRight: 8 }}
            onClick={handleSaveFirstLogin}
          >
            제출하기
          </Button>
        }
      >
        <Row>
          <Col x={24}>
            <Input
              placeholder=""
              value={id}
              disabled
              size="large"
              style={{ marginBottom: 5 }}
            />
          </Col>
          <Col x={24}>
            <Input
              name="name"
              size="large"
              placeholder="이름을 입력해 주세요"
              value={name}
              onChange={onChange}
            />
          </Col>
        </Row>
      </ModalLayout>
    </>
  );
};

export default Login;

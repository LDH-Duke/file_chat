import { AudioOutlined, FormOutlined, FundOutlined } from '@ant-design/icons';

// ENUM('BEFORE_BROADCAST', 'ON_AIR', 'READYE_TO_BROADCAST', 'END')
const stateType = [
  {
    type: 'BEFORE_BROADCAST',
    value: '방송전',
    color: '',
    backgroundColor: '',
    icon: '',
  },
  {
    type: 'ON_AIR',
    value: '방송중',
    color: '',
    backgroundColor: '',
    icon: '',
  },
  {
    type: 'READYE_TO_BROADCAST',
    value: '방송준비전',
    color: '',
    backgroundColor: '',
    icon: '',
  },
  {
    type: 'END',
    value: '방송 종료',
    color: '',
    backgroundColor: '',
    icon: '',
  },
];
// ENUM('class', 'conference', 'interview')
const conferenceType = [
  {
    type: 'class',
    // type: 'CLASS',
    value: '강의',
    color: '',
    backgroundColor: '',
    // icon: () => <FundOutlined />,
    icon: <FundOutlined />,
  },
  {
    type: 'conference',
    // type: 'CONFERENCE',
    value: '회의',
    color: '',
    backgroundColor: '',
    icon: <FormOutlined />,
    // icon: () => <FormOutlined />,
  },
  {
    type: 'interview',
    // type: 'INTERVIEW',
    value: '인터뷰',
    color: '',
    backgroundColor: '',
    icon: <AudioOutlined />,
    // icon: () => <AudioOutlined />,
  },
];

const TypeManager = {
  stateList: () => conferenceType,
  getStateType: (type) => {
    const idx = stateType.findIndex((item) => {
      return item.type === type;
    });
    return stateType[idx];
  },
  getConferenceType: (type) => {
    const idx = conferenceType.findIndex((item) => {
      return item.type === type;
    });
    return conferenceType[idx];
  },
};

export default TypeManager;

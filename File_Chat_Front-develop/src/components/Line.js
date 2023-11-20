import { Divider } from 'antd';

const Line = ({ style }) => {
  return <Divider style={style} />;
};
Line.defaultProps = {
  style: { margin: '15px 0' },
};

export default Line;

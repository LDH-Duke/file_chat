/**
 * 타이틀 컴포넌트
 * --
 * date: 2021-05-06
 * writer: Derek
 */

import { Typography } from 'antd';
const { Title } = Typography;

const TitleComp = ({
  size,
  color,
  style,
  align,
  subButton,
  children,
  className,
}) => {
  /**
   * c
   * --
   * @param {*} size
   * @param {*} child
   * @returns
   */
  const handleSelectSize = (size, child) => {
    let level;
    switch (size) {
      case 1:
      case '1':
        level = 1;
        break;
      case 2:
      case '2':
        level = 2;
        break;
      case 3:
      case '3':
        level = 3;
        break;
      case 4:
      case '4':
      default:
        level = 4;
        break;
      case 5:
      case '5':
        level = 5;
        break;
      case 6:
      case '6':
        level = 6;
        break;
    }

    return (
      <Title
        level={level}
        className={className}
        style={{
          color,
          margin: 0,
          ...(align
            ? { textAlign: align }
            : {
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-end',
              }),
          ...style,
        }}
      >
        {child}
        <small>{subButton}</small>
      </Title>
    );
  };

  const r = handleSelectSize(size, children);
  return <>{r}</>;
};

TitleComp.defaultProps = {
  size: 4,
  color: '#222',
  children: 'title',
  className: '',
  subButton: null,
  align: null,
  style: {},
};

export default TitleComp;

/**
 *
 *
 */
import { Title } from 'components';
// import LoadingImg from 'assets/images/loading.gif';

const Loading = ({
  position,
  value,
  style,
  opacity,
  children,
  horizontalAlign,
  verticalAlign,
}) => {
  // const loadingView = <Title size={5}>Loading...</Title>
  const loadingView = <Title size={5}>Loading...</Title>;
  return (
    value && (
      <div
        style={{
          position,
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          display: 'flex',
          justifyContent:
            horizontalAlign === 'left'
              ? 'flext-start'
              : horizontalAlign === 'right'
              ? 'flex-end'
              : 'center',
          alignItems:
            verticalAlign === 'top'
              ? 'flex-start'
              : verticalAlign === 'bottom'
              ? 'flex-end'
              : 'center',
          padding: 10,
          zIndex: 999,
          background: `rgba(255,255,255, ${opacity})`,
          ...style,
        }}
      >
        {children ? children : loadingView}
      </div>
    )
  );
};

/* DF */
Loading.defaultProps = {
  position: 'fixed',
  value: false,
  opacity: 0.9,
  horizontalAlign: 'center',
  verticalAlign: 'center',
  children: null,
  style: {},
  image: true,
};

export default Loading;

import { FormOutlined } from '@ant-design/icons';
import defaultVideo from 'assets/images/defaultVideo.png';
import { DrawingBoard } from 'components';
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import { useSelector } from 'react-redux';

const BASE_STORAGE_LINK = 'https://convert-store.livecon.kr/';

const DocumentSharingVideoLayout = ({ videoTrack, participantElements }) => {
  /* state */
  const [canvasSize, setCanvasSize] = useState({
    width: 0,
    height: 0,
  });
  const [windowSize, setWindowSize] = useState({
    width: 0,
    height: 0,
  });

  /* redux state */
  const activeImage = useSelector((state) => state.document.activeImage);

  /* ref */
  const videoRef = useRef(null);
  const wrapperRef = useRef(null);

  /* Hooks */
  const canvasRef = useCallback(
    (node) => {
      setCanvasSize({
        width: node?.offsetWidth,
        height: node?.offsetHeight,
      });
    },
    // eslint-disable-next-line
    [windowSize]
  );

  useEffect(() => {
    const resizeListener = (e) => {
      setTimeout(() => {
        setWindowSize({
          width: window.innerWidth,
          height: window.innerHeight,
        });
      }, 0);
    };
    window.addEventListener('resize', resizeListener);

    return () => {
      window.removeEventListener('resize', resizeListener);
    };
  }, []);

  useLayoutEffect(() => {
    if (videoTrack) {
      videoTrack.attach(videoRef.current);
    }
    return () => {
      if (videoTrack) {
        // eslint-disable-next-line
        videoTrack.detach(videoRef.current);
      }
    };
  }, [videoTrack]);

  /* render */
  return (
    <div className="document-sharing-layout">
      <div className="owner-video-box">
        <video
          poster={defaultVideo}
          className="user-video"
          id="video1"
          ref={videoRef}
          autoPlay
        ></video>
      </div>

      <div id="mediaDocument" ref={wrapperRef}>
        {activeImage ? (
          <>
            <img
              className="document-image"
              alt="alt"
              src={`${BASE_STORAGE_LINK}${activeImage}`}
            ></img>
            <div className="canvas-stage" ref={canvasRef}>
              <DrawingBoard
                width={canvasSize.width}
                height={canvasSize.height}
                // ratio={0.39}
                stageClassName="document-drawing-board-stage"
              />
            </div>
          </>
        ) : (
          <div className="empty-document-image">
            <div className="icon">
              <FormOutlined />
            </div>
            <div className="text">공유할 파일을 선택해주세요.</div>
          </div>
        )}
      </div>

      <div className="participant-video">{participantElements}</div>
    </div>
  );
};

export default DocumentSharingVideoLayout;

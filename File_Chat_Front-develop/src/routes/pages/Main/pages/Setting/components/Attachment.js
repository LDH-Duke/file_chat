import React from 'react';
import { Upload, message } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import { useDispatch } from 'react-redux';
import { documentActions } from 'redux/module/document';

const { Dragger } = Upload;

const SERVER_URL = 'https://convert.livecon.kr/convert';
// const LOCAL_URL = 'http://localhost:3333/convert';

const Attachment = (props) => {
  // const sharingDocumentList = useSelector(
  //   (state) => state.document.sharingDocumentList
  // );
  const dispatch = useDispatch();

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

        message.success(`${info.file.name} 파일 업로드 완료`);
      } else if (status === 'error') {
        if (info.file.response) {
          const { resultCode } = info.file.response;

          if (resultCode === 400) {
            message.error(`${info.file.name} 지원하지 않는 형식입니다`);
          } else {
            message.error(`${info.file.name} 내부 서버 오류입니다`);
          }
        } else {
          message.error(`${info.file.name} 내부 서버 오류입니다`);
        }
      }
    },
  };

  return (
    <Dragger {...dndConfig} id="dndBox">
      <div className="dnd-section">
        <p className="ant-upload-drag-icon">
          <InboxOutlined />
        </p>
        <p className="ant-upload-text">
          파일을 업로드 하기 위해서는 클릭하거나 파일을 드래그하세요.
        </p>
      </div>
    </Dragger>
  );
};

export default Attachment;

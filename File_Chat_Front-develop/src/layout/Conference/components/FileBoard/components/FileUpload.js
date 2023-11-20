import { CloudUploadOutlined } from '@ant-design/icons';
import Dragger from 'antd/lib/upload/Dragger';
import React from 'react';
import { useDispatch } from 'react-redux';
import { documentActions } from 'redux/module/document';
import { MessageAlert } from 'utils';
const SERVER_URL = 'https://convert.livecon.kr/convert';

const FileUpload = ({ fileUpload }) => {
  /**
   * 파일업로드 설정
   * --
   */
  const dndConfig = {
    name: 'file',
    multiple: true,
    action: SERVER_URL,

    onChange: async (info) => {
      const { status } = info.file;
      if (status === 'done') {
        console.log(info.file);
        const { resultData } = info.file.response;
        dispatch(
          documentActions.addDocument({
            fileName: info.file.name,
            imageUrlList: resultData,
          })
        );
        await fileUpload({
          assets_nm: info.file.name,
          assets_type: info.file.type,
          assets_content: resultData,
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

  /* Router */
  /* State */
  /* Hooks */
  const dispatch = useDispatch();

  /* Functions */
  /* Render */
  return (
    <div>
      <Dragger {...dndConfig} style={{ lineHeight: 0.5 }}>
        <p className="ant-upload-drag-icon" style={{ margin: 0 }}>
          <CloudUploadOutlined style={{ fontSize: '2.2em' }} />
          <br />
          클릭하거나 파일을 드래그해서 업로드해주세요.
        </p>
      </Dragger>
    </div>
  );
};

export default FileUpload;

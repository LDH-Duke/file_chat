import React from 'react';
import Empty from 'antd/es/empty';
import { FileAddOutlined } from '@ant-design/icons';

const BASE_STORAGE_LINK = 'https://convert-store.livecon.kr/';

const FileBoardPresenter = ({
  sharingDocumentList,
  activeDocument,
  setActiveFile,
  isModerator,
  activeImage,
  moderatorActiveImage,
  handleSelectImage,
  modal,
  setModal,
}) => {
  let documents = Object.keys(sharingDocumentList);

  const imageThumbnailList = activeDocument.imageList.map((imageUrl) => {
    return (
      <div
        className={`image-box ${
          moderatorActiveImage === imageUrl && !isModerator ? 'moderator' : ''
        } 
        ${activeImage === imageUrl ? 'me' : ''}
        `}
        onClick={() => {
          handleSelectImage(imageUrl);
        }}
      >
        {moderatorActiveImage === imageUrl && !isModerator ? (
          <div className="moderator-badge video-badge">ALL</div>
        ) : (
          <></>
        )}

        {activeImage === imageUrl ? (
          <div className="my-badge video-badge">ME</div>
        ) : (
          <></>
        )}

        <img src={`${BASE_STORAGE_LINK}${imageUrl}`} alt="img" />
      </div>
    );
  });

  return (
    <div className="file-list-container">
      <div className="file-list-flex-box">
        <div className="file-list-box">
          {documents.length === 0 ? (
            <div className="empty-set-box">
              <Empty
                image={Empty.PRESENTED_IMAGE_SIMPLE}
                className="empty-set"
              />
            </div>
          ) : (
            documents.map((d) => {
              return (
                <div
                  className={`list-item ${
                    activeDocument.name === d ? 'active' : ''
                  }`}
                  onClick={() => {
                    setActiveFile(d);
                  }}
                >
                  <div className="list-title">{d}</div>
                </div>
              );
            })
          )}
          <div
            className="list-item flex-center flex-column text-center text-black"
            onClick={() => setModal(true)}
          >
            <FileAddOutlined style={{ fontSize: '1rem' }} />
            파일추가하기
          </div>
        </div>
      </div>
      <div className="document-image-flex-box">
        {imageThumbnailList.length === 0 ? (
          <div className="empty-set-box">
            <Empty
              image={Empty.PRESENTED_IMAGE_SIMPLE}
              className="empty-set"
            ></Empty>
          </div>
        ) : (
          <div className="image-row">{imageThumbnailList}</div>
        )}
      </div>
    </div>
  );
};

export default FileBoardPresenter;

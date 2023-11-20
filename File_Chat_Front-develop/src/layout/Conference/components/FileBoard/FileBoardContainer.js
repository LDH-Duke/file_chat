import React, { useState } from 'react';
import { batch, useDispatch, useSelector } from 'react-redux';
import { documentActions } from 'redux/module/document';
import JitsiManager from 'utils/jitsi/JitsiManager';
import FileBoardPresenter from './FileBoardPresenter';
import { MODERATOR_SELECT_IMAGE } from 'utils/jitsi/events/customCommand';
import { LCConferenceApi } from 'api';
import { useLocation } from 'react-router';
import { Modal } from 'antd';
import FileUpload from './components/FileUpload';
import { drawingActions } from 'redux/module/drawing';

const jitsiManager = new JitsiManager();

const FileBoardContainer = () => {
  /* Router */
  const { search } = useLocation();
  const [, conference_id] = search.split('?room=');
  /* State */
  const sharingDocumentList = useSelector(
    (state) => state.document.sharingDocumentList
  );
  const activeDocument = useSelector((state) => state.document.activeDocument);
  const activeImage = useSelector((state) => state.document.activeImage);
  const moderatorActiveImage = useSelector(
    (state) => state.document.moderatorActiveImage
  );
  const isModerator = useSelector((state) => state.localUser.isModerator);

  const [modal, setModal] = useState(false);
  /* Hooks */
  const dispatch = useDispatch();

  /* Functions */
  /**
   * @title 파일 선택
   * @description 좌측 탭에서 파일 click 이벤트를 처리
   * @param docKey 선택된 파일의 키
   */
  const setActiveFile = (docKey) => {
    const payload = {
      name: docKey,
      imageList: sharingDocumentList[docKey],
    };

    const firstPageUrl = sharingDocumentList[docKey][0];

    batch(() => {
      dispatch(documentActions.selectActiveDocument(payload));
      handleSelectImage(firstPageUrl);
    });
  };

  /**
   * @title 이미지 선택
   * @description 좌측 탭에서 이미지 클릭 이벤트를 처리
   * @param imageUrl 선택한 이미지의 url
   */
  const handleSelectImage = (imageUrl) => {
    if (isModerator) {
      jitsiManager.sendCommand(MODERATOR_SELECT_IMAGE, {
        value: imageUrl,
      });
    }

    batch(() => {
      /**
       * 1. 드로잉 시트 선택
       * 2. 이미지 선택
       * 3. 문서 공유 모드 활성화
       */
      dispatch(drawingActions.selectActiveSheet(imageUrl));
      dispatch(documentActions.selectImage(imageUrl));
      dispatch(documentActions.setDocumentSharingMode(true));
    });
  };

  /**
   * @title 파일 업로드 처리
   * @description 파일 업로드 시 Redux 상태 업데이트
   * @param fileInfo
   */
  const handleFileUpload = async (fileInfo) => {
    if (!fileInfo) {
      return;
    }

    const result = await LCConferenceApi.insertConferenceAsset({
      conference_id,
      ...fileInfo,
    });
    if (result) {
      console.log(result);
    }
  };

  /* Render */
  return (
    <>
      <FileBoardPresenter
        sharingDocumentList={sharingDocumentList}
        activeImage={activeImage}
        moderatorActiveImage={moderatorActiveImage}
        activeDocument={activeDocument}
        isModerator={isModerator}
        setActiveFile={setActiveFile}
        handleSelectImage={handleSelectImage}
        modal={modal}
        setModal={setModal}
      />
      <Modal
        title="파일 추가"
        visible={modal}
        onCancel={() => setModal(false)}
        width={1000}
        bodyStyle={{ height: '25rem' }}
      >
        <FileUpload fileUpload={handleFileUpload} />
      </Modal>
    </>
  );
};

export default FileBoardContainer;

import { produce } from 'immer';

// MODE CONTROL
const DOCUMENT_SHARING_START = 'DOCUMENT/DOCUMENT_SHARING_START';
const DOCUMENT_SHARING_END = 'DOCUMENT/DOCUMENT_SHARING_END';
const CHANGE_SHARING_IMAGE = 'DOCUMENT/CHANGE_SHARING_IMAGE';

const DOCUMENT_SHARING_TOGGLE = 'DOCUMENT/DOCUMENT_SHARING_TOGGLE';
const SET_DOCUMENT_SHARING = 'DOCUMENT/SET_DOCUMENT_SHARING';

// FILE CONTROL
const ADD_SHARING_FILE = 'DOCUMENT/ADD_SHARING_FILE';
const DELETE_SHARING_FILE = 'DOCUMENT/DELETE_SHARING_FILE';
const SET_SHARING_FILE = 'DOCUMENT/SET_SHARING_FILE';
const SELECT_ACTIVE_DOCUMENT = 'DOCUMENT/SELECT_ACTIVE_DOCUMENT';

const SELECT_IMAGE = 'DOCUMENT/SELECT_IMAGE';
const MODERATOR_SELECT_IMAGE = 'DOCUMENT/MODERATOR_SELECT_IMAGE';

const initialState = {
  isSharing: false,
  sharingDocumentList: {},
  activeDocument: {
    name: null,
    imageList: [],
  },
  activeImage: null,
  moderatorActiveImage: null,
};

export const documentActions = {
  selectActiveDocument: (payload) => ({
    type: SELECT_ACTIVE_DOCUMENT,
    payload,
  }),

  selectImage: (payload) => ({
    type: SELECT_IMAGE,
    payload,
  }),

  /**
   * @title 방장 이미지 선택
   * @description 방장 이미지 선택 액션 처리
   * @ACTION
   */
  setModeratorActiveImage: (imageUrl) => ({
    type: MODERATOR_SELECT_IMAGE,
    imageUrl,
  }),

  /**
   * @title 문서 공유 모드 활성화
   * @description 회의 화면에서 문서공유 모드 활성화 액션 처리
   * @ACTION
   */
  toggleDocumentSharingMode: () => ({
    type: DOCUMENT_SHARING_TOGGLE,
  }),

  setDocumentSharingMode: (payload) => ({
    type: SET_DOCUMENT_SHARING,
    payload,
  }),

  /**
   * @title 문서 공유 모드 활성화
   * @description 회의 화면에서 문서공유 모드 활성화 액션 처리
   * @ACTION
   */
  activeDocumentSharingMode: (payload) => ({
    type: DOCUMENT_SHARING_START,
    payload,
  }),

  /**
   * @title 문서 공유 모드 비활성화
   * @description 회의 화면에서 문서공유 모드를 비활성화 액션 처리
   * @ACTION
   */
  deactiveDocumentSharingMode: (payload) => ({
    type: DOCUMENT_SHARING_END,
    payload,
  }),

  changeSharingImageIndex: (payload) => ({
    type: DOCUMENT_SHARING_END,
    payload,
  }),

  /**
   * @title 공유 문서 추가
   * @description 공유할 문서를 추가하는 리덕스 액션 처리;
   * @ACTION ADD_SHARING_FILE
   */
  addDocument: (payload) => {
    return { type: ADD_SHARING_FILE, payload };
  },
  /**
   * @title 공유 문서 제거
   * @description 공유할 문서를 제거하는 리덕스 액션 처리;
   * @ACTION DELETE_SHARING_FILE
   */
  deleteDocument: (payload) => {
    return { type: DELETE_SHARING_FILE, payload };
  },

  /**
   * @title 공유 문서 정보 수신
   * @description 최초 방 접속시 방장으로 부터 문서 데이터 수신
   * @ACTION SET_SHARING_FILE
   */
  setDocument: (documentInfo) => {
    return { type: SET_SHARING_FILE, documentInfo };
  },
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case DOCUMENT_SHARING_TOGGLE:
      return produce(state, (draftState) => {
        draftState.isSharing = !state.isSharing;
      });

    case SET_DOCUMENT_SHARING:
      return produce(state, (draftState) => {
        draftState.isSharing = action.payload;
      });

    case CHANGE_SHARING_IMAGE:
      return produce(state, (draftState) => {
        draftState.sharingImageIndex = action.payload.index;
      });

    case ADD_SHARING_FILE:
      return produce(state, (draftState) => {
        const { fileName, imageUrlList } = action.payload;

        draftState.sharingDocumentList[fileName] = imageUrlList;
      });
    case DELETE_SHARING_FILE:
      return produce(state, (draftState) => {
        const { fileName } = action.payload;

        delete draftState.sharingDocumentList[fileName];
      });
    case SET_SHARING_FILE:
      const { documentInfo } = action;
      return produce(state, (draftState) => {
        draftState.sharingDocumentList = documentInfo;
      });

    case SELECT_ACTIVE_DOCUMENT:
      return produce(state, (draftState) => {
        draftState.activeDocument = action.payload;
      });

    case SELECT_IMAGE:
      return produce(state, (draftState) => {
        draftState.activeImage = action.payload;
      });
    case MODERATOR_SELECT_IMAGE:
      return produce(state, (draftState) => {
        draftState.moderatorActiveImage = action.imageUrl;
      });
    default:
      return produce(state, (draftState) => {});
  }
};

export default reducer;

/**
 * @swagger
 * tags:
 *   name: USER
 *   description: User api
 * components:
 *   schemes:
 *      ftp_upload:
 *        type: object
 *        required:
 *          - path
 *          - host
 *          - user
 *          - password
 *          - file
 *        properties:
 *          path:
 *            type: string
 *            description: 폴더 경로
 *          host:
 *            type: string
 *            description: ftp  주소
 *          user:
 *            type: string
 *            description: 아이디
 *          password:
 *            type: string
 *            description: 비밀번호
 *          file:
 *            type: file
 *            description: 파일
 *      ftp_download_response:
 *        type: object
 *        properties:
 *          code:
 *            type: number
 *            description: http 상태코드
 *          message:
 *            type: string
 *            description: 성공 혹은 실패 메세지
 *          data:
 *            type: array
 *            description: 폴더 내 파일 및 폴더 목록
 *            items:
 *              type: object
 *              properties:
 *                filename:
 *                  type: string
 *                  description: 파일명
 *                buffer:
 *                  type: string
 *                  description: 파일 데이터(buffer로 변환한 다음 gzip으로 압축)
 *      ftp_request:
 *        type: object
 *        required:
 *          - path
 *          - host
 *          - user
 *          - password
 *        properties:
 *          path:
 *            type: string
 *            description: 폴더 경로
 *          host:
 *            type: string
 *            description: ftp  주소
 *          user:
 *            type: string
 *            description: 아이디
 *          password:
 *            type: string
 *            description: 비밀번호
 *      ftp_response:
 *        type: object
 *        required:
 *          - code
 *          - message
 *          - data
 *        properties:
 *          code:
 *            type: number
 *            description: http 상태코드
 *          message:
 *            type: string
 *            description: 성공 혹은 실패 메세지
 *      get_list_of_dir_response:
 *        type: object
 *        required:
 *          - code
 *          - message
 *          - data
 *        properties:
 *          code:
 *            type: number
 *            description: http 상태코드
 *          message:
 *            type: string
 *            description: 성공 혹은 실패 메세지
 *          data:
 *            type: array
 *            description: 폴더 내 파일 및 폴더 목록
 *            items:
 *              type: object
 *              properties:
 *                  name:
 *                      type: string
 *                      description: 파일 혹은 폴더 명
 *                  type:
 *                      type: string
 *                      description: "0: 알수없음 / 1: 파일 / 2 : 폴더 / 3 : 심볼링크"
 *                  size:
 *                      type: number
 *                      description: "파일 크기(단위: 바이트)"
 *                  rawModifiedAt:
 *                      type: string
 *                      description: 수정날짜
 */

/**
 * @swagger
 *  paths:
 *    /ftp/list:
 *      post:
 *        tags: [FTP]
 *        summary: "경로 내 파일 및 폴더 목록 가져오기"
 *        consumes:
 *        - application/json
 *        produces:
 *        - application/json
 *        parameters:
 *        - in: body
 *          name: body
 *          description: "로그인 계정 정보 및 경로 전달"
 *          required: true
 *          schema:
 *            $ref: "#/components/schemes/ftp_request"
 *        responses:
 *          200:
 *            description: "로그인 결과"
 *            schema:
 *              $ref: "#/components/schemes/get_list_of_dir_response"
 *          401:
 *            $ref: '#/components/res/BadRequest'
 */

/**
 * @swagger
 *  paths:
 *    /ftp/upload:
 *      post:
 *        tags: [FTP]
 *        summary: "파일 업로드"
 *        description: ""
 *        consumes:
 *        - application/form-data
 *        produces:
 *        - application/json
 *        parameters:
 *        - in: body
 *          name: body
 *          description: "로그인 계정 정보와 업로드 할 파일 정보 전달"
 *          required: true
 *          schema:
 *            $ref: "#/components/schemes/ftp_upload"
 *        responses:
 *          200:
 *            description: "업로드 결과"
 *            schema:
 *              $ref: "#/components/schemes/ftp_response"
 */

/**
 * @swagger
 *  paths:
 *    /ftp/download:
 *      post:
 *        tags: [FTP]
 *        summary: "파일 다운로드"
 *        consumes:
 *        - application/json
 *        produces:
 *        - application/json
 *        parameters:
 *        - in: body
 *          name: body
 *          description: "로그인 계정 정보 및 경로 전달"
 *          required: true
 *          schema:
 *            $ref: "#/components/schemes/ftp_request"
 *        responses:
 *          200:
 *            description: "파일 다운로드 요청 결과"
 *            schema:
 *              $ref: "#/components/schemes/ftp_download_response"
 *          401:
 *            $ref: '#/components/res/BadRequest'
 */

/**
 * @swagger
 *  paths:
 *    /ftp/download2:
 *      post:
 *        tags: [FTP]
 *        summary: "파일 다운로드"
 *        consumes:
 *        - application/json
 *        produces:
 *        - application/json
 *        parameters:
 *        - in: body
 *          name: body
 *          description: "로그인 계정 정보 및 경로 전달"
 *          required: true
 *          schema:
 *            $ref: "#/components/schemes/ftp_request"
 *        responses:
 *          200:
 *            description: "파일 다운로드 요청 결과"
 *            schema:
 *              $ref: "#/components/schemes/ftp_download_response"
 *          401:
 *            $ref: '#/components/res/BadRequest'
 */

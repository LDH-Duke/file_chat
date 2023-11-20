import 'reflect-metadata';
import { Container } from 'typedi';
import FtpService from './ftp.service';
import { StatusCodes } from 'http-status-codes';

let FtpServiceInstance = Container.get(FtpService);

export default [
  // /**
  //  * [GET] Table 내 파일목록 전체 가져오기 TEST
  //  */
  // {
  //   path: '/files',
  //   method: 'get',
  //   middleware: [],
  //   controller: async (req, res, next) => {
  //     const { roomId } = req.query;
  //     const ServiceInstance = Container.get(FtpService);
  //     const data = await ServiceInstance.findAll(roomId);
  //     return res.status(200).json({
  //       status: 200,
  //       message: 'success',
  //       data,
  //     });
  //   },
  // },
  /**
   * [GET] Table 내 파일목록 가져오기 / room_id 포함
   */
  {
    path: '/files/roomId/file',
    method: 'get',
    middleware: [],
    controller: async (req, res, next) => {
      const ServiceInstance = Container.get(FtpService);
      console.log('ServiceInstance: ', ServiceInstance);
      console.log('FtpService: ', FtpService);
      return res.status(200).json({
        status: 200,
        message: 'success',
      });
    },
  },
  {
    path: '/files/:roomId',
    method: 'get',
    middleware: [],
    controller: async (req, res, next) => {
      const { roomId } = req.params;
      const ServiceInstance = Container.get(FtpService);
      const data = await ServiceInstance.findForRoom(roomId);
      return res.status(200).json({
        status: 200,
        message: 'success',
        data,
      });
    },
  },
  /**
   * [POST] FTP 내 목록 가져오기
   */
  {
    path: '/ftp/list',
    method: 'post',
    middleware: [],
    controller: async (req, res, next) => {
      try {
        console.log(123);
        const resultData = await FtpServiceInstance.getFileListSFTP(req.body);

        return res.status(StatusCodes.OK).json({
          code: 200,
          message: 'success',
          data: resultData,
        });
      } catch (error) {
        // FTP 경로 혹은 접속 정보가 올바르지 않을 경우
        return res.status(StatusCodes.OK).json({
          code: 401,
          message: 'failed',
          data: error,
        });
      }
    },
  },
  /**
   * [POST] FTP 업로드
   */
  {
    path: '/ftp/upload',
    method: 'post',
    file: 'single',
    middleware: [],
    controller: async (req, res, next) => {
      try {
        const resultData = await FtpServiceInstance.insertFile(
          req.body,
          req.file
        );

        return res.status(StatusCodes.OK).json({
          code: 200,
          message: 'success',
          data: resultData,
        });
      } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
          code: 500,
          message: 'failed',
          data: error,
        });
      }
    },
  },
  /**
   * [POST] FTP 다운로드
   */
  {
    path: '/ftp/download',
    method: 'post',
    middleware: [],
    controller: async (req, res, next) => {
      try {
        const resultData = await FtpServiceInstance.downloadFile(req.body);

        return res.status(StatusCodes.OK).json({
          code: 200,
          message: 'success',
          data: resultData,
        });
      } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
          code: 500,
          message: 'failed',
          data: error,
        });
      }
    },
  },
];

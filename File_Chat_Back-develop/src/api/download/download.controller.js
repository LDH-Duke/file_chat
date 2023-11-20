// import { io } from '../../../bin/www';
import Service from './download.serivce';
import { Container } from 'typedi';
const path = require('path');

export default [
  /** ----------------------------------------
   *  (get) 다운로드 링크 생성 후 반환
   *  ----------------------------------------
   *
   */
  {
    path: '/download/:fileId',
    method: 'get',
    middleware: [],
    controller: async (req, res, next) => {
      try {
        const fileId = req.params.fileId;
        
        const ServiceInstance = Container.get(Service);
        const fileData = await ServiceInstance.findFileOne(parseInt(fileId));
        const filename = fileData.file_name

        const tempDirectory = path.join(__dirname, '../../..', 'temp')
        const filePath = path.join(tempDirectory, fileId.toString());
        console.log('download 파일 명 : '+filename)
        
        if (fs.existsSync(filePath)) {
          res.download(filePath, filename);
        } else {
          res.status(404).send('File not found.');
        }
      } catch (err) {
        console.log('err : '+err)
        return res.status(500).json({
          status: 500,
          message: 'Error',
          data: err.message,
        });
      }
    },
  },

  /** ----------------------------------------
   *  (get) 다운로드 완료 후 삭제 처리 (레거시 코드)
   *  ----------------------------------------
   *
   */
  {
    path: '/download',
    method: 'delete',
    middleware: [],
    controller: async (req, res, next) => {
      try {
        const { file_id } = req.query;
        
        const ServiceInstance = Container.get(Service);
        const fileData  = await ServiceInstance.findFileOne(parseInt(file_id));
        
        if (fileData) {
          const tempDirectory = path.join(__dirname, '../../..', 'temp')
          const filePath = path.join(tempDirectory, file_id.toString());
  
          // filePath에 위치한 파일 삭제
          fs.unlink(filePath, (err) => {
            if (err) {
              // 파일 삭제 오류
              console.error('파일 삭제 중 오류 발생:', err);
              return res.status(200).json({
                status: 500,
                message: 'File delete error',
                err: err,
              });
            }
          });
          console.log('파일이 성공적으로 삭제되었습니다.');
          const updateDeviceId = await ServiceInstance.updateFile(fileData);
         
          return  res.status(200).json({
            status: 200,
            message: 'success',
            file_id: file_id,
          });
          
        } else {
          // 데이터가 없어서 삭제한 파일이 없는 경우
          return res.status(200).json({
            status: 204,
            message: 'no data',
            file_id: file_id,
          });
        }
        
      } catch (err) {
        console.log('err : '+err)
        return res.status(500).json({
          status: 500,
          message: 'Error',
          data: err.message,
        });
      }
    },
  },

  /** ----------------------------------------
   *  (post) 업로드 트리거 이후 호출 / 스토리지 디바이스에 저장 완료 처리
   *  ----------------------------------------
   *
   */
  {
    path: '/download',
    method: 'post',
    middleware: [],
    controller: async (req, res, next) => {
      try {
        const { file_id } = req.body;
        
        const ServiceInstance = Container.get(Service);
        const fileData  = await ServiceInstance.findFileOne(parseInt(file_id));
        
        const updateDeviceId = await ServiceInstance.updateFile(fileData);
        console.log('updateDeviceId : ',updateDeviceId)

        if (updateDeviceId){
          return  res.status(200).json({
            status: 200,
            message: 'success',
            file_id: file_id,
          });
        }
      } catch (err) {
        console.log('err : '+err)
        return res.status(500).json({
          status: 500,
          message: 'Error',
          data: err.message,
        });
      }
    },
  },

  /** ----------------------------------------
   *  (post) 다운로드 트리거 이후 호출 / 요청 이후 처리
   *  ----------------------------------------
   *
   */
  {
    path: '/download/file',
    method: 'post',
    middleware: [],
    controller: async (req, res, next) => {
      try {
        const { 
          blob_type, 
          file_name, 
          user_id, 
          file_id, 
          room_id,
          device_type,
          blob_data,
        } = req.body;
        // 소켓 서버로 연결
        const socket = require('socket.io-client')('http://localhost:3333');

        const ServiceInstance = Container.get(Service);
        const connectId  = await ServiceInstance.findConnectId(parseInt(room_id));
        const fileData = blob_data
        
        const tempDirectory = path.join(__dirname, '../../..', 'temp')
        const filePath = path.join(tempDirectory, fileData._data.name);

        console.log('filePath : ',filePath)
        fs.writeFileSync(filePath,'');

        const fileBuffer = Buffer.from(JSON.stringify(fileData), 'utf-8');

        console.log('bufferData : ', fileBuffer, ' / ' , typeof fileBuffer)

        // 소켓서버로 전송
        socket.emit('mobile-request', fileBuffer, blob_type, file_name, file_id, user_id, room_id, device_type, connectId)

        return res.status(200).json({
          status: 200,
          message: 'success',
          data: req.body,
        })
      } catch (err) {
        console.log('err : '+err)
        return res.status(500).json({
          status: 500,
          message: 'Error',
          data: err.message,
        });
      }
    },
  },

  /** ----------------------------------------
   *  (post) 백그라운드 통신 테스트
   *  ----------------------------------------
   *
   */
  {
    path: '/background/test',
    method: 'post',
    middleware: [],
    controller: async (req, res, next) => {
      const { body } = req;
      console.log('테스트 API 바디 값 : ',body);
      const data = body;
      return res.status(200).json({
        status: 200,
        message: 'success',
        data,
      });
    },
  },

];

import DeviceService from './device.serivce';
import { Container } from 'typedi';

export default [
  /** ----------------------------------------
   *  (GET) device 속한 room 조회 
   *  ----------------------------------------
   *
   */
  {
    path: '/device',
    method: 'get',
    middleware: [],
    controller: async (req, res, next) => {
      const { device_id } = req.query;
      const DeviceServiceInstance = Container.get(DeviceService);
      const data = await DeviceServiceInstance.findToken(device_id);
      console.log('[get] users result : '+JSON.stringify(data))
      return res.status(200).json({
        status: 200,
        message: 'success',
        data,
      });
    },
  },

  /** ----------------------------------------
   *  (POST) device 토큰값 저장 
   *  ----------------------------------------
   *
   */
  {
    path: '/device',
    method: 'post',
    middleware: [],
    controller: async (req, res, next) => {
      try {
        const { device_token, device_type, device_storage, token, device_status } = req.body; 
        const DeviceServiceInstance = Container.get(DeviceService);
       
        let  deviceToken = device_token
        if (deviceToken == undefined) {
          deviceToken = token
        }
        if (deviceToken == 'chrome') {
          const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
          let result = '';
  
          for (let i = 0; i < 10; i++) {
            const randomIndex = Math.floor(Math.random() * characters.length);
            result += characters[randomIndex];
          }

          deviceToken = result
        }

        const data = await DeviceServiceInstance.insertToken(deviceToken, device_type, device_storage,device_status); 
        
        if (!data) {
          return res.status(204).json({
            status: 204,
            message: 'no data',
          });
        }
        return res.status(200).json({
          status: 200,
          message: 'success',
          device_id: data.device_id,
        });
      } catch (err) {
        return res.status(500).json({
          status: 500,
          message: 'Error',
          data: err.message,
        });
      }
    },
  },

  /** ----------------------------------------
   *  (POST) 인증된 디바이스 저장
   *  ----------------------------------------
   *
   */
  {
    path: '/device/connect',
    method: 'post',
    middleware: [],
    controller: async (req, res, next) => {
      try {
        const { device_id, room_id } = req.body;
        const DeviceServiceInstance = Container.get(DeviceService);
        const data = await DeviceServiceInstance.insertDeviceConnect(device_id, room_id);
        console.log('저장된 body 값 : ', data)
        if (!data) {
          return res.status(200).json({
            status: 204,
            message: 'no data',
          });
        }
        return res.status(200).json({
          status: 200,
          message: 'success',
          data,
        });
      } catch (err) {
        return res.status(500).json({
          status: 500,
          message: 'Error',
          data: err.message,
        });
      }
    },
  },


  /** ----------------------------------------
   *  (PUT) device 수정
   *  ----------------------------------------
   *
   */
  {
    path: '/device',
    method: 'put',
    middleware: [],
    controller: async (req, res, next) => {
      try {
        const { body } = req; 
        console.log('device put data : ', body)
        const DeviceServiceInstance = Container.get(DeviceService);
        const data = await DeviceServiceInstance.updateToken(body); 
        
        if (!data) {
          return res.status(204).json({
            status: 204,
            message: 'no data',
          });
        }
        return res.status(200).json({
          status: 200,
          message: 'success',
          device_id: data.device_id,
        });
      } catch (err) {
        return res.status(500).json({
          status: 500,
          message: 'Error',
          data: err.message,
        });
      }
    },
  },

  /** ----------------------------------------
   *  (PUT) device 삭제
   *  ----------------------------------------
   *
   */
  {
    path: '/device',
    method: 'delete',
    middleware: [],
    controller: async (req, res, next) => {
      try {
        const { device_id, room_id } = req.query; 
        const DeviceServiceInstance = Container.get(DeviceService);
        const data = await DeviceServiceInstance.deleteConnect(device_id, room_id); 
        
        if (!data) {
          return res.status(200).json({
            status: 204,
            message: 'no data',
          });
        }
        return res.status(200).json({
          status: 200,
          message: 'success',
          device_id: data.device_id,
        });
      } catch (err) {
        return res.status(500).json({
          status: 500,
          message: 'Error',
          data: err.message,
        });
      }
    },
  },
  /** ----------------------------------------
   *  (POST) device token 값을 통한 디바이스 아이디 조회
   *  ----------------------------------------
   *
   */
  {
    path: '/device-token',
    method: 'post',
    middleware: [],
    controller: async (req, res, next) => {
      const { device_token } = req.body;

      const DeviceServiceInstance = Container.get(DeviceService);
      const data = await DeviceServiceInstance.findTokenData(device_token);
      
      console.log('device 조회 결과 !  : ',JSON.stringify(data))
      return res.status(200).json({
        status: 200,
        message: 'success',
        data,
      });
    },
  },

];

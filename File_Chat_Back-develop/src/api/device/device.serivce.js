import { Service, Inject } from 'typedi';
import jwt from 'jsonwebtoken';
// import { randomBytes } from 'crypto';
import models from '../../models';
import { logger } from '../../utils/winstonLogger';

export default class AuthService {
  /**
   * constructor
   * --
   */
  constructor() {
  }
  // @Inject('userModel') private userModel : Models.UserModel,
  // private mailer: MailerService,
  // @Inject('logger') private logger,
  // @EventDispatcher() private eventDispatcher: EventDispatcherInterface,

  /**
   * device 토큰값 및 룸 리스트 조회
   * --
   */
  async findToken(device_id) {
    try {
      const roomList = models.connect.findAll({
        where: {
          device_id: device_id
        }
      });
      return roomList;
    } catch (e) {
      console.log('[device] findToken ERROR !! : '+ e)
      logger.error(`[DeviceService][findToken] Error: ${e.message}`);
      throw e;
    }
  }

  /**
   * device 저장 
   * --
   */
  async insertToken(device_token, device_type, device_storage, device_status) {
    try {
      const currentDate = new Date(
        new Date().getTime() + 9 * 60 * 60 * 1000
      ).toISOString();

      if(device_storage == undefined){
        device_storage = 0
      }
      const body = {
        device_token: device_token,
        device_type: device_type,
        device_storage: device_storage,
        device_status: device_status,
        created_at: currentDate,
        updated_at: currentDate
      }   

      return models.device.create(body);
    } catch (e) {
      console.log('[device] insertToken ERROR !! : '+ e)
      logger.error(`[DeviceService][insertToken] Error: ${e.message}`);
      throw e;
    }
  }

  /**
   * 채팅방 스토리지 연결 정보 저장
   * --
   */
  async insertDeviceConnect(device_id, room_id) {
    try {
      const currentDate = new Date(
        new Date().getTime() + 9 * 60 * 60 * 1000
      ).toISOString();
      // 커넥트 아이디 값 생성 랜덤 문자로 생성 
      const connectIdLength = 8
      const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      let connectId = '';
      for (let i = 0; i < connectIdLength; i++) {
          const randomIndex = Math.floor(Math.random() * characters.length);
          connectId += characters[randomIndex];
      }
      console.log('connect id 생성 : ', connectId);

      const body = {
        device_id: device_id, 
        room_id: room_id,
        connect_id : connectId,
        created_at: currentDate,
        updated_at: currentDate,
      }

      return models.connect.create(body);
    } catch (e) {
      console.log('[device] insertToken ERROR !! : '+ e)
      logger.error(`[AuthService][insertToken] Error: ${e.message}`);
      throw e;
    }
  }

  /**
   * 디바이스 토큰 데이터 수정
   * --
   */
  async updateToken(body){
    try{
      const nowDate = new Date(
        new Date().getTime() + 9 * 60 * 60 * 1000
      ).toISOString();
      body['updated_at'] = nowDate
      
      return models.device.update(body,{
        where: {
          device_id : body.device_id
        }
      });

    }catch(e) {
      console.log('[device] updateToken ERROR !! : '+ e)
      logger.error(`[AuthService][insertToken] Error: ${e.message}`);
      throw e;
    }
  }

  /**
   * 디바이스 연결정보 삭제
   * --
   */
  async deleteConnect(device_id, room_id){
    try{
      return models.connect.destroy({
        where: {
          device_id : device_id,
          room_id: room_id
        }
      });
    }catch(e) {
      console.log('[device] updateToken ERROR !! : '+ e)
      logger.error(`[AuthService][insertToken] Error: ${e.message}`);
      throw e;
    }
  }

  /**
   * device 토큰으로 디바이스 정보 조회
   * --
   */
  async findTokenData(device_token) {
    try {
      const deviceData = models.device.findOne({
        where: {
          device_token: device_token
        }
      });
      return deviceData;
    } catch (e) {
      console.log('[device] findToken ERROR !! : '+ e)
      logger.error(`[DeviceService][findToken] Error: ${e.message}`);
      throw e;
    }
  }


}


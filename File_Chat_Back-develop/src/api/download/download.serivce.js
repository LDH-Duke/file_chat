import { Service, Inject } from 'typedi';
import jwt from 'jsonwebtoken';
import { randomBytes } from 'crypto';
import models from '../../models';
import { logger } from '../../utils/winstonLogger';
import { Container } from 'typedi';

export default class ApiService {
  /**
   * constructor
   * --
   */
  constructor() {}

   /**
   * 단일조회
   * --
   */
   async findFileOne(file_id) {
    try {
      return models.files.findOne({ where: { file_id } });
    } catch (e) {
      console.log('[Download] findFileOne ERROR !! : '+ e)
      logger.error(`[DownloadService][SignUp] Error: ${e.message}`);
      throw e;
    }
  }

  /**
   * 다운받은 파일 데이터 삭제
   * --
   */
  async deleteFile(file_id){
    try{
      return models.files.destroy({
        where: {
          file_id : file_id
        }
      });
    }catch(e) {
      console.log('[Download] updateToken ERROR !! : '+ e)
      logger.error(`[DownloadService][deleteFile] Error: ${e.message}`);
      throw e;
    }
  }

  /**
   * 파일 저장된 디바이스 아이디 갱신
   * --
   */
  async updateFile(file_data){
    try{
      const storageDevice = await models.connect.findOne({
        where: {
          room_id: file_data.room_id
        }
      });

      const result = await models.files.update({device_id: storageDevice.device_id},{
        where: {
          file_id : file_data.file_id
        }
      });
      
      return result;
    }catch(e) {
      console.log('[Download] updateToken ERROR !! : '+ e)
      logger.error(`[DownloadService][deleteFile] Error: ${e.message}`);
      throw e;
    }
  }

  /**
   * 커넥트 아이디 조회
   * --
   */
  async findConnectId(room_id) {
    try {
      const connectData = await models.connect.findOne({
        attributes: ['connect_id'],
        where: {
          room_id: room_id
        }
      });
      return connectData.dataValues.connect_id
    } catch (e) {
      console.log('[Download] findFileOne ERROR !! : '+ e)
      logger.error(`[DownloadService][SignUp] Error: ${e.message}`);
      throw e;
    }
  }

}

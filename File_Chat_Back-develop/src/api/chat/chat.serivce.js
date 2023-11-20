import { Service, Inject } from 'typedi';
import jwt from 'jsonwebtoken';
import { randomBytes } from 'crypto';
import models from '../../models';
import { logger } from '../../utils/winstonLogger';

export default class ApiService {
  /**
   * constructor
   * --
   */
  constructor() { }

  /**
   * 목록조회
   * --
   */
  async findForRoom(room_id) {
    try {
      // const
      if (!room_id) return null;
      return models.chat.findAll({
        where: { room_id },
        include: [
          {
            model: models.files,
          },
        ],
      });
    } catch (e) {
      console.log('[chat] findForRoom ERROR !! : ' + e)
      logger.error(`[AuthService][SignUp] Error: ${e.message}`);
      throw e;
    }
  }
}

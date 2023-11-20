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
  constructor() { }
  // @Inject('userModel') private userModel : Models.UserModel,
  // private mailer: MailerService,
  // @Inject('logger') private logger,
  // @EventDispatcher() private eventDispatcher: EventDispatcherInterface,

  /**
   * 회원가입 SignUp
   * --
   */
  async getUsers(body) {
    try {
      return models.users.findAll();
    } catch (e) {
      console.log('[user] getUsers ERROR !! : ' + e)
      logger.error(`[AuthService][SignUp] Error: ${e.message}`);
      throw e;
    }
  }

  /**
   * 로그인
   * --
   */
  async Signin(body) {
    try {
      const { user_account, user_pw } = body;
      return models.users.findOne({
        where: {
          user_account,
          user_pw,
        },
      });
    } catch (e) {
      console.log('[user] Signin ERROR !! : ' + e)
      logger.error(`[AuthService][SignUp] Error: ${e.message}`);
      throw e;
    }
  }

  /**
   * 회원가입 SignUp
   * --
   */
  async SignUp(body) {
    try {
      const result = await userAccoountCheck(body.user_account)
      if (result != null) {
        return 409
      }
      const createUser = await models.users.create(body);

      return createUser;

    } catch (e) {
      console.log('[user] SignUp ERROR !! : ' + e)
      logger.error(`[AuthService][SignUp] Error: ${e.message}`);
      throw e;
    }
  }
}

function userAccoountCheck(user_account) {
  return models.users.findOne({
    where: {
      user_account: user_account
    },
  })
}
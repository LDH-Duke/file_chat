import { Service, Inject } from 'typedi';
import jwt from 'jsonwebtoken';
import { randomBytes } from 'crypto';
import models from '../../models';
import { logger } from '../../utils/winstonLogger';

const nodemailer = require('nodemailer');

export default class ApiService {
  /**
   * constructor
   * --
   */
  constructor() {}

  /**
   * 목록조회
   * --
   */
  async findAll(user_id = null) {
    try {
      // const
      if (!user_id) return null;
      return models.invite.findAll({
        where: { user_id },
        include: [
          {
            model: models.room,
          },
        ],
      });
    } catch (e) {
      logger.error(`[AuthService][SignUp] Error: ${e.message}`);
      throw e;
    }
  }

  /**
   * 단일조회
   * --
   */
  async findOne(invite_id) {
    try {
      // const salt = randomBytes(32);
      return models.invite.findOne({ where: { invite_id } });
    } catch (e) {
      logger.error(`[AuthService][SignUp] Error: ${e.message}`);
      throw e;
    }
  }

  /**
   * 초대 상태 변경 승인/거절
   * --
   */
  async updateStatus(invite_id, { invite_access }) {
    try {
      return models.invite.update({ invite_access }, { where: { invite_id } });
    } catch (e) {
      logger.error(`[AuthService][SignUp] Error: ${e.message}`);
      throw e;
    }
  }

  /**
   * 초대 생성
   * --
   */
  async createInvite(body) {
    try {
      // { room_id, user_id, invite_owner }
      const transaction = await models.sequelize.transaction();
      // 초대하려는 유저의 이메일을 통해 
      let userIdList = [] // 존재하는 계정의 유저아이디 값 저장
      let notExistAccount = [] // 존재하지 않는 계정 데이터 저장
      for (let account of body.members) {
        let userData = await models.users.findOne({
          where : {
            user_account : account
          }
        })
        
        if (userData) { 
          userIdList.push(userData.user_id);
        } else {
          notExistAccount.push(account)
        }
      }

      let sendInviteUser = await models.users.findOne({
        where : {
          user_id : body.user_id
        }
      })
      console.log('초대하는 유저의 email : ', sendInviteUser.user_account)
      if (notExistAccount.length > 0){
        notExistAccount.forEach(emailAddress => {
          this.sendMail(emailAddress, sendInviteUser.user_account)
        })
      }

      const newInviteList = [];
      for (let userId of userIdList){
        newInviteList.push({
          invite_owner: 0,
          invite_access: 0,
          user_id: userId,
          room_id: body.room_id,
        })
      }
      const inviteResult = await models.invite.bulkCreate(newInviteList, {
        transaction,
      });
      await transaction.commit();
      return {inviteList: inviteResult, notExistAccount: notExistAccount};
    } catch (e) {
      logger.error(`[AuthService][SignUp] Error: ${e.message}`);
      throw e;
    }
  }

  /**
   * 인증번호 생성 서비스 
   * --
   */
  async createdAuthCode(roomId) {
    try {
      const n = 6;
      let str = ''
      for (let i = 0; i < n; i++) {
        str += Math.floor(Math.random() * 10)
      }

      const randomCode = str
      const currentDate = new Date(
        new Date().getTime() + 9 * 60 * 60 * 1000
      ).toISOString();
      const validTime = new Date(new Date().getTime() + 9 * 60 * 60 * 1000 + (3*60*1000)).toISOString();
      // 로그성 
      const authCode = {
        auth_code: randomCode,
        valid_time: validTime,
        room_id: roomId,
        created_date: currentDate,
      }
      models.auth.create(authCode);
        // rooom에 대한 인증 값 갱신
      models.room.update({ 
        room_auth_code: randomCode,
        valid_time: validTime,
      },
      { where: { room_id: roomId } });
      return { auth_code: randomCode, valid_time: validTime }
      
    } catch (e) {
      console.log('[Auth] createdAuthCode(auth) ERROR !! : '+ e)
      logger.error(`[AuthService][createdAuthCode(auth)] Error: ${e.message}`);
      throw e;
    }
  }

  /**
   * 채팅방에 대한 인증코드 갱신
   * --
   */
  async updateAuthCode(randomCode,roomId) {
    try {
      const currentDate = new Date(
        new Date().getTime() + 9 * 60 * 60 * 1000
      ).toISOString();
      const validTime = new Date(new Date().getTime() + 9 * 60 * 60 * 1000 + (3*60*1000)).toISOString();
      return models.room.update({ 
        room_auth_code: randomCode,
        valid_time: validTime,
      },
      { where: { room_id: roomId } });
    } catch (e) {
      console.log('[Auth] updateAuthCode ERROR !! : '+ e)
      logger.error(`[AuthService][updateAuthCode] Error: ${e.message}`);
      throw e;
    }
  }

  /**
   * 입력한 인증코드와 비교하는 코드
   * --
   */
  async authCodeCheck(roomId, authCode, userId) {
    try {
      const roomData = await models.room.findOne({ where: { room_id: roomId } });
      const currentDate = new Date(
        new Date().getTime() + 9 * 60 * 60 * 1000
      ).toISOString();

      if(currentDate < roomData.valid_time) {
        if(roomData.room_auth_code == authCode) {
          models.auth.update({ 
            result: 1,
          },
          { where: { room_id: roomId, user_id: userId } });
          return 200
        } else {
          return 500
        }
      } else {
        return 501
      }
      
    } catch (e) {

      console.log('[Auth] authCodeCheck ERROR !! : '+ e)
      logger.error(`[AuthService][authCodeCheck] Error: ${e.message}`);
      throw e;
    }
  }

  async generateRandomCode(n) {
    let str = ''
    for (let i = 0; i < n; i++) {
      str += Math.floor(Math.random() * 10)
    }
    return str
  }

  /**
   * 입력한 인증코드와 비교하는 코드
   * --
   */
  async authCodeSearch(authCode) {
    try {
      const roomData = await models.room.findOne({ where: { room_auth_code: authCode } }); 
      const currentDate = new Date(
        new Date().getTime() + 9 * 60 * 60 * 1000
      ).toISOString();
      const authCodeValidTime = roomData ? new Date(roomData?.valid_time).toISOString() : null;
      console.log(roomData)
      console.log(currentDate)
      console.log(authCodeValidTime)

      if(roomData != null) {
        if(new Date(currentDate) < new Date(authCodeValidTime)) {
          return { status: 200, roomId: roomData.room_id }
        } else {
          return { status: 501, roomId: roomData.room_id } // 인증코드의 유효기간이 지남 
        }
      } else {
        return { status: 500, roomId: 0 } //일치하는 방의 데이터가 없음
      }
    } catch (e) {
      console.log('[Auth] authCodeCheck ERROR !! : '+ e)
      logger.error(`[AuthService][authCodeCheck] Error: ${e.message}`);
      throw e;
    }
  }

  /**
   * 회원이 아닌 유저들에게 메일 보내주는 기능
   * --
   */
  async sendMail(emailAddress, sendEmail) {
    const senderInfo = {
      user : "qwqw4260@gmail.com",
      pass : "iomlckwzetktbafv"
    }
    let transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: senderInfo.user,
        pass: senderInfo.pass
      },
      port: 587,
      host: 'smtp.gmlail.com',  
      requireTLS: true ,
    });

    // 메일 제목
    const subject = '[ FChat ] 초대 요청 ';
    // 메일 내용
    const emailHtml =`
    <p>${sendEmail} 님이 ${emailAddress} 님을 fChat으로 초대를 하였습니다. </p>
    <p>fChat 서비스를 이용 하려면 <a href="http://fchat.codebrewing.org/">여기</a>를 클릭하여 접속 부탁드리겠습니다. </p> `;
  
    let mailOptions = {
      from: sendEmail,
      to: emailAddress,
      subject: subject,
      html: emailHtml
    };
  
    try {
      let info = await transporter.sendMail(mailOptions);
      console.log('이메일이 성공적으로 전송되었습니다:', info.messageId);
    } catch (error) {
      console.error('이메일 전송 중 오류 발생:', error);
    }
  }

}

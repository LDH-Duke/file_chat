import { Service, Inject } from 'typedi';
import jwt from 'jsonwebtoken';
import { randomBytes } from 'crypto';
import models from '../../models';
import { logger } from '../../utils/winstonLogger';
import { Container } from 'typedi';

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
  async findAll(userId = null) {
    try {
      const include = [
        {
          model: models.users,
          required: false,
        },
      ];
      if (userId)
        return models.room.findAll({
          where: { user_id: userId },
          include,
        });
      else return models.room.findAll({ include });
    } catch (e) {
      console.log('[room] findAll ERROR !! : '+ e)
      logger.error(`[AuthService][SignUp] Error: ${e.message}`);
      throw e;
    }
  }
  /**
   * 단일조회
   * --
   */
  async findOne(room_id) {
    try {
      // const salt = randomBytes(32);
      return models.room.findOne({
        where: { room_id },
        include: [
          {
            model: models.invite,
            required: false,
            include: [{ model: models.users }],
          },

          {
            model: models.files,
            required: false,
          },
        ],
      });
    } catch (e) {
      console.log('[room] findOne ERROR !! : '+ e)
      logger.error(`[AuthService][SignUp] Error: ${e.message}`);
      throw e;
    }
  }

  /**
   * 생성
   * --
   */
  async createRoom(body) {
    try {
      const { user_id, members, room_id } = body;

      const authCodeLength = 6;
      let authCode = ''
      for (let i = 0; i < authCodeLength; i++) {
        authCode += Math.floor(Math.random() * 10)
      }

      body['room_auth_code'] = authCode
      const transaction = await models.sequelize.transaction();
      const roomResult = await models.room.create(body, { transaction });
     
      console.log('member value : ', members);

      let userIdList = [] // 존재하는 계정의 유저아이디 값 저장
      let notExistAccount = [] // 존재하지 않는 계정 데이터 저장
      let sendInviteUser = ''
      for (let account of members) {
        let userData = await models.users.findOne({
          where : {
            user_account : account
          }
        })
        
        if (userData) { 
          userIdList.push(userData.user_id);
          if (userData.user_id == body.user_id) {
            // 채팅방을 생성한 유저의 계정 저장
            sendInviteUser = account
          }
        } else {
          notExistAccount.push(account)
        }
      }

      if (notExistAccount.length > 0){
        notExistAccount.forEach(emailAddress => {
          this.sendMail(emailAddress, sendInviteUser)
        })
      }

      const newInviteList = [];
      // 초대유저 생성
      for (let i of userIdList) {
        newInviteList.push({
          invite_owner: i === user_id ? 1 : 0,
          invite_access: i === user_id ? 1 : 0,
          user_id: i,
          room_id: roomResult.dataValues.room_id,
        });
      }
      const inviteResult = await models.invite.bulkCreate(newInviteList, {
        transaction,
      });
      await transaction.commit();
      return { ...roomResult.dataValues, inviteList: inviteResult, authCode: authCode, notExistAccount: notExistAccount};
    } catch (e) {
      console.log('[room] createRoom ERROR !! : '+ e)
      logger.error(`[AuthService][SignUp] Error: ${e.message}`);
      throw e;
    }
  }

  /**
   * 생성
   * --
   */
  async updateRoom(room_id, body) {
    try {
      console.log('room_id: ', room_id);
      console.log('body: ', body);
      return models.room.update(body, { where: { room_id } });
    } catch (e) {
      console.log('[updateRoom] error: ', e);
      logger.error(`[AuthService][SignUp] Error: ${e.message}`);
      throw e;
    }
  }

  /**
   * 채팅방삭제
   * --
   */
  async leaveRoom(room_id, user_id) {
    try { 
      console.log('delete room: ', room_id);
      console.log('delete user: ', user_id);
      const body = {
        invite_access : 2
      } 
      return models.invite.update(body, { 
        where: { 
          room_id : room_id,
          user_id : user_id
        } 
      });
    } catch (e) {
      console.log('[updateRoom] error: ', e);
      logger.error(`[AuthService][SignUp] Error: ${e.message}`);
      throw e;
    }
  }

  /**
   * 회원이 아닌 유저들에게 메일 보내주는 기능
   * --
   */
  async sendMail(emailAddress, sendEmail) {
    console.log('메일 보내기')
    const senderInfo = {
      user : "qwqw4260@gmail.com",
      pass : "iomlckwzetktbafv"
    }
    let transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: senderInfo.user, // 보내는 이메일 주소
        pass: senderInfo.pass  // 보내는 이메일 비밀번호
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

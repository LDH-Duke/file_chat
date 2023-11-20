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
   * 오류 제보
   * --
   */
  async sendMail(body) {
    const senderInfo = {
      user : "qwqw4260@gmail.com",
      pass : "iomlckwzetktbafv"
    }

    var transporter = nodemailer.createTransport({
      service: 'gmail',   // 메일 보내는 곳
      //인증 데이터를 정의
      auth: {
        user: senderInfo.user,  // 보내는 메일의 주소
        pass: senderInfo.pass   // 보내는 메일의 비밀번호
      },
      port: 587,
      host: 'smtp.gmlail.com',  
      requireTLS: true ,
    });

    // 메일 제목
    const subject = '[ FChat ] 버그 리포트가 도착했습니다 . ';
    // 메일 내용
    const emailHtml =`
    <p>버그 리포트가 도착하였습니다.</p>
    <p>제보 내용 : `+body.text+`</p>    
    <p>에러 메세지 : `+body.message+`</p>`;

    // 메일 옵션
    var mailOptions = {
      from: senderInfo.user, // 발송 메일의 주소
      to: senderInfo.user, // 수신 이메일 주소 (수신 주소의 리스트)
      subject: subject, // 메일 제목
      html: emailHtml // 메일 내용
    };

    const result = await transporter.sendMail(mailOptions)
    return result
  }

  async catchError(errMessage) {
    const body = {
      text: '제보 내용 없음',
      message : errMessage
    }
    const result = sendMail(body)
    return result;
  }
}

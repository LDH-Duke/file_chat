import Service from './invite.serivce';
import { Container } from 'typedi';

export default [
  /** ----------------------------------------
   *  (GET) 채팅방 목록 조회
   *  ----------------------------------------
   *
   */
  {
    path: '/invite',
    method: 'get',
    middleware: [],
    controller: async (req, res, next) => {
      const { userId } = req.query;
      const ServiceInstance = Container.get(Service);
      const data = await ServiceInstance.findAll(userId);
      return res.status(200).json({
        status: 200,
        message: 'success',
        data,
      });
    },
  },

  /** ----------------------------------------
   *  (GET) 채팅방 단일 조회
   *  ----------------------------------------
   *
   */
  {
    path: '/invite/:inviteId',
    method: 'get',
    middleware: [],
    controller: async (req, res, next) => {
      try {
        const { inviteId } = req.params;
        const ServiceInstance = Container.get(Service);
        const data = await ServiceInstance.findOne(inviteId);
        return res.status(200).json({
          status: 200,
          message: 'success',
          data,
        });
      } catch (err) {
        return res.status(500).json({
          resultMessage: 'Error',
          resultData: err.message,
        });
      }
    },
  },

  /** ----------------------------------------
   *  (POST) 초대생성
   *  ----------------------------------------
   *
   */
  {
    path: '/invite',
    method: 'post',
    middleware: [],
    controller: async (req, res, next) => {
      const { body } = req;
      console.log('채팅방 초대 바디 값: ',body)
      
      const headerData = req.headers['authorization'].split(' ')[1];;
      const userInfo = JSON.parse(decodeURIComponent(headerData));

      const userId = userInfo['user_id'];
      console.log('헤더 값 안에 user_id 값 : ',userId)
      console.log('invite user id : ', body.user_id)
      if(body.user_id == undefined) {
        body['user_id']=userId
      }

      const ServiceInstance = Container.get(Service);
      const data = await ServiceInstance.createInvite(body);
      console.log('채팅방 초대 결과 값: ',data)
      return res.status(200).json({
        status: 200,
        message: 'success',
        data,
      });
    },
  },

  /** ----------------------------------------
   *  (PUT) 가입상태변경 승인/거절
   *  ----------------------------------------
   *
   */
  {
    path: '/invite/:inviteId/update',
    method: 'put',
    middleware: [],
    controller: async (req, res, next) => {
      const { inviteId } = req.params;
      const { body } = req;
      console.log("/invite/:inviteId/update" + body);
      const ServiceInstance = Container.get(Service);
      const data = await ServiceInstance.updateStatus(inviteId, body);
      return res.status(200).json({
        status: 200,
        message: 'success',
        data,
      });
    },
  },

  /** ----------------------------------------
   *  (GET) 인증코드 발급
   *  ----------------------------------------
   *
   */
  {
    path: '/auth-code',
    method: 'get',
    middleware: [],
    controller: async (req, res, next) => {
      const { room_id } = req.query;
      const roomId = room_id

      const ServiceInstance = Container.get(Service);
      const result = await ServiceInstance.createdAuthCode(roomId);

      return res.status(200).json({
        status: 200,
        message: 'success',
        auth_code: result.auth_code,
        valid_time: result.valid_time,
      });
    },
  },


  /** ----------------------------------------
   *  (POST) 인증코드 확인 
   *  ----------------------------------------
   *
  */
  {
    path: '/auth-code',
    method: 'post',
    middleware: [],
    controller: async (req, res, next) => {
      const { body } = req; 

      const authCode = body.auth_code
      console.log('[post] /auth-code 호출 : '+authCode)

      const ServiceInstance = Container.get(Service);
     let result = await ServiceInstance.authCodeSearch(authCode.toString());

      let message = 'success'
      if (result.status == 500) {
        message ='인증코드가 불일치 합니다.';
      }
      if (result.status == 501) {
        message = '인증코드 유효기간이 지났습니다.';
      }
      
      return res.status(200).json({
        status: result.status,
        message: message,
        room_id: result.roomId,
      });
    },
  },

];

import Service from './room.serivce';
import { Container } from 'typedi';
const path = require('path');
const fs = require('fs');

export default [
  /** ----------------------------------------
   *  (GET) 내가 만든 채팅방 조회
   *  ----------------------------------------
   *
   */
  {
    path: '/rooms',
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
   *  (POST) 채팅방 생성
   *  ----------------------------------------
   *
   */
  {
    path: '/rooms',
    method: 'post',
    middleware: [],
    controller: async (req, res, next) => {
      const { body } = req;
      const ServiceInstance = Container.get(Service);
      console.log('create room : ',body)
      const data = await ServiceInstance.createRoom(body);
      console.log('채팅방 생성 결과 값 : ',body)
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
    path: '/rooms/:roomId',
    method: 'get',
    middleware: [],
    controller: async (req, res, next) => {
      try {
        const { roomId } = req.params;
        const ServiceInstance = Container.get(Service);
        const data = await ServiceInstance.findOne(roomId);

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
   *  (PUT) 채팅방 정보 수정
   *  ----------------------------------------
   *
   */
  {
    path: '/rooms/:roomId',
    method: 'put',
    middleware: [],
    controller: async (req, res, next) => {
      try {
        const { roomId } = req.params;
        const { body } = req;
        const ServiceInstance = Container.get(Service);
        const data = await ServiceInstance.updateRoom(roomId, body);
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
   *  (DELETE) 채팅방 나가기
   *  ----------------------------------------
   *
   */
  {
    path: '/rooms/:roomId',
    method: 'delete',
    middleware: [],
    controller: async (req, res, next) => {
      try {
        console.log('req data : ',req)

        const { roomId } = req.params;
        const headerData = req.headers['authorization'].split(' ')[1];;
        const userInfo = JSON.parse(decodeURIComponent(headerData));

        const userId = userInfo['user_id'];
        
        const ServiceInstance = Container.get(Service);
        const data = await ServiceInstance.leaveRoom(roomId, userId);
        
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
];

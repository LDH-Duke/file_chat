import Service from './chat.serivce';
import { Container } from 'typedi';

export default [
  /** ----------------------------------------
   *  (GET) 채팅방 목록 조회
   *  ----------------------------------------
   *
   */
  {
    path: '/chat/:roomId',
    method: 'get',
    middleware: [],
    controller: async (req, res, next) => {
      const { roomId } = req.params;
      const ServiceInstance = Container.get(Service);
      const data = await ServiceInstance.findForRoom(roomId);
      return res.status(200).json({
        status: 200,
        message: 'success',
        data,
      });
    },
  },
];

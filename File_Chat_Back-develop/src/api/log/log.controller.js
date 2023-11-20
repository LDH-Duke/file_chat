import LogService from './log.serivce';
import { Container } from 'typedi';

export default [
  /** ----------------------------------------
   *  (POST) 버그 이슈 제보
   *  ----------------------------------------
   *
   */
  {
    path: '/bug/report',
    method: 'post',
    middleware: [],
    controller: async (req, res, next) => {
      const { body } = req;
      const ServiceInstance = Container.get(LogService);
      const data = await ServiceInstance.sendMail(body);
       const status = 200;
      const message = 'success'
      if (!data) {
        status = 500
        message = 'fail'
      }
      return res.status(200).json({
        status: status,
        message: message
      });
    },
  },
];

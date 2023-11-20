import UserService from './user.serivce';
import { Container } from 'typedi';

export default [
  /** ----------------------------------------
   *  (GET) 유저 조회
   *  ----------------------------------------
   *
   */
  {
    path: '/users',
    method: 'get',
    middleware: [],
    controller: async (req, res, next) => {
      const UserServiceInstance = Container.get(UserService);
      const data = await UserServiceInstance.getUsers();
      console.log('[get] users result : '+JSON.stringify(data))
      return res.status(200).json({
        status: 200,
        message: 'success',
        data,
      });
    },
  },

  /** ----------------------------------------
   *  (POST) 로그인
   *  ----------------------------------------
   *
   */
  {
    path: '/users/login',
    method: 'post',
    middleware: [],
    controller: async (req, res, next) => {
      try {
        const { body } = req;
        const UserServiceInstance = Container.get(UserService);
        const data = await UserServiceInstance.Signin(body);
        if (!data) {
          return res.status(204).json({
            status: 204,
            message: 'no data',
          });
        }
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
   *  (POST) 회원 가입
   *  ----------------------------------------
   *
   */
  {
    path: '/users',
    method: 'post',
    middleware: [],
    controller: async (req, res, next) => {
      try {
        const { body } = req;
        console.log('회원가입 : '+ JSON.stringify(body))
        const UserServiceInstance = Container.get(UserService);
        const data = await UserServiceInstance.SignUp(body);
        
        if (data == 409) {
          return res.status(409).json({
            status: 409,
            message: 'This account already exists.',
            data,
          });
        }
        return res.status(200).json({
          status: 200,
          message: 'success',
          data,
        });
      } catch (err) {
        console.log('err 발생 : '+err)
        return res.status(500).json({
          status: 500,
          message: 'Error',
          data: err.message,
        });
      }
    },
  },

  /*  */
  {
    path: '/www/ws',
    method: 'get',
    middleware: [],
    controller: async (req, res, next) => res.render('index', { title: 'aaa' }),
  },
  {
    path: '/ws/namespace',
    method: 'get',
    middleware: [],
    controller: async (_, res, ___) => res.render('socket_namespace'),
  },
  {
    path: '/ws/room',
    method: 'get',
    middleware: [],
    controller: async (_, res, ___) => res.render('socket_room'),
  },
];

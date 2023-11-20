import { Client } from 'basic-ftp';
import fs from 'fs';
import { join } from 'path';
import util from 'util';
import zlib from 'node:zlib';
import SftpClient from 'ssh2-sftp-client';
import models from '../../models';
import { logger } from '../../utils/winstonLogger';
import { randomUUID } from 'crypto';

export default class FtpService {
  constructor() {
    console.log(123123);
    this.alg = {
      kex: [
        'diffie-hellman-group-exchange-sha1',
        'diffie-hellman-group14-sha1',
      ],
    };
  }
  /**
   *
   *
   */
  async findForRoom(room_id) {
    try {
      return models.files.findAll({ where: { room_id } });
    } catch (e) {
      logger.error(`[AuthService][SignUp] Error: ${e.message}`);
      throw e;
    }
  }

  /**
   * FTP 폴더 내 목록
   * @param {object} getFileInfo 파일 내 정보 가져오기
   * @returns
   */
  async getFileList(getFileInfo) {
    // FTP 생성
    let client = new SftpClient();
    // 폴더 내 파일, 폴더 목록
    let list = [];
    // 보안연결 여부
    const isSecure = getFileInfo.isSecure;
    // 경로
    const path = getFileInfo.path;

    try {
      // FTP 연결 정보
      const connectInfo = {
        host: getFileInfo.host,
        password: getFileInfo.password,
        port: getFileInfo.port,
      };

      if (isSecure == true) {
        connectInfo.username = getFileInfo.user;
        connectInfo.algorithms = {
          kex: [
            'diffie-hellman-group-exchange-sha1',
            'diffie-hellman-group14-sha1',
          ],
        };

        const conn = await client.connect(connectInfo);
        console.log('client:L ', client);
        list = await client.list(`/${path}`);
        list = list.map((item) => {
          // ssh2-sftp-client의 반환 값을 basic-ftp와 통일
          // 폴더 : d -> 2
          // 파일 : - -> 1
          const type = item.type == 'd' ? 2 : 1;
          return {
            name: item.name,
            type: type,
            size: item.size,
            rawModifiedAt: new Date(item.modifyTime).toISOString(),
            modifyAt: new Date(item.modifyTime).toISOString(),
          };
        });

        await client.end();
      } else {
        client = new Client();
        connectInfo.user = getFileInfo.user;

        // FTP 접속
        await client.access(connectInfo);
        // 경로가 있을 경우 해당경로로 이동
        if (path != '') {
          await client.cd(path);
        }
        // 경로에서 파일 및 폴더 목록 가져오기
        list = await client.list();
        // FTP 연결 종료
        client.close();
      }

      return list;
    } catch (error) {
      console.log(error, 'ftp file list api error');
      if (isSecure == true) {
        // SFTP 연결 종료
        client.end();
      } else {
        // FTP 연결 종료
        client.close();
      }

      throw error.message;
    }
  }

  /**
   * FTP 폴더 내 목록
   * @param {object} getFileInfo 파일 내 정보 가져오기
   * @returns
   */
  async getFileListSFTP(getFileInfo) {
    // FTP 생성
    const client = new SftpClient();

    try {
      // FTP 연결 정보
      const connectInfo = {
        host: getFileInfo.host,
        username: getFileInfo.user,
        password: getFileInfo.password,
        port: getFileInfo.port,
      };

      const isSecure = getFileInfo.isSecure;

      // 폴더 내 파일, 폴더 목록
      let list = [];

      if (isSecure == true) {
        connectInfo.algorithms = {
          kex: [
            'diffie-hellman-group-exchange-sha1',
            'diffie-hellman-group14-sha1',
          ],
        };
      }

      const conn = await client.connect(connectInfo);
      console.log('conn: ', conn);

      list = await client.list('/Home');
      console.log('/list', list);

      await client.end();

      // // FTP 접속
      // await client.access(connectInfo)

      // const path = getFileInfo.path

      // // 경로가 있을 경우 해당경로로 이동
      // if (path != "") {
      //     await client.cd(path)
      // } else {
      //     // 알FTP 기본 경로가 Home이므로 Home폴더로 접근하여야 함
      //     await client.cd("/Home")
      // }

      // // 경로에서 파일 및 폴더 목록 가져오기
      // const list = await client.list()

      // // FTP 연결 종료
      // client.close()

      return list;
    } catch (error) {
      console.log(error, 'ftp file list api error');

      // FTP 연결 종료
      client.close();

      throw error.message;
    }
  }

  /**
   * FTP 폴더 내 목록
   * @param {object} getFileInfo 파일 내 정보 가져오기
   * @returns
   */
  async getFileListFTP(getFileInfo) {
    // FTP 생성
    const client = new Client();

    try {
      // FTP 접속
      await client.access({
        host: getFileInfo.host,
        user: getFileInfo.user,
        password: getFileInfo.password,
        port: 20022,
      });

      const path = getFileInfo.path;

      // 경로가 있을 경우 해당경로로 이동
      if (path != '') {
        await client.cd(path);
      } else {
        // 알FTP 기본 경로가 Home이므로 Home폴더로 접근하여야 함
        await client.cd('/Home');
      }

      // 경로에서 파일 및 폴더 목록 가져오기
      const list = await client.list();

      // FTP 연결 종료
      client.close();

      return list;
    } catch (error) {
      console.log(error, 'ftp file list api error');

      // FTP 연결 종료
      client.close();

      throw error.message;
    }
  }

  /**
   * 파일 업로드
   * --
   * @param {uploadInfo} uploadInfo 파일 업로드
   * @returns
   */
  async insertFile(uploadInfo, file) {
    // 보안연결 여부
    const isSecure = uploadInfo.type === 'sftp' ? true : false; // 파일의 타입
    // FTP 생성
    let client = new SftpClient();
    // 경로
    const path = uploadInfo.path;
    // 결과
    let result = [];
    try {
      // ===== FTP 연결 정보 ===== //
      const connectInfo = {
        port: uploadInfo.port,
        host: uploadInfo.host,
        password: uploadInfo.password,
        ...(isSecure === true
          ? {
            username: uploadInfo.username,
            algorithms: this.alg,
          }
          : {
            user: uploadInfo.username,
          }),
      };

      // SFTP연결
      if (isSecure === true) {
        console.log('connectInfo: ', connectInfo);
        // 여기만 비동기로 처리
        client.connect(connectInfo).then(() => {
          console.log(1231231231231);
        });

        // 경로에서 파일 및 폴더 목록 가져오기
        const saveFilePath = join(
          __dirname,
          '../../..',
          'temp',
          file.originalname
        );

        // 파일 생성
        await fs.promises.writeFile(saveFilePath, file.buffer);
        let remotePath = '/';
        if (path != '') {
          remotePath = `/${path}`;
        }
        remotePath = `/Home`;
        remotePath = `${path}/${file.originalname}`;
        result = await client.fastPut(saveFilePath, remotePath);
        // 파일 삭제
        await fs.promises.unlink(saveFilePath);
        // FTP 연결 종료
        await client.end();
      }

      // ===== 일반FTP 연결 ===== //
      else {
        client = new Client();

        console.log('[insertFile] uploadInfo: ', uploadInfo);
        // return true;

        // FTP 접속
        await client.access({
          host: uploadInfo.host,
          user: uploadInfo.username,
          password: uploadInfo.password,
          port: uploadInfo.port ? uploadInfo.port : 21,
        });

        // 경로가 있을 경우 해당경로로 이동
        if (path != '') {
          await client.cd(`/${path}`);
        }

        // console.log('path: ', path);
        // 경로가 있을 경우 해당경로로 이동
        // if (path != '') {
        //   await client.cd(path);
        // } else {
        //   // 알FTP 기본 경로가 Home이므로 Home폴더로 접근하여야 함
        //   await client.cd('/Home');
        // }

        const randomId = file.file_saveId;
        console.log('randomId: ', randomId);

        // 경로에서 파일 및 폴더 목록 가져오기
        const saveFilePath = join(__dirname, '../../..', 'temp', randomId);

        // 파일 생성
        await fs.promises.writeFile(saveFilePath, file.buffer);
        console.log(file.originalname);
        // 경로에서 파일 및 폴더 목록 가져오기
        console.log(saveFilePath);
        // result = await client.uploadFrom(saveFilePath, file.originalname);
        try {
          result = await client.uploadFrom(saveFilePath, randomId);
        } catch (err) {
          console.log('ftp server upload fail : ' + err)
        }
        // result = await client.uploadFrom(saveFilePath, randomId);
        // // 파일 삭제
        await fs.promises.unlink(saveFilePath);
        // FTP 연결 종료
        client.close();
      }
      return result;
    } catch (error) {
      console.log('[ftp service][insertFile] ftp upload api error', error);
      if (isSecure == true) {
        // SFTP 연결 종료
        await client.end();
      } else {
        // FTP 연결 종료
        client.close();
      }
      return false;
      throw error.message;
    }
  }

  /**
   * 파일 다운로드
   * --
   * @param {downloadInfo} downloadInfo 파일 다운로드 정보
   * @param {file} file 파일
   * @returns
   */
  async downloadFile(downloadInfo) {
    // FTP 생성
    let client = new SftpClient();
    // SFTP 여부
    const isSecure = downloadInfo.isSecure;
    // 경로
    const path = downloadInfo.path;
    try {
      // FTP 연결 정보
      const connectInfo = {
        host: downloadInfo.host,
        password: downloadInfo.password,
        port: downloadInfo.port,
      };

      if (isSecure == true) {
        connectInfo.username = downloadInfo.user;
        connectInfo.algorithms = {
          kex: [
            'diffie-hellman-group-exchange-sha1',
            'diffie-hellman-group14-sha1',
          ],
        };

        await client.connect(connectInfo);
        // 경로에서 파일 및 폴더 목록 가져오기
        const saveFilePath = join(
          __dirname,
          '../../..',
          'temp_download',
          downloadInfo.fileName
        );

        await client.fastGet(`/${path}/${downloadInfo.fileName}`, saveFilePath);
        // 버퍼 가져오기
        const buffer = await fs.promises.readFile(saveFilePath);
        // defalte : 압축 알고리즘
        // util.promisify : promise가 구현되지 않은 함수를 promise로 변환
        const deflate = util.promisify(zlib.deflate);
        // 압축
        // 미압축할 시 용량이 매우 늘어나서 비효율적이며 속도 느려짐
        // 실예 : 25.0MB(원본) -> 2.29MB(압축)
        const zip = await deflate(buffer);
        // 파일 삭제
        await fs.promises.unlink(saveFilePath);
        await client.end();
        return {
          filename: downloadInfo.fileName,
          buffer: zip.toString('base64'),
        };
      } else {
        client = new Client();
        // FTP 접속
        await client.access({
          host: downloadInfo.host,
          user: downloadInfo.user,
          password: downloadInfo.password,
          port: downloadInfo.port,
        });
        // 경로가 있을 경우 해당경로로 이동
        if (path != '') {
          await client.cd(`/${path}`);
        }
        // 경로에서 파일 및 폴더 목록 가져오기
        const saveFilePath = join(
          __dirname,
          '../../..',
          'temp',
          downloadInfo.fileName
        );

        // 버퍼를 가져오기 위해 임시폴더에 다운로드
        await client.downloadTo(saveFilePath, downloadInfo.fileName);
        // 버퍼 가져오기
        const buffer = await fs.promises.readFile(saveFilePath);
        // defalte : 압축 알고리즘
        // util.promisify : promise가 구현되지 않은 함수를 promise로 변환
        const deflate = util.promisify(zlib.deflate);
        // 압축
        // 미압축할 시 용량이 매우 늘어나서 비효율적이며 속도 느려짐
        // 실예 : 25.0MB(원본) -> 2.29MB(압축)
        const zip = await deflate(buffer);
        // 파일 삭제
        await fs.promises.unlink(saveFilePath);
        // FTP 연결 종료
        client.close();

        return {
          filename: downloadInfo.fileName,
          buffer: zip.toString('base64'),
        };
      }
    } catch (error) {
      console.log(error, 'ftp download api error');
      if (isSecure == true) {
        // SFTP 연결 종료
        await client.end();
      } else {
        // FTP 연결 종료
        client.close();
      }
      throw error.message;
    }
  }

  /**
   * 파일 다운로드 테스트 코드
   */
  async fileDownloadTest() {
    try {
      // 통신 간 압축 해제 unzip 함수를 promise로 변경
      const unzip = util.promisify(zlib.unzip);

      // 요청
      const response = await axios.post(
        'http://localhost:8080/api/v1/ftp/download',
        {
          host: '',
          user: '',
          password: '',
          path: '',
          fileName: '',
        }
      );

      // 통신 간 압축을 해제 후 버퍼로 변환
      const buffer = await unzip(
        Buffer.from(response.data.data.buffer, 'base64')
      );

      // 버퍼 내용을 파일에 기록
      await fs.promises.writeFile(response.data.data.filename, buffer);
    } catch (error) {
      console.log(error);
      throw error.message;
    }
  }
}

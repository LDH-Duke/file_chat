import User from './user';
import room from './room';
import invite from './invite';
import chat from './chat';
import ftp from './ftp';
import device from './device';
import log from './log';
import download from './download';

export const routes = [
    ...User, 
    ...room, 
    ...invite, 
    ...chat, 
    ...ftp, 
    ...device,
    ...log,
    ...download,
];

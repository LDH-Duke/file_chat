import { useEffect } from 'react';
import JitsiManager from 'utils/jitsi/JitsiManager';

const jitsiManager = new JitsiManager();

/**
 * Jitsi Command를 바인딩하는 훅
 * @param {*} props
 * @returns
 */
const JitsiCommandHooks = (command, listener) => {
  useEffect(() => {
    jitsiManager.bindCommandListener(command, listener);
    return () => {
      jitsiManager.removeCommandListener(command, listener);
    };
  }, [command, listener]);

  return;
};

export default JitsiCommandHooks;

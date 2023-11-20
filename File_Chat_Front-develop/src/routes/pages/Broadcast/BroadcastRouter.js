import React, { useMemo } from 'react';
import { ConferenceLayout } from 'layout';
import { Redirect, Route, Switch, useLocation } from 'react-router-dom';
import { Conference, Ready } from './pages';
import './Conference.css';
import JitsiManager from 'utils/jitsi/JitsiManager';
import { useSelector } from 'react-redux';

const jitsiManager = new JitsiManager();

/**
 * NOTE
 * 작성자: 임종식
 * 작성일자 2021-07-11
 *
 * 무조건 세팅화면을 거쳐서 가는 것으로 프로세스를 변경했습니다.
 * @Derek, @Coop
 */
const BroadcastRouter = () => {
  /* Router */
  const { search } = useLocation();
  /* State */
  const { isConnected } = useSelector((state) => state.conference);

  const jitsiClient = useMemo(() => {
    return jitsiManager._connection === null;
    // eslint-disable-next-line
  }, [isConnected]);

  return (
    <ConferenceLayout>
      <Switch>
        <Route exact path="/broadcast/live" component={Conference}>
          {jitsiClient && <Redirect to={`/broadcast${search}`} />}
        </Route>
        <Route exact path="/broadcast" component={Ready}></Route>
      </Switch>
    </ConferenceLayout>
  );
};

export default BroadcastRouter;

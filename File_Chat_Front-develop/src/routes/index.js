/**
 *
 *
 */

import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { SignIn, SignUp, Main, Broadcast } from './pages';
// import JitsiManager from 'utils/jitsi/JitsiManager';

/**
 * Routes
 * --
 */
const Routes = () => {
  /* Router */
  // const jitsiManager = new JitsiManager();

  /**
   *
   */
  // useEffect(() => {
  //   if (!jitsiManager._connection) {
  //     // history.push('/');
  //   }
  //   return () => {};
  // });

  /* Render */
  return (
    <div>
      <Switch>
        <Route path="/broadcast" component={Broadcast}></Route>
        <Route path="/signup" exact component={SignUp}></Route>
        <Route path="/signin" exact component={SignIn}></Route>
        <Route path="/" component={Main}></Route>
      </Switch>
    </div>
  );
};

export default Routes;

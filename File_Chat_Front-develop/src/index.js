import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './app/App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router } from 'react-router-dom';
import 'moment/locale/ko';

//redux
import store from './redux';
import { Provider } from 'react-redux';

//antd
import { ConfigProvider } from 'antd';
import koKR from 'antd/es/locale/ko_KR';
import 'antd/dist/antd.css';
import './animista.css';

// jQuery 전역 설정
import jQuery from 'jquery';

global.$ = window.$ = window.jQuery = jQuery;

ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <Router>
        <ConfigProvider locale={koKR}>
          <App />
        </ConfigProvider>
      </Router>
    </React.StrictMode>
  </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

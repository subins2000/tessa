import React from 'react';
import ReactDOM from 'react-dom';
import '@toruslabs/torus-embed';
import App from './App';
import { isLoggedIn, userStore } from './store.js';
import web3Obj from './helper';
import registerServiceWorker from './registerServiceWorker';

const isTorus = sessionStorage.getItem('pageUsingTorus')

if (isTorus === 'true') {
  import('@toruslabs/torus-embed').then(() => {
    console.log('rehydrated Torus')
    web3Obj.setweb3()
  })
}

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();

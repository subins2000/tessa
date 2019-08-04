import Web3 from 'web3';
import { isLoggedIn, userStore } from './store.js';

const web3Obj = {
    web3: new Web3(),
    setweb3: function() {
        if (typeof window.web3 === 'undefined') {
            web3Obj.web3 = new Web3('ws://localhost:8546', null, {})
        } else {
            web3Obj.web3 = new Web3(window.web3.currentProvider || 'ws://localhost:8546', null, {})
        }

        web3Obj.web3.eth.getAccounts().then(accounts => {
            userStore.dispatch({
                type: 'USER_SET_INFO',
                account: accounts[0]
            });
        })
        
        sessionStorage.setItem('pageUsingTorusc', 'true')
    },
    initialize: async function() {
        const defaultTorus = await import('@toruslabs/torus-embed')
        const Torus = defaultTorus.default
        const torus = new Torus()
        await torus.init()
        await torus.ethereum.enable()
        web3Obj.setweb3(torus.provider)
    }
}

export default web3Obj;
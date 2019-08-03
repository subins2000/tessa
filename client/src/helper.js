import Web3 from 'web3'

const web3Obj = {
  web3: new Web3(),
  setweb3: function() {
    if (typeof window.web3 === 'undefined') {
      web3Obj.web3 = new Web3('ws://localhost:8546', null, {})
    } else {
      web3Obj.web3 = new Web3(window.web3.currentProvider || 'ws://localhost:8546', null, {})
    }
    
    sessionStorage.setItem('pageUsingTorus', 'true')
  }
}

export default web3Obj;
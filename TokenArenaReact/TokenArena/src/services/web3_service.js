import  Web3  from 'web3'
import {  MAINNET_INFURA_HANDLER } from '../constants/networks'
import { TOKENS } from '../constants/listed'
import { ERC20_MIN_ABI } from '../constants/settings'


class web3Handler {
    constructor(){
      this.web3 = new Web3(process.env.REACT_APP_MAINNET_INFURA_HANDLER)
    }

    validateEthereumAddress(_addr) {
      let ETH_REX = /^0x[a-fA-F0-9]{40}$/
      var find = _addr.search(ETH_REX)
      if (find > -1) {
        return true
      } else {
        return false
      }
    }

    generateAddress(){
      var addr = this.web3.eth.accounts.create()
      //TODO: Add QR Generation and place it inside structure below
      return {address: addr}
    }

    lookupAmountInWallet = async (_wallet_addr, _token_sym) => {
      return new Promise(async (resolve,reject)=>{
        if (!this.validateEthereumAddress(_wallet_addr)){
          return false
        }

        var token_info = await lookupTokenInfo(_token_sym)
        var contract = new this.web3.eth.Contract(ERC20_MIN_ABI,token_info.addr)
        var balance = await contract.methods.balanceOf(_wallet_addr).call()
        var decimals = await contract.methods.decimals().call()
        let view_balance = balance / 10**decimals
        resolve(view_balance)

      })

    }

}

export function validateEthereumAddress(_addr){
  let ETH_REX = /^0x[a-fA-F0-9]{40}$/
  var find = _addr.search(ETH_REX)
  if (find > -1) {
    return true
  } else {
    return false
  }

}

async function lookupTokenInfo(_symbol = "EVC"){
    for (let i=0; i < TOKENS.length; i++){
        if (TOKENS[i].symbol === _symbol){
          return TOKENS[i]
        }
    }
}

export default web3Handler

const Web3 = require('web3');

const w3 = new Web3(new Web3.providers.HttpProvider('https://mainnet.infura.io/yA4kiAW9mGJ7YldlGZvS'));
// const w3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));

// wallet
const addr = '0x3c2FFF4671fA239D5e167e5356058DF11a799aCe';
// crowdsale contract
const contractAddr = '0x90c2698721f9b96f23501f7a279137829cfc73b0';

import abi from './abi';
import tokenAbi from './tokenAbi';

export default w3;
export { addr, contractAddr, abi, tokenAbi }

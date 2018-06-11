const Web3 = require('web3');

const w3 = new Web3(new Web3.providers.HttpProvider('https://mainnet.infura.io/yA4kiAW9mGJ7YldlGZvS'));
// const w3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));

// wallet
const addr = '0x3c2FFF4671fA239D5e167e5356058DF11a799aCegit ';
// crowdsale contract
const contractAddr = '0xba248210d2d0d49398e53a3919174d1540ded083';

import abi from './abi';
import tokenAbi from './tokenAbi';

export default w3;
export { addr, contractAddr, abi, tokenAbi }

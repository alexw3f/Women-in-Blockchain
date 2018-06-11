const Web3 = require('web3');

const w3 = new Web3(new Web3.providers.HttpProvider('https://mainnet.infura.io/yA4kiAW9mGJ7YldlGZvS'));
// const w3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));

// wallet
const addr = '0xaa05994e1236a722904c5f0e572a50008d016cae';
// crowdsale contract
const contractAddr = '0xE127142C6d0C065abE1af2Dc7E1Dca4AD088E3ad';

import abi from './abi';
import tokenAbi from './tokenAbi';

export default w3;
export { addr, contractAddr, abi, tokenAbi }

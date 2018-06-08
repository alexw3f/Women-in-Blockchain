const Web3 = require('web3');

const w3 = new Web3(new Web3.providers.HttpProvider('https://mainnet.infura.io/yA4kiAW9mGJ7YldlGZvS'));
const addr = '0x3f1f80062299614b59b035f66e416c016da4f6ff';

export default w3;
export { addr }
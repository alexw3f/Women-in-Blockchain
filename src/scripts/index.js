import '../scss/styles.scss';

import BigNumber from 'bignumber.js';

import ticker from "./ticker";
import balance from "./balance";

let price;

const goal = 100;

ticker.subscribe((_price) => price = _price);

balance.subscribe((balance) => {
  if (!price) return;

  const balanceUsd = balance.times(price);

  const progressW = balanceUsd.div(goal).times(100).toFixed(0);

  document.getElementById("goalUSD").innerText = "$" + goal;
  document.getElementById("progress").style.width = progressW + "%";
  document.getElementById("raisedETH").innerText = balance.toFixed(4) + " ETH";
  document.getElementById("raisedUSD").innerText = "$" + balanceUsd.toFixed(2);
});

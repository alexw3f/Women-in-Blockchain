import {Observable} from "rxjs";

// import BigNumber from 'bignumber.js';
import w3, {addr, abi, contractAddr} from "./w3";

const contract = new w3.eth.Contract(abi, contractAddr);

// const p = (new BigNumber(10)).pow(18);
const donors = new Observable((subject) => {
    const e = () => {
        contract.getPastEvents('Donation', {
          fromBlock: 0,
          toBlock: 'latest',
        }, (err, events) => {
          if (err) {
            console.log('err is', err);
            return subject.next(0);
          }

          subject.next(events.length);
        });
    };

    setInterval(() => e(), 2000);
    e();
});

export default donors;

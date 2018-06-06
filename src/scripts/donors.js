import {Observable} from "rxjs";

import BigNumber from 'bignumber.js';
import w3 from "./w3";

const p = (new BigNumber(10)).pow(18);
const donors = new Observable((subject) => {
    const e = () => {
        w3.eth.getTransactionCount('0x9DF06c8cE7358ACebeCB1849090a3974221515Db').then((b) => {
            subject.next(b);
        });
    };

    setInterval(() => e(), 2000);

    e();
});

export default donors;
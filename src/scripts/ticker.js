import {Observable} from "rxjs";

const url = "https://api.coinmarketcap.com/v2/ticker/1027/"; //"https://api.coinpaprika.com/v1/ticker/eth-ethereum";

const ticker = new Observable((subject) => {
  const e = () => {
    fetch(url).then((res) => res.json()).then((content) => {
      subject.next(content.data.quotes.USD.price);
    });
  };

  setInterval(() => e(), 4000);
  e();
});

export default ticker;
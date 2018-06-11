import w3, {abi, tokenAbi, contractAddr} from "./w3";

import $ from 'jquery';

const contract = new w3.eth.Contract(abi, contractAddr);

// Convert a hex string to a byte array
const hexToBytes = (hex) => {
    for (var bytes = [], c = 0; c < hex.length; c += 2)
    bytes.push(parseInt(hex.substr(c, 2), 16));
    return bytes;
};

const showTulip = (event) => {
    if (!event) {
        $("#not_found").show(1);
        $("#certificate").hide(1);
        return;
    }

    const params = event.returnValues;
    const tokenId = params.tokenId;
    const genes = params.gen;

    // set tulip params based on data
    console.log('genes are', genes);
    const geneBytes = hexToBytes(genes);
    console.log('gene bytes are', geneBytes);

    $("#not_found").hide(1);
    $("#certificate").show(1);
};

const donation = () => {
    const donatorAddr = document.location.hash.split("#")[1];
    let tokenContract;

    contract.methods.token().call({}).then((token) => {
      console.log('token address is', token);

      tokenContract = new w3.eth.Contract(tokenAbi, token);
      return tokenContract.getPastEvents("FlowerAwarded", {filter: {owner: donatorAddr}});
    })
    .then((events) => {
      console.log('events is', events);
      if (!events || events.length === 0) {
        return showTulip(null);
      }

      showTulip(events[0]); // TODO: Support multiple flowers
    })
    .catch((err) => {
      console.log('err is', err);
      showTulip(null);
    });
};

window['donator'] = donation;

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

    $("#not_found").hide(1);
    $("#certificate").show(1);

    // parse genes hex string
    const params = event.returnValues;
    const genes = params.gen.substr(2);
    const paddedGenes = ('00000000000000' + genes).substr(genes.length);
    const bytes = hexToBytes(paddedGenes);
    console.log('genes are', genes);
    console.log('gene bytes are', bytes);

    // set tulip params based on data
    /*
     *  Interpretation mechanism [variant (value interval)]
     *  Flower:             1 (0-85); 2 (86-170); 3 (171-255);
     *  Bloom:              1 (0-51); 2 (52-102); 3 (103-153); 4 (154-204); 5 (205-255)
     *  Stem:               1 (0-85); 2 (86-170); 3 (171-255);
     *  Special:            None (0-222);1 (223-239); 2 (240-255);
     *  Color Bloom:        16 distinct colors
     *  Color Stem:        16 distinct colors
     *  Color Background:   4 distinct colors
     */
    let flower;
    if (bytes[6] < 86)
      flower = 'r';
    else if (bytes[6] < 171)
      flower = 't';
    else
      flower = 's';

    let bloom;
    if (bytes[5] < 52)
      bloom = '1';
    else if (bytes[5] < 103)
      bloom = '2';
    else if (bytes[5] < 154)
      bloom = '3';
    else if (bytes[5] < 205)
      bloom = '4';
    else
      bloom = '5';

    let stem;
    if (bytes[4] < 86)
      stem = '1';
    else if (bytes[4] < 171)
      stem = '2';
    else
      stem = '3';

    let special;
    if (bytes[3] < 86)
      special = '1';
    else if (bytes[3] < 171)
      special = '2';
    else
      special = '3';

    let bloomColor = (bytes[2] & 0x0f) + '';

    // compose file names
    const bloomFile = 'img/blooms/' + flower + bloom + '.png';
    //const bloomFile = 'img/blooms/' + flower + bloom + '_' + bloomColor + '.png';
    const stemFile = 'img/stems/' + flower + stem + '.png';
    const effectFile = 'img/effects/e' + special + '.png';

    $('#tulip-bloom').attr('src', bloomFile);
    $('#tulip-stem').attr('src', stemFile);
    if (special == '1') {
      $('#tulip-effect').hide();
    } else {
      $('#tulip-effect').attr('src', effectFile);
    }
};

const donation = () => {
    const donatorAddr = document.location.hash.split("#")[1];
    let tokenContract;

    contract.methods.token().call({}).then((token) => {
      console.log('token address is', token);

      tokenContract = new w3.eth.Contract(tokenAbi, token);
      return tokenContract.getPastEvents("FlowerAwarded", {
        filter: {owner: donatorAddr},
        fromBlock: 0,
        toBlock: 'latest',
      });
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

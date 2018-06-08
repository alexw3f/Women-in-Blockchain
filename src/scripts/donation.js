import w3, {abi, contractAddr} from "./w3";

import $ from 'jquery';

const contract = new w3.eth.Contract(abi, contractAddr);

const showTulip = (data) => {
    if (!data) {
        $("#not_found").show(1);
        $("#certificate").hide(1);
        return;
    }

    // set tulip params based on data

    $("#not_found").hide(1);
    $("#certificate").show(1);
};

const donation = () => {
    const donatorAddr = document.location.hash.split("#")[1];

    contract.getPastEvents("Transfer", {filter: {addr: donatorAddr}}).then((err, x) => {
        if (err) {
            showTulip(null);
        } else {
            showTulip(x);
        }
    });
};

window['donator'] = donation;

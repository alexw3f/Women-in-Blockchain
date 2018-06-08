import '../scss/styles.scss';

import $ from 'jquery';
import BigNumber from 'bignumber.js';

import 'bootstrap';
import balance from "./balance";
import donors from "./donors";

const moment = require('moment');

const dateEnd = moment("2018-06-12");
const dateStart = moment("2017-08-07");

const totalDays = dateEnd.diff(dateStart, 'days');

window.donator = () => {


    $("body").removeClass("loading");
};

$(document).ready(() => {
    setTimeout(() => {
        $("body").removeClass("loading");
    }, 1000);


    let b;

    balance.subscribe((balance) => {
        b = new BigNumber(balance);
        $("#raisedETH").text(b.toFixed(4) + " ETH");
    });

    ticker.subscribe((price) => {
        if (!b) {
            return;
        }

       $("#raisedUSD").text("$" + b.times(price).toFixed(2));
    });

    donors.subscribe((no) => {
        $("#donors").html(no);
    });

    const now = moment();

    const progress = dateEnd.diff(now, 'days');

    // [ 0, 100 ]
    const bar = $("#progress");
    bar.css({width: ((progress/totalDays) * 100).toFixed(2) + '%'});

    $("#findDonatorForm").submit((e) => {
        e.preventDefault();
        window.location.href = "donator.html#" + $("#donatorAddress").val();
    });
});

import '../vendor/particles';
import '../vendor/app';
import ticker from "./ticker";

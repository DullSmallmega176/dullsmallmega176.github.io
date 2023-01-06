const hiddenElements = ['#light-mode' ,'#stat-tab', '#settings-tab'];
const storage = window.localStorage;
const stock_trends = ['steady', 'gentle-descent', 'gentle-ascent', 'steep-descent', 'steep-ascent'];
const default_game = {
    money: 1000,
    time: 360,
    stocks_owned: {
        BTR: 0,
        FLR: 0,
        PZA: 0,
        ICM: 0,
        CHO: 0
    },
    stock_prices: {
        BTR: 50,
        FLR: 125,
        PZA: 250,
        ICM: 500,
        CHO: 850
    },
    stock_prices_previous: {
        BTR: 50,
        FLR: 125,
        PZA: 250,
        ICM: 500,
        CHO: 850
    },
    settings: {
        theme: 'dark'
    }
};
const stock_names = ['BTR', 'FLR', 'PZA', 'ICM', 'CHO'];
let game = default_game;
let current_stock;

function minutes_to_time(m) {
    return `${m > 719 && m < 780 ? '12' : Math.floor(m/60) % 12}:${(m % 60).toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false})} ${Math.floor(m/60) % 24 < 12 ? 'am' : 'pm'}`;
} 

$(document).ready(() => {
    for (const elt of hiddenElements) {
        $(elt).hide();
    }

    game = JSON.parse(storage.getItem('tiny-stocks') ?? JSON.stringify(default_game));

    if (!storage.getItem('tiny-stocks')) {
        game.stock_trends = {};
        for (const s of stock_names) {
            game.stock_trends[s] = choice(stock_trends);
            game.stock_trends[s] += String(Math.floor(Math.random() * 3) + 1);
        }
    }

    $.getScript('themeSwitcher.js', () => switchTheme(game.settings.theme));
    $.getScript('stocks.js', () => switchInfo('btr'));

    $('#time').html(minutes_to_time(game.time));
    $('#money').html(`$${game.money}`);

    let msg = null;
    let tmp = Math.random();
    if (tmp < 0.333) {
        msg = '%chey! stop cheating!'
    } else if (tmp >= 0.333 && tmp < 0.667) {
        msg = '%cwhat are you doing, cheater!'
    } else {
        msg = '%ccheating is for cheaters!'
    }
    console.log(msg, 'color: red; font-size: 30px');
});

function update_time() {
    game.time++;
    $('#time').html(minutes_to_time(game.time));
    $.getScript('stocks.js', () => updateStocks());
}

function choice(a) {
    return a[Math.floor(Math.random()*a.length)];
}

$('button:not(#reset-save)').click(() => {
    storage.setItem('tiny-stocks', JSON.stringify(game));
});
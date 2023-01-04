const hiddenElements = ['#light-mode' ,'#stat-tab'];
const storage = window.localStorage;
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
        theme: 'light'
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

    $.getScript('themeSwitcher.js', () => switchTheme(game.settings.theme));
    $.getScript('stocks.js', () => switchInfo('btr'));

    $('#time').html(minutes_to_time(game.time));
    $('#money').html(`$${game.money}`);
});

function update_time() {
    game.time++;
    $('#time').html(minutes_to_time(game.time));
}
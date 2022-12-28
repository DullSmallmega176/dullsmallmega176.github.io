const hiddenElements = ['#light-mode' ,'#stat-tab'];
const storage = window.localStorage;
const default_game = {
    money: 1000,
    time: 360,
    settings: {
        theme: 'light'
    }
};
const stock_names = ['BTR', 'FLR', 'PZA', 'ICM', 'CHO'];
const stock_defaults = {
    BTR: 50,
    FLR: 125,
    PZA: 250,
    ICM: 500,
    CHO: 850
};
let game = default_game;

function minutes_to_time(m) {
    return `${Math.floor(m/60) % 24}:${(m % 60).toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false})}`
} 

$(document).ready(() => {
    for (const elt of hiddenElements) {
        $(elt).hide();
    }

    game = JSON.parse(storage.getItem('tiny-stocks') ?? JSON.stringify(default_game));

    $.getScript('themeSwitcher.js', () => switchTheme(game.settings.theme));

    $('#time').html(minutes_to_time(game.time));
});

function update_time() {
    game.time++;
    $('#time').html(minutes_to_time(game.time));
}
let game;
const storage = window.localStorage;
const hidden_on_start = ['#light-mode'];
const default_game = {
    settings: {
        theme: 'light'
    }
};

window.setInterval(() => {
    storage.setItem('hypeop', JSON.stringify(game));
}, 60000, (0));

$(document).ready(() => {
    game = JSON.parse(storage.getItem('hypeop') == 'undefined' ? null : storage.getItem('hypeop')) ?? JSON.parse(JSON.stringify(default_game));

    for (const i of hidden_on_start) {
        $(i).hide();
    }

    $.getScript('themeSwitcher.js', () => switch_theme(game.settings.theme));
});
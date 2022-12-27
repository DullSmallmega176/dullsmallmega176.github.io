const hiddenElements = ['#light-mode'];
const storage = window.localStorage;
const default_game = {
    settings: {
        theme: 'dark'
    }
};
let game = default_game;

$(document).ready(() => {
    for (const elt of hiddenElements) {
        $(elt).hide();
    }

    game = JSON.parse(storage.getItem('tiny-stocks') ?? JSON.stringify(default_game));

    $.getScript('themeSwitcher.js', () => switchTheme(game.settings.theme));
});
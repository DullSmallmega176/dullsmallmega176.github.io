function switchTheme(theme) {
    switch (theme) {
        case 'dark':
            $('#dark-mode').hide();
            $('#light-mode').show();
            $('html').addClass('dark');
            game.settings.theme = 'dark';
            storage.setItem('tiny-stocks', JSON.stringify(game));
            break;
        case 'light':
            $('#dark-mode').show();
            $('#light-mode').hide();
            $('html').removeClass('dark');
            game.settings.theme = 'light';
            storage.setItem('tiny-stocks', JSON.stringify(game));
            break;
    }
}
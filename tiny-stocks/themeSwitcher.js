function switchTheme(theme) {
    switch (theme) {
        case 'dark':
            $('html').addClass('dark');
            $('#dark-mode').hide();
            $('#light-mode').show();
            game.settings.theme = 'dark';
            storage.setItem('tiny-stocks', JSON.stringify(game));
            break;
        case 'light':
            $('html').removeClass('dark');
            $('#dark-mode').show();
            $('#light-mode').hide();
            game.settings.theme = 'light';
            storage.setItem('tiny-stocks', JSON.stringify(game));
            break;
    }
}
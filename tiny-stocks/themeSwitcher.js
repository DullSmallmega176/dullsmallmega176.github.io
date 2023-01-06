function switchTheme(theme) {
    switch (theme) {
        case 'dark':
            $('html').addClass('dark');
            $('#dark-mode').hide();
            $('#light-mode').show();
            break;
        case 'light':
            $('html').removeClass('dark');
            $('#dark-mode').show();
            $('#light-mode').hide();
            break;
        }
    game.settings.theme = theme;  
}
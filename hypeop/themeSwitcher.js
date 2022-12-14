function switch_theme(theme) {
    if (theme == 'light') {
        $('html').removeClass('dark');
        $('#light-mode').hide();
        $('#dark-mode').show();
        game.settings.theme = 'light';
    } else if (theme == 'dark') {
        $('html').addClass('dark');
        $('#light-mode').show();
        $('#dark-mode').hide();
        game.settings.theme = 'dark';
    }
}
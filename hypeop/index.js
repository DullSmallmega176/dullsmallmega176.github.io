const hidden_on_start = ['#light-mode'];

function switch_theme(theme) {
    if (theme == 'light') {
        $('html').removeClass('dark');
        $('#light-mode').hide();
        $('#dark-mode').show();
    } else if (theme == 'dark') {
        $('html').addClass('dark');
        $('#light-mode').show();
        $('#dark-mode').hide();
    }
}

$(window).on('ready', () => {
    for (const i of hidden_on_start) {
        $(i).hide();
    }
});

$('#light-mode').on('click', () => switch_theme('light'));

$('#dark-mode').on('click', () => switch_theme('dark'));
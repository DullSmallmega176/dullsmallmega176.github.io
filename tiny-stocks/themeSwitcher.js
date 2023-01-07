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
    sCapital = current_stock.toUpperCase();
    graph = document.getElementById('stock-graph');
    Plotly.newPlot(graph, [{
        x: [...game.stock_time_graph].map(function(x) { return minutes_to_time(x); }),
        y: [...game.stock_prices_graph[sCapital]].map(function(x) { return `$${x}`; }),
        margin: 0
    }], {
        title: `price for ${sCapital} over time`,
        paper_bgcolor: $('html').hasClass('dark') ? '#2c2c2c' : '#c6c6c6',
        plot_bgcolor: $('html').hasClass('dark') ? '#2c2c2c' : '#c6c6c6',
        font: {
            color: $('html').hasClass('dark') ? '#ddd' : '#c3d3d3d'
        }
    }, {scrollZoom: true, displayModeBar: false});
}
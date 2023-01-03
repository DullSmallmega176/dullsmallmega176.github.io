function switchInfo(s) {
    let sCapital = s.toUpperCase();
    $('#stock-info-name').html(sCapital);
    $('#stock-info-amt').html(game.stocks_owned[sCapital]);
    $('#stock-info-price').html(`$${game.stock_prices[sCapital]}`);
    $('#stock-info-inc').html(`${(game.stock_prices[sCapital] - game.stock_prices_previous[sCapital]) / game.stock_prices[sCapital] * 100}%`);
}
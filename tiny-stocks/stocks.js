function switchInfo(s) {
    current_stock = s;
    let sCapital = s.toUpperCase();
    $('#stock-info-name').html(sCapital);
    $('#stock-info-amt').html(game.stocks_owned[sCapital]);
    $('#stock-info-price').html(`$${game.stock_prices[sCapital]}`);
    $('#stock-info-inc').html(`${(game.stock_prices[sCapital] - game.stock_prices_previous[sCapital]) / game.stock_prices[sCapital] * 100}%`);

    if (game.money > game.stock_prices[sCapital]) {
        $('#stock-buy').attr('disabled', false);
    } else {
        $('#stock-buy').attr('disabled', true);
    }

    if (game.stocks_owned[sCapital] > 0) {
        $('#stock-sell').attr('disabled', false);
    } else {
        $('#stock-sell').attr('disabled', true);
    }
}

function buyStock() {
    let sCapital = current_stock.toUpperCase();
    let stock_amt = prompt(`how many would you like to buy? (max ${Math.floor(game.money / game.stock_prices[sCapital])})`);
    stock_amt = stock_amt !== null ? Math.min(Math.max(Number(stock_amt), 1), Math.floor(game.money / game.stock_prices[sCapital])) : null;
    if (!stock_amt) { return; }
    game.money -= game.stock_prices[sCapital] * stock_amt;
    game.stocks_owned[sCapital] += stock_amt;

    switchInfo(current_stock);
    $('#money').html(`$${game.money}`);
}

function sellStock() {
    let sCapital = current_stock.toUpperCase();
    let stock_amt = prompt(`how many would you like to sell? (max ${game.stocks_owned[sCapital]})`);
    stock_amt = stock_amt !== null ? Math.min(Math.max(Number(stock_amt), 1), game.stocks_owned[sCapital]) : null;
    if (!stock_amt) { return; }
    game.money += game.stock_prices[sCapital] * stock_amt;
    game.stocks_owned[sCapital] -= stock_amt;

    switchInfo(current_stock);
    $('#money').html(`$${game.money}`);
}
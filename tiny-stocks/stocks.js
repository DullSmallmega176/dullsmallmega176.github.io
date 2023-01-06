function switchInfo(s) {
    current_stock = s;
    let sCapital = s.toUpperCase();
    $('#stock-info-name').html(sCapital);
    $('#stock-info-amt').html(game.stocks_owned[sCapital]);
    $('#stock-info-price').html(`$${game.stock_prices[sCapital]}`);
    $('#stock-info-inc').html(`${Math.round(((game.stock_prices[sCapital] - game.stock_prices_previous[sCapital]) / game.stock_prices[sCapital] * 100)*100)/100}%`);

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

function updateStocks() {
    for (const s of stock_names) {
        game.stock_prices_previous[s] = game.stock_prices[s];
        console.log(game.stock_trends[s]);
        switch (game.stock_trends[s].slice(0, -1)) {
            case 'steady':
                if (Math.random() > 0.5) {
                    game.stock_prices[s] -= Math.round(game.stock_prices[s] * (Math.random() > 0.5 ? 0.05 : 0.07));
                } else {
                    game.stock_prices[s] += Math.round(game.stock_prices[s] * (Math.random() > 0.5 ? 0.05 : 0.07));
                }
                break;
            case 'gentle-descent': 
                game.stock_prices[s] -= Math.round(game.stock_prices[s] * (Math.random() > 0.5 ? 0.2 : 0.3));
                break;
            case 'gentle-ascent':
                game.stock_prices[s] += Math.round(game.stock_prices[s] * (Math.random() > 0.5 ? 0.2 : 0.3));
                break;
            case 'steep-descent':
                game.stock_prices[s] -= Math.round(game.stock_prices[s] * (Math.random() > 0.5 ? 0.4 : 0.5));
                break;
            case 'steep-ascent':
                game.stock_prices[s] += Math.round(game.stock_prices[s] * (Math.random > 0.5 ? 0.4 : 0.5));
                break;
        }

        game.stock_trends[s] = game.stock_trends[s].slice(0, -1) + String(Number(game.stock_trends[s].slice(-1) - 1));
        if (game.stock_trends[s].slice(-1) == '0') {
            game.stock_trends[s] = choice(stock_trends);
            game.stock_trends[s] += String(Math.floor(Math.random() * 3) + 1);
        }
        switchInfo(current_stock);
    }
}
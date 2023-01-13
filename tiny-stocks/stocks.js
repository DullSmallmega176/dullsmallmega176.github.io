function switchInfo(s) {
    current_stock = s;
    let sCapital = s.toUpperCase();
    $('#stock-info-name').html(sCapital);
    $('#stock-info-amt').html(game.stocks_owned[sCapital].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','));
    $('#stock-info-price').html(`$${game.stock_prices[sCapital].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`);
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
    $('#money').html(`$${game.money.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`);
}

function updateStocks() {
    for (const s of stock_names) {
        game.stock_prices_previous[s] = game.stock_prices[s];
        if (game.stock_prices[s] <= stock_price_defaults[s] / 10) {
            game.stock_trends[s] = 'steep-ascent';
            game.stock_trends[s] += 8 * Math.ceil(game.stock_prices[s] / (stock_price_defaults[s] / 5));
        }
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
            case 'rebounce':
                game.stock_prices[s] += Math.round(game.stock_prices[s] * (Math.random > 0.5 ? 0.7 : 0.8));
                break;
        }

        game.stock_trends[s] = game.stock_trends[s].slice(0, -1) + String(Number(game.stock_trends[s].slice(-1) - 1));
        if (Number(game.stock_trends[s].slice(-1)) < 1) {
            game.stock_trends[s] = choice(stock_trends);
            game.stock_trends[s] += String(Math.floor(Math.random() * 3) + 1);
        }
        game.stock_prices_graph[s].push(game.stock_prices[s]);
    }
}
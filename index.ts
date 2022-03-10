import { Reader } from "./reader";
import { Trade, Market, MarketMetrics } from "./types";
import { getMarkets, getMarketMetrics } from "./extract";

let trades: Array<Trade> = new Reader().parseTradeData();

let markets: Array<Market> = getMarkets(trades);

//console.log(trades)

// for (let market of markets) {
//     process.stdout.write(
//         "market " + market.marketNum.toString() + " contains trade\n\t"
//     );
//     for (let trade of market.orderList) {
//         console.log(
//             "id:",
//             trade.id,
//             "market:",
//             trade.market,
//             "price:",
//             trade.price,
//             "volume:",
//             trade.volume,
//             "is_buy:",
//             trade.is_buy
//         );
//     }
// }

let marketMetrics: Array<MarketMetrics> = getMarketMetrics(markets);

for (let m of marketMetrics) {
    console.log(
        "market:",
        m.market.toFixed(1),
        "totalVolume:",
        m.totalVolume.toFixed(1),
        "meanPrice:",
        m.meanPrice.toFixed(1),
        "meanVolume:",
        m.meanVolume.toFixed(1),
        "VWAP:",
        m.vwap.toFixed(1),
        "percentageBuy",
        m.percentageBuy.toFixed(1)
    );
}

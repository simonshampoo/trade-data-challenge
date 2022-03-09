import { Reader } from "./reader";
import { Trade, Market, MarketMetrics } from "./types";
import { getMarkets } from "./extract";

let trades: Array<Trade> = new Reader().parseTradeData();

let markets: Array<Market> = getMarkets(trades);

//console.log(trades)

console.log(markets);


let marketMetrics: Array<MarketMetrics> = [] 
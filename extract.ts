import { Trade, Market, MarketMetrics } from "./types";

export function getMarkets(trades: Array<Trade>): Array<Market> {
    let markets: Array<Market> = [];

    trades.forEach((trade: Trade) => {
        let seenThisMarket: boolean = false;
        let indexOfSeenMarket: number = -1;
        for (let i = 0, market: Market = markets[i]; i < markets.length; i++) {
            if (market.marketNum === trade.market) {
                seenThisMarket = true;
                indexOfSeenMarket = i;
                break;
            }
        }
        if (seenThisMarket && indexOfSeenMarket !== -1) {
            markets[indexOfSeenMarket].orderList.push(trade);
        } else {
            const newMarketData: Market = {
                marketNum: trade.market,
                orderList: [trade],
            };
            markets.push(newMarketData);
        }
        seenThisMarket = false;
    });

    return markets;
}

export function getMarketMetrics(markets: Array<Market>): Array<MarketMetrics> {
    let marketMetrics: Array<MarketMetrics> = [];

    for (let market of markets) {
        let marketMetric: MarketMetrics;
        let totalVolume: number = 0,
            meanPrice = 0,
            meanVolume = 0,
            vwap = 0,
            percentageBuy = 0;
        for (let marketTrades of market.orderList) {
            totalVolume += marketTrades.volume;
            meanPrice += marketTrades.price;
            meanVolume += marketTrades.volume;
            vwap += marketTrades.price * marketTrades.volume;
            percentageBuy = marketTrades.is_buy
                ? percentageBuy + 1
                : percentageBuy;
        }
        meanPrice /= market.orderList.length;
        meanVolume /= market.orderList.length;
        vwap /= totalVolume;
        percentageBuy /= market.orderList.length;
        marketMetric = {
            market: market.marketNum,
            totalVolume: totalVolume,
            meanPrice: meanPrice,
            meanVolume: meanVolume,
            vwap: vwap,
            percentageBuy: percentageBuy,
        };
        marketMetrics.push(marketMetric);
    }

    return marketMetrics;
}

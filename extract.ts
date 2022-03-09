import { Trade, Market } from "./types";

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
            markets[indexOfSeenMarket].orderList.push(trade)
        } else {
            const newMarketData: Market = {
                marketNum: trade.market,
                orderList: [trade],
            };
            markets.push(newMarketData)
        }
        seenThisMarket = false;
    });

    return markets;
}

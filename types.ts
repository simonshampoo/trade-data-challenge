export type Trade = {
    id: number, 
    market: number, 
    price: number, 
    volume: number
    is_buy: boolean
}

// organize all trade relating to a certain market 
export type Market = {
    marketNum: number, 
    orderList: Array<Trade>
}

// solely used to make returning the final metrics easier. 
export type MarketMetrics = {
    market: number,
    totalVolume: number, 
    meanPrice: number, 
    meanVolume: number, 
    vwap: number
    percentageBuy: number
}
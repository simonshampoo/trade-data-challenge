import { Reader } from "./reader";
import { Trade } from "./types";

let trades: Array<Trade> = new Reader().parseTradeData()

console.log(trades)


const getMarkets = (trades: Array<Trade>) => {

}



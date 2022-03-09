import { Trade } from "./types";
let fs = require("fs");

export class Reader {
    parseTradeData(): Array<Trade> {
        var trades: Array<string> = [];

        if (process.argv.length < 3) {
            console.log("Usage: node " + process.argv[1] + " FILENAME");
            process.exit(1);
        }

        let filename = process.argv[2];
        trades = fs.readFileSync(filename).toString("utf-8").split("\n");
        return this.structureTradeData(trades)
    }

    private structureTradeData(trades: Array<string>): Array<Trade> {
        let structuredTrades: Array<Trade> = [];
        trades.forEach((trade: string) => {
            if (trade !== "BEGIN" && trade !== "END") {
                const curr = JSON.parse(trade);
                const currTrade: Trade = {
                    id: curr.id,
                    market: curr.market,
                    price: curr.price,
                    volume: curr.volume,
                    is_buy: curr.is_buy,
                };
                structuredTrades.push(currTrade);
            }
        });
        return structuredTrades;
    }
}

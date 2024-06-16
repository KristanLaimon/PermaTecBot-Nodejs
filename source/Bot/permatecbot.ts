import { Bot } from "grammy";
import InitializeCommands from "./permatecbot_commands";
require("dotenv").config();

export default class TestBot extends Bot {
    screamingMode: boolean = false;

    constructor(tokenAPI: string) {
        super(tokenAPI);
        InitializeCommands(this);
    }
}

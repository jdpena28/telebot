import { Bot } from "grammy";
import * as dotenv from "dotenv";

dotenv.config();
const bot = new Bot(process.env.TOKEN != null ? process.env.TOKEN : "");

export default bot;

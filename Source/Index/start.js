"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = __importStar(require("discord.js"));
const fs_1 = require("fs");
(() => __awaiter(void 0, void 0, void 0, function* () {
    var BOT = new discord_js_1.Client({
        intents: [
            discord_js_1.Intents.FLAGS.DIRECT_MESSAGES,
            discord_js_1.Intents.FLAGS.GUILD_MESSAGES,
            discord_js_1.Intents.FLAGS.GUILDS
        ]
    });
    //Colecciones
    BOT.SlhCommands = new discord_js_1.Collection();
    BOT.Events = new discord_js_1.Collection();
    BOT.Edits = new discord_js_1.Collection();
    BOT.Deletes = new discord_js_1.Collection();
    BOT.Logs = new discord_js_1.Collection();
    const Managers = (0, fs_1.readdirSync)('./Source/Managers').filter(file => file.endsWith('.js'));
    for (const files of Managers) {
        try {
            require(`../Managers/${files}`).default(BOT, discord_js_1.default);
        }
        catch (e) {
            console.log(e);
        }
    }
    yield BOT.login(process.env.BOT_TOKEN);
}))();

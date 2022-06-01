"use strict";
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
const rest_1 = require("@discordjs/rest");
const fs_1 = require("fs");
const v9_1 = require("discord-api-types/v9");
const Commands = [];
const Directory = './Source/SlashCommands';
const CommandFiles = (0, fs_1.readdirSync)(Directory);
for (const Folder of CommandFiles) {
    const SlashFile = (0, fs_1.readdirSync)(`${Directory}/${Folder}/`)
        .filter(file => file.endsWith('js'));
    for (const Module of SlashFile) {
        const Command = require(`../SlashCommands/${Folder}/${Module}`);
        Commands.push(Command.default.data);
    }
}
const Rest = new rest_1.REST({ version: '9' })
    .setToken(process.env.BOT_TOKEN ? process.env.BOT_TOKEN : 'Error');
(() => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield Rest.put(v9_1.Routes.applicationCommands(process.env.CLIENTID ? process.env.CLIENTID : 'Error'), { body: Commands });
        console.log('Comandos Escritos Exitosamente');
    }
    catch (err) {
        console.log(err);
    }
}))();

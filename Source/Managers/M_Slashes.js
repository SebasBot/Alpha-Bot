"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
function default_1(BOT, Discord) {
    const SlashCommands = (0, fs_1.readdirSync)('./Source/SlashCommands');
    for (const Folder of SlashCommands) {
        const File = (0, fs_1.readdirSync)(`./Source/SlashCommands/${Folder}`)
            .filter(file => file.endsWith('js'));
        for (const Module of File) {
            const SlashCommand = require(`../SlashCommands/${Folder}/${Module}`);
            BOT.SlhCommands.set(SlashCommand.default.name, SlashCommand.default);
        }
    }
}
exports.default = default_1;

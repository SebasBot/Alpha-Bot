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
const builders_1 = require("@discordjs/builders");
const discord_js_1 = require("discord.js");
exports.default = {
    name: 'avatar',
    data: new builders_1.SlashCommandBuilder()
        .setName('avatar')
        .setDescription('muestra un avatar, meh')
        .addUserOption(option => option
        .setName('objetivo')
        .setDescription('el objetivo')
        .setRequired(false)),
    execute(Discord, BOT, Interaction) {
        return __awaiter(this, void 0, void 0, function* () {
            let user = Interaction.options.getUser('objetivo') || Interaction.member;
            let buttons = new discord_js_1.MessageActionRow()
                .addComponents(new discord_js_1.MessageButton()
                .setCustomId('display_avatar')
                .setLabel('Avatar')
                .setStyle('SUCCESS'), new discord_js_1.MessageButton()
                .setCustomId('display_banner')
                .setLabel('Banner')
                .setStyle('SUCCESS'), new discord_js_1.MessageButton()
                .setCustomId('display_custom_avatar')
                .setLabel('Avatar Custom')
                .setStyle('SUCCESS'), new discord_js_1.MessageButton()
                .setCustomId('display_custom_banner')
                .setLabel('Banner Custom')
                .setStyle('SUCCESS'));
            let prev = 0;
            let current = 1;
            let C_AVATAR = null;
            let C_BANNER = null;
            let BANNER = null;
        });
    }
};

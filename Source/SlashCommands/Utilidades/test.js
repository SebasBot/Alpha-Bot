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
exports.default = {
    name: "stickerurl",
    data: new builders_1.SlashCommandBuilder()
        .setName('stickerurl')
        .setDescription('Retorna la url de un sticker (y su respectiva imagen)')
        .addStringOption(option => option.setName('id')
        .setDescription('la id del mensaje con sticker')
        .setRequired(true)),
    execute(Discord, BOT, Interaction) {
        return __awaiter(this, void 0, void 0, function* () {
            var MsgId = Interaction.options.getString('id');
            var channel = Interaction.guild.channels.cache.get(Interaction.channel.id);
            var mensaje = channel.messages;
            try {
                yield mensaje.fetch(MsgId)
                    .then((msg) => {
                    var _a;
                    if (!msg.stickers)
                        return Interaction.reply(`No hay stickers en el mensaje ${MsgId}`);
                    Interaction.reply(`id: "${MsgId}" \n URL: ${(_a = msg.stickers.first()) === null || _a === void 0 ? void 0 : _a.url}`);
                })
                    .catch((e) => {
                    console.log(e);
                    Interaction.reply('Algo salio mal, No pude encontrar el mensaje');
                });
            }
            catch (error) {
                console.log(error);
            }
        });
    }
};

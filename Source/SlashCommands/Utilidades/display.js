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
    name: "display",
    data: new builders_1.SlashCommandBuilder()
        .setName('display')
        .setDescription('Solicita un avatar, un banner o un avatar personalizado de un usuario')
        .addStringOption(option => option
        .setName('opcion')
        .setDescription('Lo que quieres mostrar')
        .setRequired(true)
        .addChoices([
        ['Avatar', 'avatar'],
        ['Custom Avatar', 'custom avatar'],
        ['Banner', 'banner']
    ]))
        .addUserOption(option => option
        .setName('usuario')
        .setDescription('El Usuario objetivo')),
    execute(Discord, BOT, Interaction) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            var OPTIONS = Interaction.options.getString('opcion');
            var USER = Interaction.options.getUser('usuario') || ((_a = Interaction.member) === null || _a === void 0 ? void 0 : _a.user);
            var Target = (_b = Interaction.guild) === null || _b === void 0 ? void 0 : _b.members.cache.get(USER.id);
            const MsgEmbed = {
                color: 'RANDOM',
                title: `El ${OPTIONS} de ${Target.nickname || USER.username}:`,
                image: {
                    url: ''
                }
            };
            switch (OPTIONS) {
                case 'avatar':
                    MsgEmbed.image.url = `${USER.displayAvatarURL({
                        size: 4096,
                        dynamic: true,
                        format: 'png'
                    })}`;
                    break;
                case 'custom avatar':
                    MsgEmbed.image.url = `${Target.displayAvatarURL({
                        size: 4096,
                        dynamic: true,
                        format: 'png'
                    })}`;
                    break;
                case 'banner':
                    let fetch = yield Interaction.client.users.fetch(Target.id, { force: true })
                        .then((user) => {
                        let banner = user.bannerURL({
                            dynamic: true,
                            format: 'png',
                            size: 4096
                        });
                        if (!banner) {
                            return Interaction.reply('Este usuario no posee un banner');
                        }
                        MsgEmbed.image.url =
                            `${banner}`;
                    })
                        .catch(() => console.error());
                    break;
            }
            yield Interaction.reply({ embeds: [MsgEmbed] });
        });
    }
};

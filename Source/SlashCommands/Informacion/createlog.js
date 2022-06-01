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
    name: "createlog",
    data: new builders_1.SlashCommandBuilder()
        .setName('createlog')
        .setDescription('Prepara un canal donde se registra todas las interacciones de Alpha')
        .addChannelOption(option => option
        .setName('canal')
        .setDescription('El canal donde alpha hará los registros')
        .setRequired(true)),
    execute(Discord, BOT, Interaction) {
        var _a, _b, _c, _d;
        return __awaiter(this, void 0, void 0, function* () {
            const TargetChannel = Interaction.options.getChannel('canal');
            if (TargetChannel instanceof discord_js_1.CategoryChannel || TargetChannel instanceof discord_js_1.VoiceChannel) {
                return Interaction.reply({
                    content: `Este canal no es valido (por alguna razon)\nBusca otro`,
                    ephemeral: true
                });
            }
            if (!((_b = (_a = Interaction.guild) === null || _a === void 0 ? void 0 : _a.me) === null || _b === void 0 ? void 0 : _b.permissions.has("EMBED_LINKS"))) {
                return Interaction.reply({
                    content: "No tengo permisos de escribir registros en el canal deseado" +
                        "\n" +
                        "Asegurate de que tenga el permiso de 'Insertar Enlaces'",
                    ephemeral: true
                });
            }
            if (!((_c = Interaction.memberPermissions) === null || _c === void 0 ? void 0 : _c.has('MANAGE_CHANNELS'))) {
                return Interaction.reply({
                    content: `No puedes crear registros sin el permiso "Gestionar Canales"`,
                    ephemeral: true
                });
            }
            try {
                const LOG_INFO = {
                    ServerID: (_d = Interaction.guild) === null || _d === void 0 ? void 0 : _d.id,
                    LogChannel: Interaction.guild.channels.cache.get((TargetChannel === null || TargetChannel === void 0 ? void 0 : TargetChannel.id) ? TargetChannel.id : 'Error'),
                };
                LOG_INFO.LogChannel.send({
                    embeds: [
                        {
                            color: '#FFFFFF',
                            title: 'Ahora los registros se harán aqui',
                            description: 'Si tiene dudas al respecto, comuniquese con @SebasBot#4584',
                            image: { url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/29/Cog-scripted-svg-blue.svg/1200px-Cog-scripted-svg-blue.svg.png' }
                        }
                    ]
                }).then(() => {
                    Interaction.reply({
                        content: `Ahora los registros de AlphaBot se haran en ${TargetChannel}`,
                        ephemeral: true
                    });
                })
                    .catch(() => {
                    Interaction.reply({
                        content: `No se pudo crear ningun registro en ${TargetChannel}\nAsegurate de que tenga el permiso de 'Ver y Escribir en canal' y 'Insertar enlaces' en el canal objetivo`,
                        ephemeral: true
                    });
                });
                yield BOT.Logs.set(LOG_INFO.ServerID, LOG_INFO.LogChannel);
            }
            catch (e) {
                console.log(e);
            }
        });
    }
};

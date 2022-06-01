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
    name: "snp",
    data: new builders_1.SlashCommandBuilder()
        .setName('snp')
        .setDescription('Envio un mensaje editado o eliminado')
        .addStringOption(option => option
        .setName('modo')
        .setDescription('Retorna el tipo de mensaje modificado')
        .addChoices([['Eliminado', 'deleted'], ['Editado', 'edited']])
        .setRequired(true)),
    execute(Discord, BOT, Interaction) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            const deleted_msg = BOT.Deletes.get(Interaction.channel.id);
            const edited_msg = BOT.Edits.get(Interaction.channel.id);
            const Opcion = Interaction.options.getString('modo');
            if (!((_b = (_a = Interaction.guild) === null || _a === void 0 ? void 0 : _a.me) === null || _b === void 0 ? void 0 : _b.permissions.has('VIEW_CHANNEL'))) {
                return Interaction.reply({
                    content: "Asegurate de que tenga el permiso 'Ver canal'",
                });
            }
            switch (Opcion) {
                case 'deleted':
                    yield Interaction.reply(deleted_msg ?
                        {
                            embeds: [
                                new discord_js_1.MessageEmbed()
                                    .addField('Mensaje Borrado', deleted_msg.Contenido, true)
                                    .setAuthor({ name: deleted_msg.Usuario, iconURL: deleted_msg.PerfilURL })
                                    .setColor('NOT_QUITE_BLACK')
                                    .setTimestamp(deleted_msg.Fecha)
                                    .setImage(deleted_msg.Imagen)
                            ]
                        }
                        : 'No hay nada eliminado recientemente');
                    break;
                case 'edited':
                    yield Interaction.reply(edited_msg ?
                        {
                            embeds: [
                                new discord_js_1.MessageEmbed()
                                    .addField('Mensaje Editado', edited_msg.Anterior_Mensaje, true)
                                    .setAuthor({ name: edited_msg.Usuario, iconURL: edited_msg.PerfilURL })
                                    .setColor('WHITE')
                                    .setTimestamp(edited_msg.Fecha)
                                    .setImage(edited_msg.Imagen)
                            ]
                        }
                        : "¡No hay nada editado recientemente");
                    break;
            }
        });
    }
};

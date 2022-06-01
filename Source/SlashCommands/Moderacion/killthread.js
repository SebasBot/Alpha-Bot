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
    name: 'killthread',
    data: new builders_1.SlashCommandBuilder()
        .setName('killthread')
        .setDescription('Elimina el hilo actual o cualquier seleccionado')
        .addStringOption(option => option.setName('id')
        .setDescription('ID del hilo')
        .setRequired(false)),
    execute(Discord, BOT, Interaction) {
        var _a, _b, _c, _d, _e;
        return __awaiter(this, void 0, void 0, function* () {
            var Thread = Interaction.options
                .getString('Hilo') || ((_a = Interaction.channel) === null || _a === void 0 ? void 0 : _a.id);
            var Target = (_b = Interaction.guild) === null || _b === void 0 ? void 0 : _b.channels.cache.get(Thread);
            if (!Target)
                return Interaction.reply('No existe ningun hilo con este id => ' + Thread);
            var Parent = (_c = Interaction.guild) === null || _c === void 0 ? void 0 : _c.channels.cache.get(Target.parentId);
            if (Target.type == 'GUILD_TEXT')
                return Interaction.reply('ESTE ES UN CANAL DE TEXTO');
            if (Target.ownerId != ((_d = Interaction.member) === null || _d === void 0 ? void 0 : _d.user.id)) {
                if (!((_e = Interaction.memberPermissions) === null || _e === void 0 ? void 0 : _e.has('MANAGE_THREADS')))
                    return Interaction.reply('No puedes eliminar este hilo');
            }
            const Objeto = {
                color: 0xFFFFFF,
                author: {
                    name: `Eliminar Hilo`
                },
                fields: [
                    {
                        name: `¿Estas seguro de eliminar el hilo ${Target.name}?`,
                        value: `Pertenece al canal ${Parent.name}`
                    }
                ],
            };
            const Botones = new discord_js_1.MessageActionRow()
                .addComponents(new discord_js_1.MessageButton()
                .setCustomId('approve')
                .setLabel('Si')
                .setStyle('DANGER'), new discord_js_1.MessageButton()
                .setCustomId('deny')
                .setLabel('No')
                .setStyle('SECONDARY'));
            yield Interaction.reply({
                embeds: [Objeto], components: [Botones]
            }).then(() => {
                var _a;
                const filter = (i) => { var _a; return i.user.id === ((_a = Interaction.member) === null || _a === void 0 ? void 0 : _a.user.id); };
                const Collector = (_a = Interaction.channel) === null || _a === void 0 ? void 0 : _a.createMessageComponentCollector({
                    filter, time: 15000
                });
                Collector === null || Collector === void 0 ? void 0 : Collector.on('collect', (collctd) => __awaiter(this, void 0, void 0, function* () {
                    try {
                        yield collctd.deferUpdate();
                        switch (collctd.customId) {
                            case 'approve':
                                Target.delete('Eliminado por Author o Moderador')
                                    //Despues...
                                    .then(() => {
                                    Parent.send(`El hilo \'${Target === null || Target === void 0 ? void 0 : Target.name}\' ha sido eliminado, tengan un buen dia`);
                                }).catch((err) => {
                                    collctd.editReply({
                                        content: 'Ha ocurrido un error en el proceso',
                                        embeds: [],
                                        components: []
                                    });
                                    console.log(err);
                                });
                                Collector.stop();
                                break;
                            case 'deny':
                                collctd.editReply({
                                    content: 'Te recomiendo que no lo hagas de nuevo',
                                    embeds: [],
                                    components: []
                                });
                                break;
                        }
                    }
                    catch (error) {
                        console.log(error);
                        console.log('Ha ocurrido un error');
                    }
                }));
            }).catch((e) => console.log(e));
        });
    }
};

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
    name: 'aislar',
    data: new builders_1.SlashCommandBuilder()
        .setName('aislar')
        .setDescription('Aisla a un usuario de hablar o interactuar')
        .addUserOption(option => option.setName('usuario')
        .setDescription('El Objetivo')
        .setRequired(true))
        .addNumberOption(option => option.setName('tiempo')
        .setDescription('El tiempo aislado (Si introduces 0, liberas el castigo)')
        .setRequired(true))
        .addStringOption(option => option.setName('razon')
        .setDescription('La causa del aislamiento')
        .setRequired(false)),
    execute(Discord, BOT, Interaction) {
        var _a, _b, _c, _d;
        return __awaiter(this, void 0, void 0, function* () {
            if (!((_a = Interaction.memberPermissions) === null || _a === void 0 ? void 0 : _a.has('MODERATE_MEMBERS'))) {
                return Interaction.reply({
                    content: 'No puedes AISLAR a ningun usuario sin el permiso "Aislar Usuarios"',
                    files: ['https://media.discordapp.net/attachments/892129709482209291/964039264444768277/Screenshot_20220414-004731_Discord.jpg'],
                    ephemeral: true
                });
            }
            if (!((_c = (_b = Interaction.guild) === null || _b === void 0 ? void 0 : _b.me) === null || _c === void 0 ? void 0 : _c.permissions.has('MODERATE_MEMBERS'))) {
                return Interaction.reply({
                    content: `No tengo permisos de aislar miembros\n` +
                        `Asegurate de que tenga "Aislar Usuarios"`,
                    files: ['https://media.discordapp.net/attachments/892129709482209291/964039264444768277/Screenshot_20220414-004731_Discord.jpg'],
                    ephemeral: true
                });
            }
            const usuario = Interaction.options.getUser('usuario');
            var Tiempo = Interaction.options.getNumber('tiempo');
            var Razon = Interaction.options.getString('razon');
            var Target = (_d = Interaction.guild) === null || _d === void 0 ? void 0 : _d.members.cache.get(usuario.id);
            var Embed1 = {
                color: 0xFFFFFF,
                title: `⚠️ Aislamiento ⚠️`,
                description: `¿Quieres aislar a ${usuario === null || usuario === void 0 ? void 0 : usuario.username}?`
            };
            var Embed2 = {
                color: 0xFFFFFF,
                author: {
                    name: `⚠️ ${usuario === null || usuario === void 0 ? void 0 : usuario.username} Ha sido aislado ⚠️`,
                    iconURL: usuario === null || usuario === void 0 ? void 0 : usuario.displayAvatarURL({ dynamic: true, format: 'png' })
                },
                fields: [
                    {
                        name: `Se lo merecia ¿No?`,
                        value: `Ahora tendra que esperar **${Tiempo} minuto(s)**`,
                        inline: false
                    }
                ]
            };
            const Botones = new discord_js_1.MessageActionRow()
                .addComponents(new discord_js_1.MessageButton()
                .setCustomId('approve')
                .setLabel('Si')
                .setStyle('DANGER'), new discord_js_1.MessageButton()
                .setCustomId('deny')
                .setLabel('No')
                .setStyle('SECONDARY'));
            if (Tiempo <= 0) {
                Tiempo = null;
                Embed1.description = `Esto quitará el aislamiento a ${usuario.username} ¿Desea continuar?`;
            }
            try {
                yield Interaction.reply({
                    embeds: [Embed1],
                    components: [Botones]
                })
                    .then(() => {
                    var _a;
                    const filter = (i) => { var _a; return i.user.id === ((_a = Interaction.member) === null || _a === void 0 ? void 0 : _a.user.id); };
                    const Collector = (_a = Interaction.channel) === null || _a === void 0 ? void 0 : _a.createMessageComponentCollector({
                        filter, time: 15000
                    });
                    Collector === null || Collector === void 0 ? void 0 : Collector.on('collect', (collctd) => __awaiter(this, void 0, void 0, function* () {
                        try {
                            yield collctd.deferUpdate();
                            switch (collctd.customId) {
                                case "approve":
                                    yield (Target === null || Target === void 0 ? void 0 : Target.timeout(Tiempo ? Tiempo * 60 * 1000 : Tiempo, Razon || 'Ningun motivo aparente').then(() => {
                                        var _a, _b;
                                        if (Tiempo) {
                                            collctd.editReply({
                                                content: 'Ejecutando Castigo...',
                                                embeds: [],
                                                components: []
                                            });
                                            (_a = Interaction.channel) === null || _a === void 0 ? void 0 : _a.send({
                                                embeds: [Embed2]
                                            });
                                        }
                                        else {
                                            collctd.editReply({
                                                content: 'Ejecutando Liberación...',
                                                embeds: [],
                                                components: []
                                            });
                                            (_b = Interaction.channel) === null || _b === void 0 ? void 0 : _b.send({
                                                content: `${usuario === null || usuario === void 0 ? void 0 : usuario.username} ha sido liberado de su castigo `
                                            });
                                        }
                                    }).catch(() => {
                                        var _a;
                                        collctd.editReply({
                                            content: 'Ha ocurrido un error, no se pudo aislar al usuario',
                                            embeds: [],
                                            components: []
                                        });
                                        (_a = Interaction.channel) === null || _a === void 0 ? void 0 : _a.send({
                                            content: 'Quizas no tengo permisos de Aislar a este usuario o ni exista... Quien sabe'
                                        });
                                    }));
                                    break;
                                case "deny":
                                    collctd.editReply({
                                        content: 'Te recomiendo que utilices esto bien :/',
                                        embeds: [],
                                        components: []
                                    });
                                    break;
                            }
                        }
                        catch (error) {
                            console.log(error);
                        }
                    }));
                });
            }
            catch (error) {
                console.log(error);
            }
        });
    }
};

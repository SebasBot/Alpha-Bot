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
    name: "latencia",
    data: new builders_1.SlashCommandBuilder()
        .setName('latencia')
        .setDescription('Mi Latencia X.X'),
    execute(Discord, BOT, Interaction) {
        return __awaiter(this, void 0, void 0, function* () {
            const boton = new discord_js_1.MessageActionRow()
                .addComponents(new discord_js_1.MessageButton()
                .setCustomId('primary')
                .setLabel('Entiendo')
                .setStyle('PRIMARY'));
            yield Interaction.reply({
                content: `Pong! \n Latencia del API es de: ${Math.round(Interaction.client.ws.ping)} ms.`,
                components: [boton]
            })
                .then(() => {
                var _a;
                const filter = (i) => { var _a; return i.customId === 'primary' && i.user.id === ((_a = Interaction.member) === null || _a === void 0 ? void 0 : _a.user.id); };
                const Collector = (_a = Interaction.channel) === null || _a === void 0 ? void 0 : _a.createMessageComponentCollector({ filter, time: 15000 });
                Collector === null || Collector === void 0 ? void 0 : Collector.on('collect', (i) => __awaiter(this, void 0, void 0, function* () {
                    if (i.customId === 'primary') {
                        yield i.deferUpdate();
                        yield i.editReply({ components: [] });
                        yield i.followUp({ content: 'Vale, siempre estoy a tu servicio 👍', ephemeral: true });
                        Collector.stop();
                    }
                }));
            })
                .catch((e) => {
                console.log(e);
            });
        });
    },
};

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
    name: "pregunta",
    data: new builders_1.SlashCommandBuilder()
        .setName('pregunta')
        .setDescription('Responderé a una de tus preguntas')
        .addStringOption(option => option.setName('interrogante')
        .setDescription('la interrogante que desees consultar')
        .setRequired(true)),
    execute(Discord, BOT, Interaction) {
        return __awaiter(this, void 0, void 0, function* () {
            var pregunta = Interaction.options
                .getString('interrogante');
            const respuestas = ['Jajajaja', 'No vuelvas a preguntar eso', 'Si. 👍', '...', 'Puede ser', 'No. 👎', 'Es posible. 🤔', 'Nunca. 😄', 'Definitivamente. 👌', 'Mejor pregunta otra cosa. 😅'];
            const RNG = Math.floor(Math.random() * respuestas.length);
            const Bola8 = new discord_js_1.MessageEmbed() // create embed 
                .setAuthor({ name: '🎱 La Bola 8 dice...' })
                .setColor('ORANGE').addField('Pregunta:', pregunta)
                .addField('Respuesta:', respuestas[RNG]);
            yield Interaction.reply({ embeds: [Bola8] });
        });
    }
};

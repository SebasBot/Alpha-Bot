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
    name: "decir",
    data: new builders_1.SlashCommandBuilder()
        .setName('decir')
        .setDescription('Puedo repetir lo que dices')
        .addStringOption(option => option.setName('frase')
        .setDescription('Lo que dire por ti.')
        .setRequired(true)),
    execute(Discord, BOT, Interaction) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            var respuesta = Interaction.options.getString('frase');
            var _respuesta_ = respuesta ? respuesta.toLowerCase() : 'Respuesta Invalida';
            const Dictionary = ['discord.gg', 'negros', 'nig', 'mexichango', 'cp', 'cepe', 'papul', '@everyone', '@here', 'https://', 'http'];
            function checkWord(Args, BLOCKED_WORDS) {
                for (let word of BLOCKED_WORDS) {
                    if (Args.includes(word)) {
                        return false;
                    }
                }
                return true;
            }
            if (_respuesta_.length >= 100 || !checkWord(_respuesta_, Dictionary)) {
                //Osea si la funcion encuentra una mala palabra o tiene mas de 100 caracteres...
                return Interaction.reply({
                    content: '**No puedo enviar ese mensaje, va contra mis normas**', ephemeral: true
                });
            }
            Interaction.reply({
                content: 'El mensaje que has enviado es:',
                ephemeral: true
            });
            yield ((_a = Interaction.channel) === null || _a === void 0 ? void 0 : _a.send({
                content: respuesta
            }));
        });
    }
};

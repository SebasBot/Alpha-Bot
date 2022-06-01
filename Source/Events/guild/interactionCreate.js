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
function default_1(Discord, BOT, interaction) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        if (!interaction.isCommand())
            return;
        const slashName = BOT.SlhCommands.get(interaction.commandName);
        const INTERACTION_LOG = BOT.Logs.get((_a = interaction.guild) === null || _a === void 0 ? void 0 : _a.id);
        if (!slashName)
            return;
        try {
            yield slashName.execute(Discord, BOT, interaction)
                .then(() => {
                if (!INTERACTION_LOG) {
                    return console.log('No hay ningun canal para hacer un registro');
                }
                var message = {
                    color: 'RANDOM',
                    title: `por el usuario ${interaction.user.username}#${interaction.user.discriminator}`,
                    author: { name: `Interaccion creada en #${interaction.channel.name}` },
                    description: `Comando /${interaction.commandName}`,
                    fields: [],
                    footer: `a las ${interaction.createdAt}`
                };
                interaction.options.data.forEach((params) => {
                    message.fields.push({
                        name: `${params.name}`,
                        value: `\`\`\`\nTipo: ${params.type}\nContenido: ${params.value}\n\`\`\``,
                    });
                });
                INTERACTION_LOG.send({
                    embeds: [
                        message
                    ]
                }).then(() => console.log(`registro creado en ${INTERACTION_LOG.name}`))
                    .catch((e) => { console.log(e); console.log('fracasò'); });
            });
        }
        catch (error) {
            console.log(error);
        }
    });
}
exports.default = default_1;

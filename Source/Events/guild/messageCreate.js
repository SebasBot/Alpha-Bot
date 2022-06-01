"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function default_1(Discord, BOT, message) {
    var _a, _b;
    if (message.author.bot)
        return;
    const MsgCreated = {
        Contenido: message.content,
        Canal: message.channel.name,
        Usuario: `${message.author.username}# ${message.author.discriminator}`,
        Server: (_a = message.guild) === null || _a === void 0 ? void 0 : _a.name,
        Imagen: message.attachments.first() ?
            (_b = message.attachments.first()) === null || _b === void 0 ? void 0 : _b.proxyURL :
            null,
        AutorID: message.author.id,
        Fecha: Date(),
    };
    console.log('-----------Mensaje Enviado-----------');
    console.log(MsgCreated);
    console.log('-------------------------------------');
}
exports.default = default_1;

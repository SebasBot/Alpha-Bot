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
function default_1(Discord, BOT, oldMsg, newMsg) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        if (oldMsg.author.bot)
            return;
        const MsgEdited = {
            Anterior_Mensaje: oldMsg.content,
            Nuevo_Mensaje: newMsg.content,
            Usuario: `${oldMsg.author.username}# ${oldMsg.author.discriminator}`,
            Canal: newMsg.channel.name,
            PerfilURL: oldMsg.author.avatarURL(),
            Imagen: oldMsg.attachments.first() ?
                (_a = oldMsg.attachments.first()) === null || _a === void 0 ? void 0 : _a.proxyURL :
                null,
            AutorID: oldMsg.author.id,
            CanalID: oldMsg.channel.id,
            Fecha: Date()
        };
        if (MsgEdited.Anterior_Mensaje == '' || MsgEdited.Anterior_Mensaje == null) {
            MsgEdited.Anterior_Mensaje = '[Este Mensaje esta en blanco]';
        }
        if (MsgEdited.Anterior_Mensaje.length >= 1000) {
            MsgEdited.Anterior_Mensaje = '[¡Este mensaje es muy largo!]';
        }
        yield BOT.Edits.set(MsgEdited.CanalID, MsgEdited);
        console.log('-----------Mensaje Editado-----------');
        console.log(MsgEdited);
    });
}
exports.default = default_1;

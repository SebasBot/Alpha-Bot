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
function default_1(Discord, BOT, msgDel) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        if (msgDel.author.bot)
            return;
        const MsgDeleted = {
            Contenido: msgDel.content,
            Canal: msgDel.channel.name,
            Usuario: `${msgDel.author.username}# ${msgDel.author.discriminator}`,
            PerfilURL: msgDel.author.avatarURL(),
            Imagen: msgDel.attachments.first() ?
                (_a = msgDel.attachments.first()) === null || _a === void 0 ? void 0 : _a.proxyURL :
                null,
            AutorID: msgDel.author.id,
            CanalID: msgDel.channel.id,
            Fecha: Date()
        };
        if (MsgDeleted.Contenido == null || MsgDeleted.Contenido == '') {
            MsgDeleted.Contenido = '[No hay ningun mensaje]';
        }
        if (MsgDeleted.Contenido > 1000) {
            MsgDeleted.Contenido = '[Este mensaje es muy largo!]';
        }
        yield BOT.Deletes.set(MsgDeleted.CanalID, MsgDeleted);
        console.log('----------Mensaje Eliminado-----------');
        console.log(MsgDeleted);
        console.log('--------------------------------------');
    });
}
exports.default = default_1;

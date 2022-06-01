"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function default_1(Discord, BOT) {
    console.log('Alpha-Bot 1.2.7 El progreso es la via');
    console.log('Registrando mensajes: Listo');
    console.log('Ejecutando tareas: Listo');
    console.log('Reuniendo datos: Listo');
    let stringPhrases = [
        'mis poderes',
        `${BOT.guilds.cache.size} Servidores`,
        'comandos (/)',
        `${BOT.users.cache.size} Usuarios`,
        ' a @SebasBot#4584',
        'tus posibilidades de ser amado'
    ];
    console.log(stringPhrases);
    function random(array) {
        let Selection = '' + array[Math.floor(Math.random() * array.length)];
        return Selection;
    }
    setInterval(() => {
        var _a;
        (_a = BOT.user) === null || _a === void 0 ? void 0 : _a.setActivity(random(stringPhrases), { type: "WATCHING" });
    }, 6 * 1000);
}
exports.default = default_1;

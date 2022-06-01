"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
exports.default = (BOT, Discord) => {
    function dirCharge(dirs) {
        const EventFiles = (0, fs_1.readdirSync)(`./Source/Events/${dirs}`).filter(file => file.endsWith('js'));
        for (const Doc of EventFiles) {
            const EVENT = require(`../Events/${dirs}/${Doc}`);
            const EVENT_NAME = Doc.split('.')[0];
            BOT.on(EVENT_NAME, EVENT.default.bind(null, Discord, BOT));
        }
    }
    const EVENTS = (0, fs_1.readdirSync)(`./Source/Events`);
    for (const Directory of EVENTS) {
        dirCharge(Directory);
    }
};

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ButtonCollector_1 = require("./ButtonCollector");
function awaitButtons(message, filter, options) {
    return new Promise((resolve, reject) => {
        const collector = new ButtonCollector_1.ButtonCollector(message, filter, options);
        collector.once('end', (buttons, reason) => {
            if (options.errors && options.errors.includes(reason)) {
                reject(buttons);
            }
            else {
                resolve(buttons);
            }
        });
    });
}
exports.awaitButtons = awaitButtons;

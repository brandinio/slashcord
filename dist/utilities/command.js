"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Command = void 0;
class Command {
    constructor({ name, description, execute, cooldown, devOnly, perms, testOnly, options, }) {
        this.name = name;
        this.description = description;
        this.execute = execute;
        this.cooldown = cooldown;
        this.devOnly = devOnly;
        this.perms = perms;
        this.testOnly = testOnly;
        this.options = options;
    }
}
exports.Command = Command;

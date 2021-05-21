"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Command = /** @class */ (function () {
    function Command(_a) {
        var name = _a.name, execute = _a.execute, description = _a.description, options = _a.options, testOnly = _a.testOnly;
        this.name = name;
        this.description = description;
        this.testOnly = testOnly;
        this.options = options;
        this.execute = execute;
    }
    return Command;
}());
exports.default = Command;
//# sourceMappingURL=Command.js.map
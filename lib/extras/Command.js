"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Command = /** @class */ (function () {
    function Command(_a) {
<<<<<<< HEAD
        var name = _a.name, execute = _a.execute, description = _a.description, testOnly = _a.testOnly, options = _a.options;
        this.name = name;
        this.description = description;
        this.testOnly = testOnly;
=======
        var name = _a.name, execute = _a.execute, description = _a.description, options = _a.options;
        this.name = name;
        this.description = description;
>>>>>>> 4b53d37302ff9a45b8866c612da5350750b7136a
        this.options = options;
        this.execute = execute;
    }
    return Command;
}());
exports.default = Command;
//# sourceMappingURL=Command.js.map
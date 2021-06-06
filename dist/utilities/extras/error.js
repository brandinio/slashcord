"use strict";
class Slasherror extends Error {
    constructor(message) {
        super(message);
        this.name = "Slasherror";
    }
}
module.exports = Slasherror;

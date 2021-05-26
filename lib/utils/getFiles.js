"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
var fs_1 = require("fs");
function getFiles(dir) {
    var files = fs_1.readdirSync(dir, {
        withFileTypes: true,
    });
    // Array with the files.
    var allFiles = [];
    for (var _i = 0, files_1 = files; _i < files_1.length; _i++) {
        var file = files_1[_i];
        if (file.isDirectory()) {
            allFiles = __spreadArray(__spreadArray([], allFiles), getFiles(dir + "/" + file.name));
        }
        else if (file.name.endsWith(".js") || file.name.endsWith(".ts") || !file.name.endsWith("d.ts")) {
            // Getting the file name.
            var fileName = file.name
                .replace(/\\/g, "/")
                .split("/");
            fileName = fileName[fileName.length - 1];
            fileName = fileName.split(".")[0].toLowerCase();
            allFiles.push([dir + "/" + file.name, fileName]);
        }
    }
    return allFiles;
}
module.exports = getFiles;

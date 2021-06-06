"use strict";
const fs_1 = require("fs");
function getFiles(dir) {
    const files = fs_1.readdirSync(dir, {
        withFileTypes: true,
    });
    // Array with the files.
    let allFiles = [];
    for (const file of files) {
        if (file.isDirectory()) {
            allFiles = [...allFiles, ...getFiles(`${dir}/${file.name}`)];
        }
        else if (file.name.endsWith(".js") ||
            file.name.endsWith(".ts") ||
            !file.name.endsWith("d.ts")) {
            // Getting the file name.
            let fileName = file.name
                .replace(/\\/g, "/")
                .split("/");
            fileName = fileName[fileName.length - 1];
            fileName = fileName.split(".")[0].toLowerCase();
            allFiles.push([`${dir}/${file.name}`, fileName]);
        }
    }
    return allFiles;
}
module.exports = getFiles;

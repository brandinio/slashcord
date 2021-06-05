"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventHandler = void 0;
const fs_1 = require("fs");
const path_1 = require("path");
const error_1 = __importDefault(require("../utilities/extras/error"));
const getFiles_1 = __importDefault(require("../utilities/getFiles"));
class EventHandler {
    constructor(handler, client, directory) {
        this._client = handler.client;
        if (!directory)
            return;
        const dir = path_1.isAbsolute(directory)
            ? directory
            : path_1.join(require.main.path, directory);
        if (!fs_1.existsSync(dir)) {
            throw new error_1.default(`The events directory: "${directory}" doesn't exist!`);
        }
        const files = getFiles_1.default(dir);
        if (files.length <= 0)
            return;
        console.log(`Slashcord >> Registered ${files.length} event${files.length === 1 ? "" : "s"}!`);
        for (const [file, fileName] of files) {
            (() => __awaiter(this, void 0, void 0, function* () {
                const event = (yield Promise.resolve().then(() => __importStar(require(file)))).default;
                if (typeof event !== "function") {
                    throw new error_1.default(`The file: "${fileName}" needs to be a function.`);
                }
                else {
                    event(client);
                }
            }))();
        }
    }
}
exports.EventHandler = EventHandler;

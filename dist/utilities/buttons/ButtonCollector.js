"use strict";
//@ts-nocheck
Object.defineProperty(exports, "__esModule", { value: true });
exports.ButtonCollector = void 0;
const discord_js_1 = require("discord.js");
const { Events } = discord_js_1.Constants;
class ButtonCollector extends discord_js_1.Collector {
    constructor(message, filter, options) {
        super(message.client, filter, options);
        this.message = message;
        this.users = new discord_js_1.Collection();
        this.total = 0;
        this.empty = this.empty.bind(this);
        this._handleChannelDeletion = this._handleChannelDeletion.bind(this);
        this._handleGuildDeletion = this._handleGuildDeletion.bind(this);
        this._handleMessageDeletion = this._handleMessageDeletion.bind(this);
        this.client.incrementMaxListeners();
        this.client.on("button", this.handleCollect);
        this.client.on(Events.MESSAGE_DELETE, this._handleMessageDeletion);
        this.client.on(Events.CHANNEL_DELETE, this._handleChannelDeletion);
        this.client.on(Events.GUILD_DELETE, this._handleGuildDeletion);
        this.once("end", () => {
            this.client.removeListener("button", this.handleCollect);
            this.client.removeListener(Events.MESSAGE_DELETE, this._handleMessageDeletion);
            this.client.removeListener(Events.CHANNEL_DELETE, this._handleChannelDeletion);
            this.client.removeListener(Events.GUILD_DELETE, this._handleGuildDeletion);
            this.client.decrementMaxListeners();
        });
        this.on("collect", (button) => {
            this.total++;
            this.users.set(button.member.user.id, button.member.user);
        });
    }
    collect(button) {
        if (button.message.id !== this.message.id)
            return null;
        return button.id;
    }
    empty() {
        this.total = 0;
        this.collected.clear();
        this.users.clear();
        this.checkEnd();
    }
    endReason() {
        if (this.options.max && this.total >= this.options.max)
            return "limit";
        if (this.options.maxButtons &&
            this.collected.size >= this.options.maxButtons)
            return "buttonLimit";
        if (this.options.maxUsers && this.users.size >= this.options.maxUsers)
            return "userLimit";
        return null;
    }
    _handleMessageDeletion(message) {
        if (message.id === this.message.id) {
            this.stop("messageDelete");
        }
    }
    _handleChannelDeletion(channel) {
        if (channel.id === this.message.channel.id) {
            this.stop("channelDelete");
        }
    }
    _handleGuildDeletion(guild) {
        if (this.message.guild && guild.id === this.message.guild.id) {
            this.stop("guildDelete");
        }
    }
}
exports.ButtonCollector = ButtonCollector;

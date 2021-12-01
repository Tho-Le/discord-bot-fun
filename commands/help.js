const {MessageEmbed, Message} = require('discord.js');


module.exports = {

    name: 'help',
    description: 'Lists all commands availible',
    execute(message,args) {
        let msgEmbed = new MessageEmbed()
        .setTitle('Bot Commands')
        .addFields(
            {name: 'help', value: 'The Help Command'},
            {name: 'gif', value: "Displays a random gif from giphy"},
            {name: 'dnd5', value: 'Shows the dnd5 commands'},
            {name: 'join', value: 'Gets the bot to join your voice channel'},
            {name: 'ping', value: 'Gets the bot to response with a pong'},
            {name: 'tableflip', value: 'Gets the bot to put the table back'},
            {name: 'weather', value: 'Shows the current weather in amarillo'},
            {name: 'roll', value: 'Rolls a d20 die or rolls x amount of y dice'},
            {name: 'mute', value: 'Mutes a user'},
            {name: 'unmute', value: 'unmutes a user'},
            {name: 'nasa', value: 'Gets the Astronomy Picture of the Day from NASA'},
            {name: 'clear', value: 'Clears the pass 5 messages or clear x messages up to a max of 100'},
            
        )
        message.channel.send({embeds: [msgEmbed]})
        .then(console.log('Help Embed Message Sent Successfully'))
        .catch(console.error);
    }
}
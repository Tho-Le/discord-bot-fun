const { MessageEmbed } = require("discord.js");

module.exports = {
    name: 'ping',
    description: 'Replies with Pong', 
    //execute is just a name. can be called anything.
    execute(message, args) {
        console.log('we entered ping.js')
        let testEmbed = new MessageEmbed()
        .setTitle('Test')
        .setDescription('asdasdasdasdasdasdas')
        message.channel.send({embeds: [testEmbed]});
    }
};
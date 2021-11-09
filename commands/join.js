module.exports = {
    name:'join',
    description: 'Get the bot to join a specific voice channel.',
    execute(message,args) {
        //When a user sends a command for the bot to join a voice channel.
        //We can use the message property to check if that user is in a voice
        //channel. If the user is in a channel, it will return a VoiceChannel object
        //otherwise it will return null aka the user is not in a voice channel.
        console.log(message.member.voice.channel);
    }
}


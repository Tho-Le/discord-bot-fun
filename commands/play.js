module.exports = {
    name: 'play',
    description: 'use the bot to play some audio',
    execute(message, args) {
        const channel = message.member.channel;
        if(!channel) {
            message.channel.send('Join a voice channel first');
            
        }
    }
}
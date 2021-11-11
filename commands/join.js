const { joinVoiceChannel, getVoiceConnection, createAudioPlayer, createAudioResource, StreamType } = require("@discordjs/voice");


module.exports = {
    name:'join',
    description: 'Get the bot to join a specific voice channel.',
    execute(message,args) {
        
        //When a user sends a command for the bot to join a voice channel.
        //We can use the message property to check if that user is in a voice
        //channel. If the user is in a channel, it will return a VoiceChannel object
        const channel = message.member.voice.channel;
        console.log(channel);
        if(!channel) {
            message.channel.send('You are not in a voice channel, join one before asking the bot to join!')
            .then(console.log('message send successfully'))
            .catch(console.error);
            return;
        }


        // const player = createAudioPlayer();

        // const resource = createAudioResource('https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3', {
        //     inputType: StreamType.Arbitrary,
        // });

        // console.log('we are before player play resouirce')
        // player.play(resource);
        // console.log('we are after play resource');
        

        const connection = joinVoiceChannel({
            channelId: channel.id,
            guildId: channel.guild.id,
            adapterCreator: channel.guild.voiceAdapterCreator,
        });

        console.log(channel.guild.voiceAdapterCreator)
        connection.destroy();
        //console.log(channel.guild.id)
        //console.log(connection);

        //connection.subscribe(player)



        //console.log(message.member.voice.channel.id);
        //connection.ping

    }
}


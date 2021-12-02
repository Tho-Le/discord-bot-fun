const { joinVoiceChannel, getVoiceConnection, createAudioPlayer, createAudioResource, StreamType ,VoiceConnectionStatus, AudioPlayer, AudioPlayerStatus} = require("@discordjs/voice");

const {join} = require('path');

module.exports = {
    name:'join',
    description: 'Get the bot to join a specific voice channel.',
    execute(message,args) {
        
        //When a user sends a command for the bot to join a voice channel.
        //We can use the message property to check if that user is in a voice
        //channel. If the user is in a channel, it will return a VoiceChannel object
        const channel = message.member.voice.channel;
        //console.log(channel);
        if(!channel) {
            message.channel.send('You are not in a voice channel, join one before asking the bot to join!')
            .then(console.log('message send successfully'))
            .catch(console.error);
            return;
        }


        const player = createAudioPlayer();

        const resource = createAudioResource('https://cdn.discordapp.com/attachments/471931342334984203/915872824751710228/nomine.MP3');

        console.log(resource);
        
        const connection = joinVoiceChannel({
            channelId: channel.id,
            guildId: channel.guild.id,
            adapterCreator: channel.guild.voiceAdapterCreator,
        });

        //console.log(channel.guild.voiceAdapterCreator)
        //connection.destroy();
        //console.log(channel.guild.id)
        //console.log(connection);

        player.play(resource);

        connection.subscribe(player);
        
        
        

        // if(subscription) {
        //     setTimeout(() => subscription.unsubscribe(), 10_000)
        // }
        if(args.length > 0 && args[0] ==='destroy') {
            connection.destroy();
        }
        // connection.on(VoiceConnectionStatus.Ready, () => {
        //     console.log('The connection has entered the Ready state - ready to play some audioo');
        //     const subscription = connection.subscribe(player)
        // })
       
        


        //console.log(message.member.voice.channel.id);
        //connection.ping

        player.on(AudioPlayerStatus.Idle, () => {
            connection.destroy();
            console.log('The bot was idle. Disconnected.')
        })

    }
}


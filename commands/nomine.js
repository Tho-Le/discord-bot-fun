const { joinVoiceChannel, getVoiceConnection, createAudioPlayer, createAudioResource, StreamType, VoiceConnectionStatus, AudioPlayer, AudioPlayerStatus } = require("@discordjs/voice");

//const asd = require('./resources/nomine.MP3')

module.exports = {
    name: 'nomine',
    description: 'In nomine Patris et Filii et Spiritus Sancti',
    execute(message, args) {
        const channel = message.member.voice.channel;
        if (!channel) {
            message.channel.send('Please join a voice channel first')
                .then(console.log('message send successfully'))
                .catch(console.error)
            return;
        }

        const player = createAudioPlayer();

        const resource = createAudioResource("https://cdn.discordapp.com/attachments/471931342334984203/915872824751710228/nomine.MP3");


        const connection = joinVoiceChannel({
            channelId: channel.id,
            guildId: channel.guild.id,
            adapterCreator: channel.guild.voiceAdapterCreator,
        });

        player.play(resource);

        connection.subscribe(player);

        player.on(AudioPlayerStatus.Idle, () => {
            connection.destroy();
            console.log('The bot was idle. Disconnected.')
        })

        if (args.length > 0 && args[0] === 'destroy') {
            connection.destroy();
        }

    }
}
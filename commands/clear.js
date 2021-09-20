module.exports = {
    name: 'clear',
    description: 'clears messages newer that 14 days on',
    //due the the limitation of discord bulkDelete cannot delete messages that are older
    //than 14 days old.
    execute(message, args) {
        if(args.length < 1) {
            // message.channel.messages.fetch({limit: 5})
            // .then(messages => messages.forEach(message => message.delete()))
            // .catch(console.error)
            
            //Using the bulkDelete method
            message.channel.bulkDelete(5, true)
            .then(messages => console.log(`Bulk delete ${messages.size}`))
            .catch(console.error);
        }
        else if (args.length > 1) {
            message.reply(`Incorrect command. Pleasure make sure it follows the format !clear number or !clear`);
            message.reply('Example !clear 5 will delete five messages');
            message.reply('!clear will default clear 5 messages.')
        }
        else {
            const numsOfMessageToDelete = Number(args[0]);
            message.channel.bulkDelete(numsOfMessageToDelete, true)
            .then(message.reply(`${numsOfMessageToDelete} messages deleted`))
            .catch(error => {
                console.log(error);
                message.reply(error.message);
            });
        }
    }
}
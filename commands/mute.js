module.exports = {
    name: 'mute',
    description: 'prevents a user from sending any messages in the server',
    execute(message, args) {

        const mutedRole = message.guild.roles.cache.find(role => role.name === 'Nope')
        //this is neat. When you mention someone/something in a message. we can 
        //use the message.mentions() to be able to access though mentions.
        //const memberToBeAdded = messag. 
        const memberToBeAdded = message.mentions.members.first();
        if(!mutedRole || !memberToBeAdded) {
            message.reply('Role or member does not exist');
            message.reply('Make sure to mention the user to make this work')
            return;
        }

        console.log(`Here is the muted role ${mutedRole.name}`);
        console.log(`Here is the member ${memberToBeAdded.user.username}`);
        

        memberToBeAdded.roles.add(mutedRole)
        .then(console.log(`${memberToBeAdded.user.username} now has the ${mutedRole.name}`))
        .catch(console.error)

        
    
        
    }
}
const { Permissions } = require("discord.js");

module.exports = {
    //This command require the use of several objects/terms within discord.
    //The first one is the guild. A guild is commonly refer to as a 'server'
    //within discord. A server is a collection of users and channels.
    //Within the guild or server we need to assess the roles. 
    //In discord ever use is assign a @everybody role. We can add roles
    //that can that can have permission to do things like ban users etc.
    //In this case, we want to assess the @everybody role and for the permissions set 
    //the send_messages to false in order to 'lock down' a channel.
    name: 'lock',
    description: 'lock down a channel to prevent any messages from being sent',
    execute(message, args) {
        const role = message.guild.roles.everyone
        message.channel.overwritePermissions(role,{'SEND_MESSAGE':false})
        .then(console.log('channel locked'))
        .catch(console.error);

    }

}
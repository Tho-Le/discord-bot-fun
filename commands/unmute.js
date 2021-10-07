module.exports = {
    name: 'unmute',
    description: 'unmuted a member to allow them to send messages in discord server',
    execute(message, args) {
        const roleToBeRemove = message.guild.roles.cache.find(role => role.name === 'Nope');
        const memberToBeRemove = message.mentions.members.first();
        if(!roleToBeRemove) {
            console.log('This role does not exist');
            return;
        }
        if(!memberToBeRemove) {
            console.log('This member does not exist');
            return;
        }
        memberToBeRemove.roles.remove(roleToBeRemove)
        .then(console.log(`${memberToBeRemove.user.username} is not longer ${roleToBeRemove.name}`))
        .catch(console.error);
    }
}
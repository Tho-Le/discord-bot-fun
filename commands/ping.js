module.exports = {
    name: 'ping',
    description: 'Replies with Pong', 
    //execute is just a name. can be called anything.
    execute(message, args) {
        console.log('we entered ping.js')
        message.channel.send("```Here is your random gif\nHello!```");
    }
};
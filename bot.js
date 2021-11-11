//One very important thing I have learn while using npm packages is to make sure EVERYTHING
//is up to date. Certain packages I was using became out of date and I was getting errors
//that I wasn't sure why. Eventually I began to suspect that my code was right its just the error
//was from using outdated packages. Once my update my packages, some stuff broke but once I 
//fixed everything my code began to work! Euraka!



// require the needed discord.js classes
const fs = require('fs');

const Discord = require('discord.js');
//This fancy little thing is called destructing
//This allow us to bind variables to properties within the object
//The syntax below is a shortcut since we are using the same variable name
//as the property within. Otherwise we would have to use {Client: clientA}
const { Client, Intents, Message, Collection, Guild, Permissions} = require('discord.js');


const prefix = ('!');



//we store our bots token in a .env file for added projected and added the .env file to
//gitignore.
const dotenv = require('dotenv');
const { createAudioPlayer, joinVoiceChannel } = require('@discordjs/voice');


dotenv.config();

// create a new Discord client
const client = new Client({intents: [Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILDS]});

//Within the client we are adding a new module which in this case is a new collection.
//The collection is Map which sets a string, and 
client.commands = new Collection();




//FS is the file system that is native within node js. What is going on is that we are
//reading all the files within a directory (commands) using readdirsync and assigning that
//to a variable, commandsFiles. To make sure we end up with a collection of only javascript
//files we filter to make sure the file extension ends with .js
//const commandsFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));



// when the client is ready, run this code
// this event will only trigger one time after logging in. This is also vital because
//only after this event will the bot begin to react to information from Discord
//so its imperative to have this.
client.once('ready', () => {
	console.log('Ready!');
    console.log(`Login as ${client.user.tag}`)
});

//read directory returns and array of strings of all the files within the directory.
//We then filter than array to only have files that end in '.js'
const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));


//We obtain the array of files we loop through each file and store it into a collection
commandFiles.forEach(file => {
    //the requires method reads the specific file and returns an object. in this case
    //since the file in question is export an module and that module is an object. It
    //returns that object.
    const command = require(`./commands/${file}`);
    //console.log(command);
    //We then map the command name with the specific command with the command object.
    //The command object is the object of the javascript file contain the specific command.
    client.commands.set(command.name, command);
    console.log(client.commands);
})




/* 
//There are a bunch of listener events we can have the discord bot listen for. Like for
//example on message. which is a popular one like we have on the bottoms. This is
//used for communicating with the bot

//Discord made some changes to this. The bot will no not recieve certain events unless
//we go to the developer portal and enbale it. 
*/
client.on('guildMemberAdd', member  => {
    const channel = client.channels.cache.find(channel => channel.name === 'hello')
    console.log(channel);
    if(channel) {
        console.log('We have reached this in the guildMemberAdd method');
    }
    /*  
    This uses the discord user object. When we concatenate this with a string
    it will instead return the user's method instead of the user object. Handy 
    */

    channel.send(`Welcome to the server ${member.user}`);
    //member.user.send('Welcome to the server!')
});



/* 
//The hello world of discord bot. Set up a new message event where the bot is
//listening on. The msg is and object and we want to get the content of the object.
//if it starts with ping then the bot will reply with pong.
*/

client.on('messageCreate', msg => {
    console.log('We entered message event');

    // msg.guild.roles.cache.find(role => role.name === 'Nope')
    
    


    //msg.client.users.cache.find(user => user.username)
    //find and the user using the username and return the object. This will allow
    //us to add the user to the respective role which in this case will be the muted role.

    //check to see if the message starts with the require prefix or if the message
    //did not originate from the bot. We exit the code early for effieciency.
    if(!msg.content.startsWith(prefix) || msg.author.bot) return;

    //We then split the command using regex. This is also to deal with cases such
    //as commands with arguements or to deal with edge cases such a command with multple
    //spaces/whitespace.
    const args = msg.content.slice(prefix.length).split(/ +/)

    /*     
    //The shift method removes the left most element in the array and returns it.
    //We also want to sure the command is streamline so we turn into lowercase.
    */
    const command = args.shift().toLowerCase();

    /*
    //In all of our command process it all follows the same basic formant.
    //Within the client we create a module called commands. Commands is a collection
    //which maps the command name to the respective js file object which we obtain using
    //the require methond in node.js which runs the js file and returns an object
    //Within the object, we have several things such as a name and description but we
    //also have the execute method which meat of the command. 
    */
    if(command === 'ping') {
        console.log(command);
        client.commands.get('ping').execute(msg,args);
    }
    if(command === 'clear') {
        console.log(args);
        client.commands.get('clear').execute(msg,args);

    }
    if(command === 'roll') {
        console.log(args)
        client.commands.get('roll').execute(msg,args);
    }
    if(command === 'lock') {
        client.commands.get('lock').execute(msg, args);
    }
    if(command === 'mute') {
        client.commands.get('mute').execute(msg,args);
    }
    if(command === 'unmute') {
        client.commands.get('unmute').execute(msg,args);
    }
    if(command === 'tableflip') {
        client.commands.get('tableflip').execute(msg,args);
    }
    if(command === 'weather') {
        client.commands.get('weather').execute(msg, args);
    }
    if(command === 'gif') {
        client.commands.get('gif').execute(msg,args);
    }
    if(command === 'dnd5') {
        client.commands.get('dnd5').execute(msg,args);
    }
    if(command === 'nasa') {
        client.commands.get('nasa').execute(msg,args);
    }
    if(command === 'join') {
        client.commands.get('join').execute(msg,args);
    }
})


// client.on('message', msg => {
//     if(msg.content.startsWith('!delete')) {
//         console.log(msg.content);
//         msg.delete()
//         .then(msg.channel.send("message has been deleted"))
//         .catch(console.error);
//     }
//     else if(msg.content === '!clear') {
//         console.log(msg.content);
//     }
// })






// client.on('message', (interaction) => {
//     if(interaction.content === 'ping') {
//         interaction.reply('pong');
//         console.log('pong');
//     }
// })

// //Message is an object in javascript.
// //An object is used to store key-value pairs.
// const micahfy = () => {
//     client.on('message', msg => {
//         console.log(msg.content);
//     })
// }




// login to Discord with your app's token
client.login(process.env.TOKEN);







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


dotenv.config();

// create a new Discord client
const client = new Client();

//Within the client we are adding a new module which in this case is a new collection.
//The collection is Map which sets a string, and 
client.commands = new Collection();

const guild = new Guild()



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
    console.log(command);
    //We then map the command name with the specific command with the command object.
    //The command object is the object of the javascript file contain the specific command.
    client.commands.set(command.name, command);
    console.log(client.commands);
})









//The hello world of discord bot. Set up a new message event where the bot is
//listening on. The msg is and object and we want to get the content of the object.
//if it starts with ping then the bot will reply with pong.
client.on('message', msg => {

    //check to see if the message starts with the require prefix or if the message
    //did not originate from the bot. We exit the code early for effieciency.
    if(!msg.content.startsWith(prefix) || msg.author.bot) return;

    //We then split the command using regex. This is also to deal with cases such
    //as commands with arguements or to deal with edge cases such a command with multple
    //spaces/whitespace.
    const args = msg.content.slice(prefix.length).split(/ +/)

    //The shift method removes the left most element in the array and returns it.
    //We also want to sure the command is streamline so we turn into lowercase.
    const command = args.shift().toLowerCase();

    //In all of our command process it all follows the same basic formant.
    //Within the client we create a module called commands. Commands is a collection
    //which maps the command name to the respective js file object which we obtain using
    //the require methond in node.js which runs the js file and returns an object
    //Within the object, we have several things such as a name and description but we
    //also have the execute method which meat of the command.
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







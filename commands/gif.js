const fetch = require('node-fetch');

const {MessageEmbed} = require('discord.js');


module.exports = {
    name: 'gif',
    description: 'obtain a random gif from giphy',
    async execute(message, args) {
        let URL = 'https://api.giphy.com/v1/gifs/random?api_key=LlPEsADgxJvXA4RKcumfqvI6jY5vdHIF'
        let tag = '&tag='
        let rating = '&rating='
        
        //Here we are constructing the URL so we can call the api and retrieve a random gif
        //In in the random api, we can add tags and the api will search select a random gif
        //that contains that api.
        if(args.length > 1) {
            message.channel.send('Do not use more than 1 parameter');
            return;
        }
        //Here we check to see if the user has supply a tag argument. If we do
        //Then we need to combine the api url with the tag and create a new one.
        if(args.length === 1) {
            tag = tag + args[0];
            URL = URL + tag;
        }
        
        const gif = await fetch(URL)
        .then(response => response.json())
        .catch(console.error);
        //console.log(gif);
        /* 
        Discord has a simple markdown language than can be use to format messages to 
        give them structure or to make them look neater.

         */

        const messageEmbed = new MessageEmbed()
        .setTitle(gif.data.title)
        .setURL(gif.data.url)
        .setImage(gif.data.image_url)
        .setAuthor(gif.data.username)
        .setTimestamp();
        //console.log(gif.data.image_url);
        //console.log(gif);
        message.channel.send(messageEmbed);
    }
}
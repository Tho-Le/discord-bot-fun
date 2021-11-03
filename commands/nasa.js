const fetch = require('node-fetch')

const {MessageEmbed} = require('discord.js')

module.exports = {
    name: 'nasa',
    description: 'Uses the NASA api to obtain images or data depending on the parameters given',
    async execute(message, args) {
        const astronomeyPic = await fetch('https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY ')
        .then(response => response.json())
        .catch(console.error)
        console.log(astronomeyPic)

        const astronomeyPicEmbed = new MessageEmbed()
        .setTitle(astronomeyPic.title)
        .setDescription(astronomeyPic.explanation)
        .setImage(astronomeyPic.url)
        .setAuthor(astronomeyPic.copyright)
        .setURL(astronomeyPic.hdurl)
        .setTimestamp()

        message.channel.send(astronomeyPicEmbed)
        .then(console.log('astronomy pic send succuessfully'))
        .catch(console.error)
        


    }
}
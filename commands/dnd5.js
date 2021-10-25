const fetch = require('node-fetch');

const {MessageEmbed} = require('discord.js');

module.exports = {
    name: 'dnd5',
    description: 'return a help from all',
    async execute(message, args) {
        // const dnd5help = await fetch('https://api.open5e.com/')
        // .then(response => response.json())
        // .catch(console.error);
        if(args.length === 0) {
            const dndGuideEmbed = new MessageEmbed()
            .setTitle('DND Help')
            .addFields(
                {name: 'Spells', value: 'A spell is a discrete magical effect, defined in specific language. A spell has specific things like a name, a defined range, and required components'},
                {name: 'Monsters'},
                {name: 'Documents'},
                {name: 'Backgrounds'},
                {name: 'Planes'},
                {name: 'Sections'},
                {name: 'Feats'},
                {name: 'Condition'},
                {name: 'Races'},
                {name: 'Classes'},
                {name: 'Magic Items', value: 'Magic items offer a variety of fantastic effects to improve your characters capabilities, ranging from simple and silly like a cup that never runs out of mead to a Circlet of Blasting that can incinerate your foes'},
                {name: 'Weapons'},
                {name: 'Search'}
            );
            message.channel.send(dndGuideEmbed);
        }
        else if(args[0] === 'spells') {
            let spellsURL = 'https://www.dnd5eapi.co/api/spells/'
            if(args.length === 2) {
                spellsURL += args[1]
                const dnd5Spells = await fetch(spellsURL)
                .then(response => response.json())
                .catch(console.error)
                if(dnd5Spells.hasOwnProperty('error')) {
                    message.channel.send('That does not exist')
                    .then(console.log('message send successfully'))
                    .catch(console.error)

                }
                const spellEmbed = new MessageEmbed()
                .setColor('#3498DB')
                .setTitle(dnd5Spells.name)
                .setDescription(dnd5Spells.desc)
                .addFields(
                    {name: 'Range', value: dnd5Spells.range},
                    {name: 'Materials Needed', value: dnd5Spells.material},
                    {name: 'Duration', value: dnd5Spells.duration},
                    {name: 'Casting Time', value: dnd5Spells.casting_time},
                )
                message.channel.send(spellEmbed)
                .then(console.log('message embed send successfully'))
                .catch(console.error);
                return
                
                
            }
            const dnd5Spells = await fetch(spellsURL)
            .then(response => response.json())
            .catch(console.error);
            //We now have the json object contain all the spells.
            let spells = ''
            //The json object has a few properties. But the one we are most
            //interest is the result property which is an array of json objects
            //and in this case an array of 'spells'
            dnd5Spells.results.forEach(spell => {
                //the discord api restricts sending message that are over 2000.
                //so we check the length and send it before it gets to large.
                if(spells.length > 1500) {
                    message.channel.send(spells)
                    .then(spells = '')
                    .catch(console.error)
                }
                spells += spell.name + ', '
            })
            message.channel.send(spells)
            .then(console.log('message was send successfully'))
            .catch(console.error);
        }
        else if(args[0] === 'monsters') {
            let monsterURL = 'https://www.dnd5eapi.co/api/monsters/';
            if(args.length === 2) {
                monsterURL += args[1];
                const dnd5Monsters = await fetch(monsterURL)
                .then(response => response.json())
                .catch(console.error);
                console.log(dnd5Monsters.name);
                const monsterEmbed = new MessageEmbed()
                .setTitle(dnd5Monsters.name)
                .addFields(
                    {name: `${dnd5Monsters.special_abilities[0] === undefined ? 'None' : dnd5Monsters.special_abilities[0].name}`
                , value: `${dnd5Monsters.special_abilities[0] === undefined ? 'None' : dnd5Monsters.special_abilities[0].desc}`},
                    {name: `${dnd5Monsters.special_abilities[1] === undefined ? 'None' : dnd5Monsters.special_abilities[1].name}`
                , value: `${dnd5Monsters.special_abilities[1] === undefined ? 'None' : dnd5Monsters.special_abilities[1].desc}`},
                    {name: `${dnd5Monsters.special_abilities[2] === undefined ? 'None' : dnd5Monsters.special_abilities[2].name}`
                , value: `${dnd5Monsters.special_abilities[2] === undefined ? 'None' : dnd5Monsters.special_abilities[2].desc}`},
                    {name: `${dnd5Monsters.special_abilities[3] === undefined ? 'None' : dnd5Monsters.special_abilities[3].name}`
                , value: `${dnd5Monsters.special_abilities[3] === undefined ? 'None' : dnd5Monsters.special_abilities[3].desc}`},
                )
                

                message.channel.send(monsterEmbed)
                .then(console.log('Message Send Successfully'))
                .catch(console.error)
                return;
            }
            let strMonsters = '';
            const dnd5Monsters = await fetch(monsterURL)
            .then(response => response.json())
            .catch(console.error)
            dnd5Monsters.results.forEach(monster => {
                if(strMonsters.length > 1500) {
                    message.channel.send(strMonsters)
                    .then(console.log('Message send successfully'))
                    .catch(console.error);
                    strMonsters = '';
                }
                //console.log(monster.name);
                strMonsters += monster.name + ', '
            })
            message.channel.send(strMonsters)
            .then(console.log('Message Send Successfully'))
            .catch(console.error);
            

        }

        
    }
}
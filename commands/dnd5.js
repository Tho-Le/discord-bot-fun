const fetch = require('node-fetch');

const {MessageEmbed} = require('discord.js');

const racesDesc = require('./resources/dnd5Races')




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
                {name: 'Monsters', value: 'sdasdasd'},
                {name: 'Documents', value: 'asdasdasdasdasd'},
                {name: 'Backgrounds', value: 'asdasdasdasd'},
                {name: 'Planes', value: 'erererasd'},
                {name: 'Sections', value: 'asdasdasdasdasd'},
                {name: 'Feats', value: 'asdasdasdasd'},
                {name: 'Condition' , value: 'asdasdasdasdas'},
                {name: 'Races', value: 'jasjkdhjaskdj'},
                {name: 'Classes', value: 'asdasdasdasd'},
                {name: 'Magic Items', value: 'Magic items offer a variety of fantastic effects to improve your characters capabilities, ranging from simple and silly like a cup that never runs out of mead to a Circlet of Blasting that can incinerate your foes'},
                {name: 'Weapons', value: 'asdasdasdasd'},
                {name: 'Search', value: 'asdasdasdasd'}
            );
            message.channel.send({embeds: [dndGuideEmbed]});
        }
        else if(args[0].toLowerCase() === 'spells') {
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
                message.channel.send({embeds:[spellEmbed]})
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
        else if(args[0].toLowerCase() === 'monsters') {
            let monsterURL = 'https://www.dnd5eapi.co/api/monsters/';
            if(args.length === 2) {
                monsterURL += args[1];
                const dnd5Monsters = await fetch(monsterURL)
                .then(response => response.json())
                .catch(console.error);
                if(dnd5Monsters.hasOwnProperty('error')) {
                    message.channel.send('Monster does not exist. Make sure the spelling is correct')
                    .then(console.log('Message was send successfully'))
                    .catch(console.error);
                    return;
                }
                console.log(dnd5Monsters.name);
                const monsterEmbed = new MessageEmbed()
                //.setAuthor(dnd5Monsters.name)
                .setTitle(dnd5Monsters.name)
                .addFields(
                    //Hp of the monster
                    {name: 'Hit Points', value: dnd5Monsters.hit_points},
                    {name: 'Alignnment', value: dnd5Monsters.alignment},
                    {name: 'Challenge Rating', value: dnd5Monsters.challenge_rating},

                    //There are the special abilities of the monsters
                    {name: 'Special Traits', value : 'These are the characteristics/special abilities that the monster has'},
                    {name: `${dnd5Monsters.special_abilities[0] === undefined ? 'None' : dnd5Monsters.special_abilities[0].name}`
                , value: `${dnd5Monsters.special_abilities[0] === undefined ? 'None' : dnd5Monsters.special_abilities[0].desc}`,inline: true},
                    {name: `${dnd5Monsters.special_abilities[1] === undefined ? 'None' : dnd5Monsters.special_abilities[1].name}`
                , value: `${dnd5Monsters.special_abilities[1] === undefined ? 'None' : dnd5Monsters.special_abilities[1].desc}`,inline:true},
                    {name: `${dnd5Monsters.special_abilities[2] === undefined ? 'None' : dnd5Monsters.special_abilities[2].name}`
                , value: `${dnd5Monsters.special_abilities[2] === undefined ? 'None' : dnd5Monsters.special_abilities[2].desc}`,inline: true},
                    {name: `${dnd5Monsters.special_abilities[3] === undefined ? 'None' : dnd5Monsters.special_abilities[3].name}`
                , value: `${dnd5Monsters.special_abilities[3] === undefined ? 'None' : dnd5Monsters.special_abilities[3].desc}`,inline: true},

                //These are the actions of the monster
                {name: 'Monster Actions', value: 'There are the type of actions that the monster can use'},
                    {name: `${dnd5Monsters.actions[0] === undefined ? 'None' : dnd5Monsters.actions[0].name}`
                , value: `${dnd5Monsters.actions[0] === undefined ? 'None' : dnd5Monsters.actions[0].desc}` ,inline: true},
                    {name: `${dnd5Monsters.actions[1] === undefined ? 'None' : dnd5Monsters.actions[1].name}`
                , value: `${dnd5Monsters.actions[1] === undefined ? 'None' : dnd5Monsters.actions[1].desc}`, inline: true},
                    {name: `${dnd5Monsters.actions[2] === undefined ? 'None' : dnd5Monsters.actions[2].name}`
                , value: `${dnd5Monsters.actions[2] === undefined ? 'None' : dnd5Monsters.actions[2].desc}`, inline: true},
                    {name: `${dnd5Monsters.actions[3] === undefined ? 'None' : dnd5Monsters.actions[3].name}`
                , value: `${dnd5Monsters.actions[3] === undefined ? 'None' : dnd5Monsters.actions[3].desc}`,inline: true},
                    {name: `${dnd5Monsters.actions[4] === undefined ? 'None' : dnd5Monsters.actions[4].name}`
                , value: `${dnd5Monsters.actions[4] === undefined ? 'None' : dnd5Monsters.actions[4].desc}`,inline: true},
                    {name: `${dnd5Monsters.actions[5] === undefined ? 'None' : dnd5Monsters.actions[5].name}`
                , value: `${dnd5Monsters.actions[5] === undefined ? 'None' : dnd5Monsters.actions[5].desc}`,inline: true},
                    {name: `${dnd5Monsters.actions[6] === undefined ? 'None' : dnd5Monsters.actions[6].name}`
                , value: `${dnd5Monsters.actions[6] === undefined ? 'None' : dnd5Monsters.actions[6].desc}`,inline: true},

                )
                

                message.channel.send({embeds: [monsterEmbed]})
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
        else if(args[0].toLowerCase() === 'races') {
            let racesURL = 'https://www.dnd5eapi.co/api/races/';
            if(args.length == 2) {
                racesURL += args[1];
                const dnd5Race = await fetch(racesURL)
                .then(response => response.json())
                .catch(console.error);
                if(dnd5Race.hasOwnProperty('error')) {
                    message.channel.send('Error')
                    .then(console.log('Error message send successfully'))
                    .catch(console.error);
                    return;
                }
                console.log(racesDesc.races.get(args[1]));
                console.log(dnd5Race);
                let raceEmbed = new MessageEmbed()
                .setTitle(dnd5Race.name.toString())
                .setDescription(racesDesc.races.get(args[1]));
                // .addFields(
                //     {name: 'Age', value: dnd5Race.age},
                //     {name: 'Alignment', value: dnd5Race.alignment},
                //     {name: 'Size', value: dnd5Race.size},
                //     {name: 'Speed', value : dnd5Race.speed}
                // )
                message.channel.send({embeds:[raceEmbed]})
                .then(console.log('Race Embed sent successfully'))
                .catch(console.error)
                return;
            }
            let strRaces = '';
            const dnd5Races = await fetch(racesURL)
            .then(response => response.json())
            .catch(console.error)

            dnd5Races.results.forEach(race => {
                console.log(race);
                strRaces += race.name + ', ';
            })
            message.channel.send(strRaces)
            .then(console.log('Races message sent successfully'))
            .catch(console.error)

        }
        else if(args[0] === 'classes') {
            let classesURL = 'https://www.dnd5eapi.co/api/classes/';
        }
        else if(args[0] === 'features') {
            let featuresURL = 'https://www.dnd5eapi.co/api/features/';
        }
        else if(args[0] === 'equipment') {
            let equipmentURL = 'https://www.dnd5eapi.co/api/equipment';
        }
        else if(args[0] === 'traits') {
            let traitsURL = 'https://www.dnd5eapi.co/api/traits/'
        }



        
    }
}
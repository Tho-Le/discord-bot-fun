//const { checkForNaN } = require("../helper functions/helper_functions");

module.exports = {
    name: 'roll',
    description: 'roll an x-side die y number of times',
    execute(message, args) {
        if(args.length > 3) {
            message.reply('To many arguments');
            message.reply('Example: !roll 2 3. This rolls 2 3 side dices')
        }
        else if(args.length === 0){
            //a 20 side die is a very common die used in D&D. If the person
            //use a !roll with no arguments it will default to 1 20 sided dice roll.
            const result = Math.floor(Math.random() * 20 + 1);
            message.reply(`You rolled a ${result}`);
        }
        else if(checkForNaN(args)) {
            message.reply('Please input a valid number');
        }
        else if(args.length === 1) {
            const dieNumberSide = Number(args[0]);
            if(isNaN(dieNumberSide)) {
                message.reply(`The input is not a valid number`);
                return;
            }
            const result = Math.floor(Math.random() * dieNumberSide + 1);
            message.reply(`You rolled a ${result}`);
        }
        else if(args.length === 2) {
            const numsOfRoll = Number(args[0]);
            const dieNumberSide = Number(args[1]);
        }
    }
}
const checkForNaN = (args) => {
    args.forEach(num => {
        if(isNaN(Number(num))) {
            return true;
        }
        
    })
    return false;
}
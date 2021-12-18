const alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('')
module.exports = {
    name: 'descramble',
    description: 'makes the sentense that has been modified by the gibberish command by the the original sentence/string. Though you can also descramble a regular string too though it will not make sense',
    execute(msg, args) {
        let message = '';
        console.log(args);
        for (let word = 0; word < args.length; word++) {;
            const currentWord = args[word];
            console.log(currentWord)
            for (let wordIdx = 0; wordIdx < currentWord.length; wordIdx++) {
                const newLetter = alphabet[(currentWord.charCodeAt(wordIdx) - 'a'.charCodeAt(0) + 16) % 26]
                message += newLetter;
            }
            message += ' ';
        }
        console.log('descrambled message');
        console.log(message);
    }
}
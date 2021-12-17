const alphabet = 'abcdefghijklmnopqrstuvwxyz'.split(''); //easy way to get array of alphabets
//One thing I learn about javascript is that when using forEach, a return statement DOES NOT EXIT THE FUNCTION. This is something to do with the callbacks in forEach. It return to the callback then the foreach continues
//to traverse.
module.exports = {
    name: 'gibberish',
    description: 'scrambles the given text',
    execute(message, args) {
        let newMessage = '';
        for(let wordIdx = 0; wordIdx < args.length; wordIdx++) {
            const alpha = args[wordIdx];
            for (let index = 0; index < alpha.length; index++) {
                console.log(alpha);
                const newAlphaIdx = (alpha.charCodeAt(index) - 'a'.charCodeAt(0) + 10) % 26
                if(newAlphaIdx < 0 || newAlphaIdx > 25) {
                    message.channel.send('Please send a message with only letters')
                    .then(console.log('message send successfully'))
                    .catch(console.error);
                    return;
                }
                const newAlpha = alphabet[newAlphaIdx];
                console.log(newAlpha)
                newMessage += newAlpha;
            }
            newMessage += ' ';
        }
        message.channel.send(newMessage)
        .then(console.log('the gibberished message was send successfully'))
        .catch(console.error);
    }
}


// console.log(alphabet);
// let stri = 'hello';
// const newAlpha = (stri.charCodeAt(0) - 'a'.charCodeAt(0)) % 26;
// console.log(alphabet[newAlpha])
// console.log(newAlpha);
// // let ar = ['Hello', 'I', 'am', 'something'];
// // ar.forEach(element => {
// //     let str = '';
// //     for(let index = 0; element.length; index++) {

// //     }
// // })
// for (let index = 0; index < stri.length; index++) {
//     let newAlpha = stri[index];
    
// }
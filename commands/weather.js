const fetch = require('node-fetch')

const key = '1d19f0d1c177d114ea52c513a68f550d'

module.exports = {
    name: 'weather',
    description: 'makes an api call and displays the weather',
    async execute(message, args) {
        const weather = await fetch('http://api.openweathermap.org/data/2.5/weather?q=amarillo&appid=1d19f0d1c177d114ea52c513a68f550d')
        .then(response => response.json())
        .catch(console.error)
        const city = weather.name;
        const tempInKelvin = parseInt(weather.main.temp);
        const weatherInFarenheit = (tempInKelvin - 273.15) * 9 / 5 + 32
        message.channel.send(`The weather is ${Math.floor(weatherInFarenheit)} in ${city}`);

    }
}

const fetch = require('node-fetch');

module.exports = {
    name: "advice",
    description: "Get some advice",
    args: false,
    execute(message, args) {
        message.channel.startTyping();
        fetch('https://api.adviceslip.com/advice', {method: "Get"}).then((res) => res.json()).then((json) => {
            message.channel.send(`"${json.slip.advice}"`)
            message.channel.stopTyping();
        })
    }
}
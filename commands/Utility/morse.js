const Discord = require('discord.js')
const morse = require('morse-code-encoder-and-decoder');
const morseCheckerRegex = /(\.|-| )/g;

function morser(func, toDo) {
  if(func == "encode") {
    return morse.encode(toDo);
  } else if(func == "decode") {
    return morse.decode(toDo);
  } else {
    return false;
  }
}

module.exports = {
    name: 'morse',
    description: 'Encrypt or Decrypt messages in morse code to send to your friends!',
    args: true,
    usage: '<encode/decode> <morse/message>',
    execute(message, args) {
      const prefix = message.prefix;

      if(args[0] == "encode") {
        let whatToDo = prefix + 'morse encode ';
        let givingToDo = message.content.replace(whatToDo, '');
        message.channel.send(morser("encode", givingToDo));
      } else if(args[0] == "decode") {
        let whatToDo = config.prefix + 'morse decode ';
        let givingToDo = message.content.replace(whatToDo, '');

        if(morseCheckerRegex.test(givingToDo)) {
          message.channel.send("Invalid morse")
        } else if(morseCheckerRegex.test(givingToDo) == true) {
          message.channel.send(morser("decode", givingToDo));
        }
      } else {
        message.channel.send("I can't do that with morse code!");
      }
    }
}

const mongoose = require('mongoose');
const cM = require('../../models/cmdInfo.js');
const Discord = require('discord.js');
const { on } = require('../../models/cmdInfo.js');
let beta = true;
const fetch = require('node-fetch');
const flagHandler = require('../../flagLib/mainLib');


function isInBeta(beta) {
    switch(beta) {
        case true:
            return "is in beta, so please report all errors/missing commands to Josh or Chase";
            break;
        case false:
            return "is not in beta, so report this to Josh or Chase ASAP";
            break;
    }
};

const notFoundEm = new Discord.MessageEmbed()
    .setTitle("Oh no!")
    .setDescription("It seems we can't find the requested command")
    .addField("If you weren't expecting this... ", "Make sure you typed in the command properly:\n.Commands must start with their prefix (usually / or //)\n.Commands must not have any args\n.Commands must be called in this format: docs minecraft get <commandWithPrefix>\nNote that this command " + isInBeta(beta))
    .addField("If you WERE expecting this... ", "Ask chase about adding commands.")
    .setColor("RED")
    .setFooter("Onionbot Devs")
//export

module.exports = {
    name: "docs",
    description: "Search multiple developer docs & commands",
    args: true,
    usage: "<docsname> <get/add/edit> <name> <attribute> <newAttribute>",
    async execute(message, args, client) {
        const flagMain = new flagHandler.Flags(args);

        //Find the requested minecraft command info document:
        let cmdDoc = await cM.findOne({title: args[2]}).exec().then(res => res);

        //For minecraft command docs:
        if(args[0] === 'minecraft') {
            if(args[1] == "get") {
                //Making sure it found the doc:
                if(!cmdDoc) {
                    message.channel.send(notFoundEm);
                } else {
                    let builderEm = new Discord.MessageEmbed()
                        .setTitle(cmdDoc.title)
                        .setDescription(cmdDoc.description)
                        .addField("Plugin:", cmdDoc.plugin)
                        .addField("Usage:", cmdDoc.usage)
                        .addField("Tags:", cmdDoc.tags)
                        .addField("Complexity:", cmdDoc.complexity)
                        .setThumbnail(cmdDoc.image)
                        .setColor("ORANGE")
                        .setTimestamp(message.createdAtTimestamp)
                    message.channel.send(builderEm);
                }
            } else if(args[1] == "edit") {
                if(!cmdDoc) {
                    message.channel.send(notFoundEm)
                } else {
                    //Update changes
                    if(args[3] === "tags"){
                        //If tags is undefined, set the entire tag vallue, otherwise, append it
                        cmdDoc.tags == "undefined" ? cmdDoc.tags = args[4] : cmdDoc.tags = cmdDoc.tags + " " + args[4];
                    } else {
                        cmdDoc[3] = args.slice(4).join(' ');
                    }
                    //Save changes
                    await cmdDoc.save();
                    //Find new one
                    let cmdDocN = await cM.findOne({title: args[2]}).exec().then(res => res);

                    let builderEmN = new Discord.MessageEmbed()
                        .setTitle(cmdDocN.title)
                        .setDescription(cmdDocN.description)
                        .addField("Plugin:", cmdDocN.plugin)
                        .addField("Usage:", cmdDocN.usage)
                        .addField("Tags:", cmdDocN.tags)
                        .addField("Complexity:", cmdDocN.complexity)
                        .setThumbnail(cmdDocN.image)
                    //Send:
                    message.channel.send("Updated changes, here is the new content:", builderEmN);
                }
            } else if(args[1] == "add") {
                if(!message.member.roles.cache.has('751632943935651940') && message.member.permissions.cache.has("ADMINISTRATOR")) {
                    return message.channel.send("You cannot do that without the Onionkraft role!");
                };

                let filter = m => message.author == m.author;
                let buildCollector = message.channel.createMessageCollector(filter, {time: "60000"});
                let onPart = 1;
                let addingObject = {};
                let finishedEarly = false;
                message.channel.send("Starting the building process...");
                message.channel.send("Type !!stop to stop at any time, start with the command name (/commandName):")
                buildCollector.on('collect', async m => {
                    if(m.content.includes("!!stop")) {
                        message.channel.send("Ending process....");
                        buildCollecor.stop();
                        message.channel.send("Stopped!");
                        return;
                    } else {
                        switch(onPart) {
                            case 1:
                                addingObject.title = m.content;
                                message.channel.send("Added part properly. Now add the description:");
                                break;
                            case 2:
                                addingObject.description = m.content;
                                message.channel.send("Added part properly. Now add the plugin name (Make sure its name is captialized):");
                                break;
                            case 3:
                                addingObject.plugin = m.content;
                                message.channel.send("Added part properly. Now add the usage (Remember that <> means required argument, while [] means optional):");
                                break;
                            case 4:
                                addingObject.usage = m.content;
                                message.channel.send("Added part properly. Now add the complexity (complexity/10):");
                                break;
                            case 5:
                                addingObject.complexity = m.content;
                                message.channel.send("Added part properly. Now add the image link for the plugin/mojang studios icon (Tags can be added manually later):");
                                break;
                            case 6:
                                addingObject.image = m.content;
                                message.channel.send("Added all parts properly. Would you like to save this? (Y/N)");
                                break;
                            case 7:
                                if(m.content.toUpperCase() === "Y") {
                                    message.channel.send("Building tag.... (If it's stopped here for a while, it's probably an error)");
                                    let prototypeBuild = new Discord.MessageEmbed()
                                        .setTitle(addingObject.title)
                                        .setDescription(addingObject.description)
                                        .addField("Plugin:", addingObject.plugin)
                                        .addField("Usage:", addingObject.usage)
                                        .addField("Tags:", addingObject.tags)
                                        .addField("Complexity:", addingObject.complexity)
                                    message.channel.send("Built tag!", prototypeBuild);
                                    message.channel.send("Assigning values & Updating database...");
                                    const cmdTagAdd = new cM({title: addingObject.title, description: addingObject.description, usage: addingObject.usage, image: addingObject.image, complexity: addingObject.complexity});
                                    await cmdTagAdd.save();
                                    message.channel.send("Updated!, new tag has been added!");
                                } else {
                                    message.channel.send("Ended...");
                                    buildCollecor.stop();
                                }
                        }
                        onPart = onPart + 1;
                    }
                });
                buildCollector.on("end", collected => {
                    message.channel.send("Ended the process!");
                });

            }
        } else if(args[0] === 'discord') {
          if(args[1] === 'get') {
            message.channel.startTyping();
            let getArray = message.content.replace(`${message.prefix}docs discord get `, "");
            let query = getArray;
            if(!query) query = args.splice(3);
            let src;
            let currentFlagObj = flagMain.getObj();
            if(!currentFlagObj) {
                src = "stable";
            } else {
                src = currentFlagObj.src;
                query = getArray.replace(`--src=(${currentFlagObj.src})`, "");
            }
            if(!src) src = "stable";
            if(!query) {
              return message.channel.send("You need a query.");
            }
            let queryUrl = `https://djsdocs.sorta.moe/v2/embed?src=${src.toLowerCase()}&q=${query}`
            let settings = { method: "Get" };
            fetch(queryUrl, settings).then(res => res.json()).then((json) => {
              if(!json) return message.channel.send("It seems that the specific request couldn't be found....")
              if(json.status) {
                return message.channel.send(`\`${json.status} ERROR\`\n${json.message}`);
              }
              message.channel.stopTyping();
              let finEmbed = new Discord.MessageEmbed()
                .setTitle("Results:")
                .setAuthor(json.author.name, json.author.icon_url.toString(), json.author.url.toString())
                .setColor(json.color)
                .setDescription(json.description)
              message.channel.send(finEmbed);

            });
          } else {
            message.channel.send("You cannot do that with the discord.js documentation.");
          }



        } else if(args[0] === "mdn") {
            if(args[1].toUpperCase() !== "GET") return message.channel.send("You cannot do that with the MDN docs");

            await message.channel.startTyping();
            let getArray = message.content.replace(`${message.prefix}docs mdn get `, "").split(" | ");
            let query = getArray[0];
            let pgNum = 1;
            if(getArray[1]) {
                pgNum = getArray[1];
            }
            let queryUrl = `https://developer.mozilla.org/api/v1/search/en-US?page=${pgNum}&q=${query}&highlight=false`;

            let settings = { method: "Get" }
            

            fetch(queryUrl, settings).then(res => res.json()).then((json) => {
                try {
                    let resultsEmbed = new Discord.MessageEmbed()
                        .setAuthor(`Results for: ${query}`, 'https://cdn.discordapp.com/emojis/752316461061767170.png?v=1')
                        .setTitle("MDN Docs Search")
                        .setURL('https://developer.mozilla.org/en-US/docs/Web/Reference')
                        .setThumbnail('https://developer.mozilla.org/static/img/opengraph-logo.72382e605ce3.png')
                        .addFields(
                            {name: `${json.documents[0].title}`, value: `${json.documents[0].excerpt}\n[LINK](https://developer.mozilla.org/en-US/docs/${json.documents[0].slug})`},
                            {name: `${json.documents[1].title}`, value: `${json.documents[1].excerpt}\n[LINK](https://developer.mozilla.org/en-US/docs/${json.documents[1].slug})`},
                            {name: `${json.documents[2].title}`, value: `${json.documents[2].excerpt}\n[LINK](https://developer.mozilla.org/en-US/docs/${json.documents[2].slug})`},
                            {name: `${json.documents[3].title}`, value: `${json.documents[3].excerpt}\n[LINK](https://developer.mozilla.org/en-US/docs/${json.documents[3].slug})`}
                        )
                        .setColor("BLUE")
                        .setFooter(`Out of ${json.pages} pages. Use append " | <pageNum>" to the command for a specific page`)
                        .setTimestamp()
                    message.channel.send(resultsEmbed);
                } catch (error) {
                    message.channel.stopTyping();
                    return message.channel.send("No results found.")
                }
            });

        }
        message.channel.stopTyping();







    }
}

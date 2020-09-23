const Discord = require("discord.js");
const fetch = require('node-fetch');


module.exports = {
    name: "news",
    description: "Find any news article with an advanced search system",
    args: true,
    usage: "<publication> <query> | [page]",
    execute(message, args) {
        message.channel.startTyping();

        let invalidThings = {"query": "You need a search query", "publication": "You need a publication!\nThe current publications are:\n. The New York Times (key: NYT)\n. Basic News (key: BN)"}
        let validPublications = ["BN", "NYT"];
        let data = args.slice(1).join(' ').split(" | ");
        let wantsPage = false;
        if(data[1]) wantsPage = true;
        let publication = args[0];
        let query = data[0];
        if(!validPublications.includes(publication.toUpperCase())) return message.channel.send(invalidThings.publication);
        if(!query) return message.channel.send(invalidThings.query);
        if(publication.toUpperCase() === "BN") {
            let queryUrl = `http://newsapi.org/v2/everything?q=${query}&sortBy=relevancy&apiKey=db6ab79ac54343a1b29faa04df6ae4a2`;
            let settings = { method: "Get" };

            fetch(queryUrl, settings).then(res => res.json()).then((json) => {
                let articleFinalSend = ""
                if(!json) articleFinalSend = "It seems that the specific request couldn't be found....";
                let article = null;
                if(wantsPage) {
                    article = json.articles[data[1]];
                } else {
                    article = json.articles[0];
                }
                articleFinalSend = new Discord.MessageEmbed()
                    .setAuthor(`Results for: ${data[0]}`, "https://images.apilist.fun/news_api.png")
                    .setTitle(article.title)
                    .setURL(article.url)
                    .setThumbnail(article.urlToImage)
                    .setDescription(article.description)
                    .setColor("AQUA")
                    .setTimestamp(article.publishedAt)
                    .setFooter(`From: ${article.source.name} | Out of: ${json.totalResults} results`)
                message.channel.send(articleFinalSend);
                message.channel.stopTyping();
            });
        } else if(publication.toUpperCase() === "NYT") {
            let queryUrl = `https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${query}&api-key=E4BSEQIZ41ExTQAz3cOu5Iy4pYcxBB35`
            let settings = { method: "Get" };

            fetch(queryUrl, settings).then(res => res.json()).then((json) => {
                let articleFinalSend = ""
                if(!json) articleFinalSend = "It seems that the specific request couldn't be found....";
                let article = null;
                if(wantsPage) {
                    article = json.response.docs[data[1]];
                } else {
                    article = json.response.docs[0];
                }

                let mediaLink = null;
                if(!article.multimedia[0]) mediaLink = `https://aerglos.is-inside.me/KDJcmtfZ.png`;
                if(article.multimedia[0]) mediaLink = `https://static01.nyt.com/${article.multimedia[0].url}`;
                let title = article.headline.main;
                articleFinalSend = new Discord.MessageEmbed()
                    .setAuthor(`Results for: ${data[0]}`, "https://aerglos.is-inside.me/Fa4r4h1V.png")
                    .setTitle(title)
                    .setURL(article.web_url)
                    .setThumbnail(mediaLink)
                    .setDescription(article.abstract)
                    .setColor("BLACK")
                    .setFooter(`${article.byline.original} | Out of: ${article.print_page} pages`)
                message.channel.send(articleFinalSend);
                message.channel.stopTyping();
                    
            })
        }
        message.channel.stopTyping();
    }
}
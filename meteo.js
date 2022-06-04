const { MessageEmbed } = require('discord.js');
const weather = require('weather-js');

module.exports = {
    run: async (client, message, args) => {
        if(args.length === 0){
            const embed = new MessageEmbed()
            .setTitle("Error :cry:")
            .setDescription("Entre une ville valide !")
            .setColor("RANDOM")
            .setTimestamp();
                return message.channel.send({ embeds : [embed]});
        }
        
        weather.find({ search: args.join(" "), degreeType: 'C'}, function(err, result) {
          
        if(result.length === 0){
            const embedM = new MessageEmbed()
            .setTitle("Error :cry:")
            .setDescription(" Entre une ville valide !")
            .setColor("RANDOM")
            .setTimestamp();
                return message.channel.send({ embeds : [embedM]});
        }
        
          var current = result[0].current;
          var location = result[0].location;
            if (err) {
            const embedM = new MessageEmbed()
            .setTitle("Error :cry:")
            .setDescription(" Entre une ville valide !")
            .setColor("RANDOM")
            .setTimestamp();
                return message.channel.send({ embeds : [embedM]});
            }
        
            
            const embed = new MessageEmbed()
            .setDescription(`**${current.skytext}**`)
            .setFooter({text:`Météo de ${current.observationpoint}`, iconURL: `${message.guild.id}`, iconURL: message.guild.iconURL({dynamic: true})})
            .setThumbnail(current.imageUrl)
            .setColor("RANDOM")
            .addField('Timezone', `UTC${location.timezone}`, true)
            .addField('Type de degré', location.degreetype, true)
            .addField('Temperature', `${current.temperature} Degrees`, true)
            .addField('Ressentit', `${current.feelslike} Degrees`, true)
            .addField('Vent', current.winddisplay, true)
            .addField('Humidité', `${current.humidity}%`, true)
            .setTimestamp();
            message.channel.send({ embeds : [embed]});
        }); 
    
    },

    name: 'meteo',
    aliases: [],
    description: "Commande meteo"
}
const Discord = require('discord.js');

module.exports.run = (client, message) => {
  var mod = require('../../configs/vars');//importe les variables relatives au jeu depuis le fichier main.js.
  var list = require('../../configs/lists');
  const popsauce = client.channels.cache.find(channel => channel.name === 'popsauce');//l'id du salon salon nomé join-start es stocké dans la variable popsauce.
  const joinstart = client.channels.cache.find(channel => channel.name === 'join-start');//l'id du salon salon nomé join-start es stocké dans la variable joinstart.
  var p = mod.Players.includes(message.author.id);//la variable p vaut l'index où sont stockés les joueurs.

  if(launch === true) {
    joinstart.send("Une partie à déjà en cours !"); //envoie une erreur si la partie est déjà en cours.
  }

  if(launch === false && p === false) {//si la partie n'est pas en cours.
  joinstart.send('Vous devez être dans la partie afin de pouvoir la lancer.')
}

  if(launch === false && p === true) {//si la partie n'est pas en cours.
    console.log(mod.Players);//affiche dans la consolle tout les joueurs.
    if(mod.Players.length > 10){//si il y a  joueurs ou plus.
      joinstart.send("La partie ne peut démarrer avec plus de 10 joueurs");//envoie un message annoncant le début de la partie avec le nombre de joueurs y participant.
      return;
    }
    if(mod.Players.length >= 3){//si il y a 3 joueurs ou plus.
      joinstart.send('La partie va démarrer avec ' + mod.Players.length + ' joueurs.\nVeuillez vous rendre dans ' +"<#" + popsauce + ">");//envoie un message annoncant le début de la partie avec le nombre de joueurs y participant.
      mod.Admin.push(message.author.id);//on retiens quel joueur a lancé la partie.
      launch = true;//on stock l'état de la partie (lancée) dans une variable.

      rdm = Math.floor(Math.random() * Math.floor(3));

      switch(rdm){
        case 0:
          image = Math.floor(Math.random() * Math.floor(list.cquotes.length));//on choisi une image au hasard.
          console.log([list.cqrep[image]]);
          mod.rep = list.cqrep
          mod.q = list.cquotes
          qembed();
          break;
        case 1:
          image = Math.floor(Math.random() * Math.floor(list.imgname.length));//on choisi une image au hasard.
          console.log([list.rep[image]]);
          mod.rep = list.rep
          picembed()
          break;
        case 2:
          image = Math.floor(Math.random() * Math.floor(list.quotes.length));//on choisi une image au hasard.
          console.log([list.qrep[image]]);
          mod.rep = list.qrep
          mod.q = list.quotes
          qembed();
          break;
        }
        
              function picembed(){
                const img = new Discord.MessageAttachment('images/'+list.imgname[image]+'.png');
                const pic = new Discord.MessageEmbed()
                .setColor(3366179)
                .attachFiles(img)
                .setImage('attachment://'+list.imgname[image]+'.png')
                .setAuthor("D'où viens cette image", null, null)
                popsauce.send(pic);
              }
              
              function qembed(){
                const quote = new Discord.MessageEmbed()
                .setColor(3366179)
                .setAuthor("D'où viens cette citation", null, null)
                .setDescription("```" + [mod.q[image]] + "```")
                popsauce.send(quote);
              }



    }else {//si il y a moins de 3 joueurs.
      joinstart.send("Pas assez de joueurs pour démarrer la partie");//affiche un message d'erreur.
    }
  }
};

module.exports.help = {
  name: "start",
  description: "Lance une partie de popsauce",
  args: false,
  admin: false,
  delete: false
};
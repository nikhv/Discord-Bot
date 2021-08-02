require('dotenv').config();


// console.log(process.env.DISCORDJS_BOT_TOKEN);

const { Client,WebhookClient }=require('discord.js');
const client=new Client({
  partials:['MESSAGE','REACTION']
}); //reference of client class
const PREFIX="$";

const webhookClient=new WebhookClient(
  process.env.WEBHOOK_ID,
  process.env.WEBHOOK_TOKEN,

);

// client has bunch of methods
client.on('ready',()=>{
   console.log(`${client.user.tag} has logged in.`);
});

// client.on('message',(message)=>{  //message object has several features
//   if(message.author.bot) return ; 
//   console.log(`${message.author.tag} has typed message`);
//   if(message.content==='hello'){
//     // message.reply('hello there!');// it tags the user
//     message.channel.send('hello'); // its creates loop because it doesnot ignore bot message and therefore infinite loop
//   }
// });

//learnt about commands
/*
client.on('message',(message)=>{
  if(message.author.bot) return ;
  if(message.content.startsWith(PREFIX)){
    const [CMD_NAME, ...args]=message.content.trim().substring(PREFIX.length).split(/\s+/); // it returns array and spreader operator(...) it contains rest terms, regular expression will remove all the space instead of using only space in spliy
    console.log(CMD_NAME);
    console.log(args);
  }
})
*/

//learning about the kick command and ban commmand
/*
client.on('message',(message)=>{
  if(message.author.bot) return ;
  if(message.content.startsWith(PREFIX)){
    const [CMD_NAME, ...args]=message.content.trim().substring(PREFIX.length).split(/\s+/); // it returns array and spreader operator(...) it contains rest terms, regular expression will remove all the space instead of using only space in spliy
    if(CMD_NAME==='kick'){
      message.channel.send(`kicked the user ${message.author.tag}`);
    }else if(CMD_NAME==='ban'){
      message.channel.send(`banned the user ${message.author.tag}`);
    }
  }
})
*/

// creating kick command 
client.on('message',async (message)=>{
  if(message.author.bot) return ;
  if(message.content.startsWith(PREFIX)){
    const [CMD_NAME, ...args]=message.content.trim().substring(PREFIX.length).split(/\s+/); // it returns array and spreader operator(...) it contains rest terms, regular expression will remove all the space instead of using only space in spliy
    if(CMD_NAME==='kick'){
      if(!message.member.hasPermission('KICK_MEMBERS')) return message.reply('you dont have permissions');
      if(args.length===0) return message.reply('please provide an ID');
      const member=message.guild.members.cache.get(args[0]);
      if(member){
          member.kick()
          .then((member)=>message.channel.send(`${member} was kicked`))
          .catch((err)=>message.channel.send(`I cannot that user:(`));  // .kick returns promise
      }else{
        message.channel.send('member not found');
      }
    }else if(CMD_NAME==='ban'){
      if(!message.member.hasPermission('BAN_MEMBERS')) return message.reply('you dont have permissions');
      if(args.length===0) return message.reply("please provide an ID");
      
      try{
       const user= await message.guild.members.ban(args[0]);
       console.log(user); 
      }catch(err){
       console.log(err);
       message.channel.send('an error occured');
      }
    }else if(CMD_NAME==='announce'){
        const msg=args.join(' ');
        webhookClient.send(msg);
    }
  }
})

client.on('messageReactionAdd',(reaction,user)=>{
  
  const {name}=reaction.emoji; 
  const member=reaction.message.guild.members.cache.get(user.id);
  if(reaction.message.id==='871590429840265218'){
   switch(name){
     case '🍎':
       member.roles.add('871592783520071750');
       break;
     case '🍇':
       member.roles.add('871592887287160902');
       break;
     case '🥭':
       //python
       member.roles.add('871592935957868605');
       break;
     case '🍑': 
       member.roles.add('871592933223170049');
       break;
   }
  }

});


client.on('messageReactionRemove',(reaction,user)=>{
  
  const {name}=reaction.emoji; 
  const member=reaction.message.guild.members.cache.get(user.id);
  if(reaction.message.id==='871590429840265218'){
   switch(name){
     case '🍎':
       member.roles.remove('871592783520071750');
       break;
     case '🍇':
       member.roles.remove('871592887287160902');
       break;
     case '🥭':
       //python
       member.roles.remove('871592935957868605');
       break;
     case '🍑': 
       member.roles.remove('871592933223170049');
       break;
   }
  }

});

client.login(process.env.DISCORDJS_BOT_TOKEN);

//commands start with prefix 
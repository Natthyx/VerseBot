const { Telegraf } = require('telegraf')
const dotenv = require('dotenv').config()
const bot = new Telegraf(
    process.env.BOT_TOKEN,
)

bot.start((ctx)=>{
    ctx.reply('Welcome to verse & Prose Haven! Please Send your poetry\
    and short stories through this bot.')
});

bot.on('text',(ctx)=>{
    const message = ctx.message.text;
//content moderation logic
    // const isContentApproved = contentModerationLogic(message);
    if (message){
//Generate a unique ID for future reference and editing
const messageId = generateUniqueID();
//Store the message in database with its id
// storeMessageInDB({id: messageId, text: message})
//send the message to the user with option for editing and deleting
ctx.reply(`Your message has been approved. Message ID: ${messageId}`,
{
    reply_markup:{
        inline_keyboard:[
            [{text:'Edit', callback_data:`edit ${messageId}`},
            {text:'Delete',callback_data:`delete ${messageId}`}]
        ]
}})}
// ctx.telegram.sendMessage('@VerseProseHaven',message)
else{
    ctx.reply("Thank You for your submission. Your Content is currently under review.")
}}
);

bot.action(/^edit_(.*)/, (ctx)=>{
// Extract the Message Id from the callback data
    const messageId = ctx.match[1];
// Prompt the user for new message
    ctx.reply(`Please enter the new message for ID ${messageId}`);
// Listen for the user's response 
    bot.on("text",(ctx)=>{
        const newMessage = ctx.message.text;
// Update the stored message with the new content
        updateMessage(messageId,newMessage);
//Inform the user that the message has been updated
        ctx.reply(`Message with ID ${messageId} has been updated`);
    })
})
bot.action(/^delete_(.*)/, (ctx)=>{
// Extract the Message Id from the callback data
    const messageId = ctx.match[1];
//Delete the message
    deleteMessage(messageId);
//Inform the user that the message has been updated
ctx.reply(`Message with ID ${messageId} has been deleted`);
});

function deleteMessage(messageId){
    //Implement this function to delete the message from the database
}

function generateUniqueID(){
    return Math.random().toString(36).substring(2)
}
bot.launch();
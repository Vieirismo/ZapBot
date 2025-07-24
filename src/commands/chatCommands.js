const { MY_NUMBER } = require('../config');

async function handleChatCommand(message) {
    const chat = await message.getChat();
    if (chat.isGroup) {
        message.reply(`ID do grupo atual: ${chat.id._serialized}`);
    } else {
        message.reply(`ID do chat atual: ${chat.id._serialized}`);
    }
}

async function handleChatsCommand(message, senderId) {
    if (senderId !== MY_NUMBER) {
        message.reply("Você não tem permissão para usar este comando.");
        return;
    }

    const chats = await message.client.getChats();
    const groupChats = chats.filter(chat => chat.isGroup);

    if (groupChats.length === 0) {
        message.reply("Não encontrei nenhum grupo.");
        return;
    }

    let resMsg = "Lista de Grupos:\n\n";
    groupChats.forEach((group, index) => {
        resMsg += `--- Grupo ${index + 1} ---\n`;
        resMsg += `Nome: ${group.name}\n`;
        resMsg += `ID: ${group.id._serialized}\n`;
        resMsg += `-------------------\n\n`;
    });
    message.reply(resMsg);
}

module.exports = {
    handleChatCommand,
    handleChatsCommand,
};
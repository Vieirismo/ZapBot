
const { MessageMedia } = require('whatsapp-web.js');
const { IMAGE_PATHS } = require('../config'); 

async function handleDenilsonCommand(message) {
    const imagePath = IMAGE_PATHS.DENILSON; 
    try {
        const media = await MessageMedia.fromFilePath(imagePath);
        
        await message.client.sendMessage(message.from, media, { 
            caption: 'RESENHA!', 
            quotedMessageId: message.id._serialized 
        });
        console.log('Imagem enviada como reply com sucesso!');
    } catch (imageError) {
        console.error('Caminho: ', imagePath);
        console.error('Erro ao enviar a imagem: ', imageError);
        message.reply('Não consegui enviar a imagem. Verifique se o caminho está correto e o arquivo existe.');
    }
}

module.exports = {
    handleDenilsonCommand,
};
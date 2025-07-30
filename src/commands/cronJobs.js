const { MessageMedia } = require('whatsapp-web.js');
const { GROUPS_TO_SEND, PERIODIC_MESSAGE_INTERVAL_MS, IMAGE_PATHS } = require('../config');

let timerEnvioPeriodico;

async function sendPeriodicMessages(client) {
    const imagePath = IMAGE_PATHS.RIJKAARD; 
    const msg = `> Título\n\n` +
                `Mensagem`;

    console.log(`Iniciando rodada de envio periódico para ${GROUPS_TO_SEND} grupos...`);

    for (const groupId of GROUPS_TO_SEND) {
        try {
            const media = await MessageMedia.fromFilePath(imagePath);
            await client.sendMessage(groupId, media, { caption: msg});
            console.log(`Mensagem periódica (imagem + texto) enviada para: ${groupId}`);
        } catch (error) {
            console.error(`Erro ao enviar mensagem periódica para ${groupId}:`, error);
        }
    }
    console.log('Rodada de envio periódico concluída.');
}

function startPeriodicJobs(client) {
    sendPeriodicMessages(client); 

    timerEnvioPeriodico = setInterval(() => sendPeriodicMessages(client), PERIODIC_MESSAGE_INTERVAL_MS);
}

function stopPeriodicJobs() {
    if (timerEnvioPeriodico) {
        clearInterval(timerEnvioPeriodico);
        console.log('Envios periódicos parados.');
    }
}

module.exports = {
    startPeriodicJobs,
    stopPeriodicJobs,
};
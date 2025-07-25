const { MessageMedia } = require('whatsapp-web.js');
const { GROUPS_TO_SEND, PERIODIC_MESSAGE_INTERVAL_MS, IMAGE_PATHS } = require('../config');

let timerEnvioPeriodico;

async function sendPeriodicMessages(client) {
    const imagePath = IMAGE_PATHS.CONTABLITZ; 
    const contaMsg = `>MAIS DE 400 JOGADORES\n\n` +
                     `*VÁRIOS POTW, TIME DO BRASILEIRÃO, ÍMPETOS, ETC. JOGUE QUALQUER DESAFIO COM JOGADORES ESPECIAIS!*\n\n` +
                     `*MESSI BLITZ E 2009*.\n\n` +
                     `*63 GIROS NA BOX DO PELÉ*\n\n` +
                     `*ATUALMENTE NA PRIMEIRA DIVISÃO*\n\n` +
                     `*VENDO (R$220) OU TROCO COM VOLTA, VÍDEO NO PV.*`;

    const VillaMsg = `> MENSAGEM AUTOMÁTICA\n\n` +
                     `CONTRATO SELECIONADO AINDA NÃO UTILIZADO, PODE PEGAR QUALQUER UM DA BOX\n\n` +
                     `*R$25 OU TROCO, INTERESSE EM CONTAS PROMISSORAS OU COM BIG TIMES ANTIGOS*`;

    const imagePathVilla = IMAGE_PATHS.CONTAVILLA;
    
    console.log(`Iniciando rodada de envio periódico para ${GROUPS_TO_SEND} grupos...`);

    for (const groupId of GROUPS_TO_SEND) {
        try {
            const media = await MessageMedia.fromFilePath(imagePathVilla);
            await client.sendMessage(groupId, media, { caption: VillaMsg });
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
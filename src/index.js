const { Client, LocalAuth, MessageMedia } = require('whatsapp-web.js');

const qrcode = require('qrcode-terminal');

const path = require('path');
const { group } = require('console');

const sessionPath = path.resolve(__dirname, './.wwebjs_auth');
console.log('Caminho da sessão esperado:', sessionPath);

const client = new Client({
      authStrategy: new LocalAuth({
        dataPath: sessionPath 
    }),
    puppeteer:{
        headless: false,
        args:[
            '--no-sandbox',
            '--disable-setuid-sandbox'
        ],
    },
    dataPath: sessionPath
});

client.on('authenticated', () =>{
    console.log('autenticado')
});

client.on('auth_failure',  (msg) =>{
    console.log('autenticação falhou: ', msg)
});

client.on('disconnected', () =>{
    console.log('desconectado')
});


client.on('ready', () => {
 console.log('Client is ready!');

});

client.on('qr', qr => {

qrcode.generate(qr, {small: true});

});

client.initialize();

const meuNumero = '5519998566459@c.us'

client.on ('message_create', async message => { 
    try {
        if (message.body.toLowerCase() === '!chat'){
            const chat = await message.getChat();
            if(chat.isGroup){
                message.reply(`ID do grupo atual: ${chat.id._serialized}`);
            } else {
                message.reply(`ID do chat atual: ${chat.id._serialized}`);
            }
        }
        else if (message.body.toLowerCase() === '!chats' && message.from === meuNumero){
            const chats = await client.getChats();
            const groupChats = chats.filter(chat => chat.isGroup);

            if (groupChats.length === 0) {
                message.reply("Não encontrei nenhum grupo.");
                return;
            }

            let responseMessage = "Lista de Grupos:\n\n";
            groupChats.forEach((group, index) => {
                responseMessage += `--- Grupo ${index + 1} ---\n`;
                responseMessage += `Nome: ${group.name}\n`;
                responseMessage += `ID: ${group.id._serialized}\n`;
                responseMessage += `-------------------\n\n`;
            });

            message.reply(responseMessage);
        }
        
     
        else if (message.body.toLowerCase() === "!teste") {
            message.reply("Funcionando!");
        }
        else if(message.body.toLowerCase() === "!denilson"){
            const imagePath = path.resolve(__dirname, '..', 'img', 'denilson.jpg'); 
            try {
                const media = await MessageMedia.fromFilePath(imagePath);
                
                  await client.sendMessage(message.from, media, { 
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
        else if (message.body.startsWith('!')) {
           message.reply("Comando Desconhecido, tente: !chat ou !teste");
        }
        
    } catch (e) {
        console.error(`Erro ao processar comando e enviar resposta:`, e);
        message.reply(`Ocorreu um erro ao processar seu comando. Erro: ${e.message || e}`);
    }
});

const gruposEnvio = [
    "120363375766274850@g.us",
    "553491273708-1570739834@g.us",
    "120363406301035687@g.us",
    "120363388361786869@g.us",
    "120363402267785800@g.us"
];

const intervaloMsg = 120000;

let timerEnvioPeriodico; 

/*client.on('ready', async () => {
    console.log('Client is ready!');
    console.log('Bot pronto para enviar mensagens periódicas.');


    timerEnvioPeriodico = setInterval(async () => {
        const imagePath = path.resolve(__dirname, '..', 'img', 'contaBlitz.jpg'); 
        const contaMsg = `> MAIS DE 400 JOGADORES\n\n` +
                         `VÁRIOS POTW, TIME DO BRASILEIRÃO, ÍMPETOS, ETC.\n\n` +
                         `MESSI BLITZ E 2009.\n\n` +
                         `63 GIROS NA BOX DO PELÉ\n\n` +
                         `ATUALMENTE NA PRIMEIRA DIVISÃO\n\n` +
                         `VENDO (R$200) OU TROCO COM VOLTA, VÍDEO NO PV.`;

        console.log(`Iniciando rodada de envio periódico para ${gruposEnvio.length} grupos...`);

        for (const groupId of gruposEnvio) {
            try {
                const media = await MessageMedia.fromFilePath(imagePath);
                
                await client.sendMessage(groupId, media, { 
                    caption: contaMsg
                });
                console.log(`Mensagem periódica (imagem + texto) enviada para: ${groupId}`);
            } catch (error) {
                console.error(`Erro ao enviar mensagem periódica para ${groupId}:`, error);
            }
        }
        console.log('Rodada de envio periódico concluída.');
    }, intervaloMsg);
});*/
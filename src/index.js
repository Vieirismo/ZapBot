const { Client, LocalAuth  } = require('whatsapp-web.js');

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

client.on ('message_create', async message => { 
    try {
        if (message.body === '!chat'){
            const chat = await message.getChat();
            if(chat.isGroup){
                // Usando message.reply()
                message.reply(`ID do grupo atual: ${chat.id._serialized}`);
            } else {
                // Usando message.reply()
                message.reply(`ID do chat atual: ${chat.id._serialized}`);
            }
        }
        else if (message.body === '!chats'){
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
                responseMessage += `Participantes: ${group.participants.length}\n`;
                responseMessage += `-------------------\n\n`;
            });

            message.reply(responseMessage);
        }
     
        else if (message.body === "!teste") {
            message.reply("Funcionando!");
        }
        else if (message.body.startsWith('!')) {
            message.reply("Comando desconhecido. Tente !chat, !chats, !teste ou !eco.");
        }
    } catch (e) {
        console.error(`Erro ao processar comando e enviar resposta:`, e);
        message.reply(`Ocorreu um erro ao processar seu comando. Erro: ${e.message || e}`);
    }
});
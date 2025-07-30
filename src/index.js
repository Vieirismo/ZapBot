
const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const path = require('path');

const { SESSION_PATH, MY_NUMBER } = require('./config');

const chatCommands = require('./commands/chatCommands.js');
const mediaCommands = require('./commands/mediaCommands.js');
const miscCommands = require('./commands/miscCommands.js');


const { startPeriodicJobs } = require('./commands/cronJobs.js');

console.log('Caminho da sessão esperado:', SESSION_PATH);

const client = new Client({
    authStrategy: new LocalAuth({
        dataPath: SESSION_PATH 
    }),
    puppeteer:{
        headless: false, // true for hide chromium
        args:[
            '--no-sandbox',
            '--disable-setuid-sandbox',
            '--disable-gpu', 
            '--disable-dev-shm-usage',
            '--no-zygote'
        ],
    },
});

client.on('authenticated', () => {
    console.log('Autenticado');
});

client.on('auth_failure', (msg) => {
    console.error('Autenticação falhou: ', msg);
});

client.on('disconnected', (reason) => {
    console.log('Desconectado');
});

client.on('qr', qr => {
    qrcode.generate(qr, {small: true});
});

client.initialize();

client.on('ready', async () => {
    console.log('Client is ready!');
    //startPeriodicJobs(client); 
});

client.on('message_create', async message => { 
    const senderId = message.author || message.from; 
    const command = message.body.toLowerCase().split(' ')[0];

    try {
        switch (command) {
            case '!chat':
                await chatCommands.handleChatCommand(message);
                break;
            case '!chats':
                await chatCommands.handleChatsCommand(message, senderId);
                break;
            case '!teste':
                await miscCommands.handleTesteCommand(message);
                break;
            case '!imagem':
                await mediaCommands.handleImageCommand(message);
                break;
            default:
                if (message.body.startsWith('!')) { 
                    message.reply("Comando Desconhecido. Tente: !chat, !teste ou !imagem");
                }
                break;
        }
    } catch (e) {
        console.error(`Erro ao processar comando e enviar resposta:`, e);
        message.reply(`Ocorreu um erro ao processar seu comando. Erro: ${e.message || e}`);
    }
});
const { Client, LocalAuth  } = require('whatsapp-web.js');

const qrcode = require('qrcode-terminal');

const path = require('path');

const sessionPath = path.resolve(__dirname, './.wwebjs_auth');
console.log('Caminho da sessão esperado:', sessionPath);

const client = new Client({
      authStrategy: new LocalAuth({
        dataPath: sessionPath 
    }),
    puppeteer:{
        headless: true,
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


client.on ('message_create', message =>{

    if(message.body == "!teste"){
        client.sendMessage(message.from, "funcionando")

};
})
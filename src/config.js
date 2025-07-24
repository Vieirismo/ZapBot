const path = require('path');

const SESSION_PATH = path.resolve(__dirname, '..', '.wwebjs_auth'); 

const MY_NUMBER = '5519998566459@c.us';
const GROUPS_TO_SEND = [
    "120363375766274850@g.us",
    "553491273708-1570739834@g.us",
    "120363406301035687@g.us",
    "120363388361786869@g.us",
    "120363402267785800@g.us"
];

const PERIODIC_MESSAGE_INTERVAL_MS = 600000; // 10 minutos

const IMAGE_PATHS = {
    DENILSON: path.resolve(__dirname, '..', 'img', 'denilson.jpg'),
    CONTABLITZ: path.resolve(__dirname, '..', 'img', 'contaBlitz.jpg'),
};

module.exports = {
    SESSION_PATH,
    MY_NUMBER,
    GROUPS_TO_SEND,
    PERIODIC_MESSAGE_INTERVAL_MS,
    IMAGE_PATHS,
};
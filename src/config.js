const path = require('path');

const SESSION_PATH = path.resolve(__dirname, '..', '.wwebjs_auth'); 

const MY_NUMBER = '5519998566459@c.us'; // Replace with your contact ID
const GROUPS_TO_SEND = [
    "920363375766274850@g.us", // Example ID
];

const PERIODIC_MESSAGE_INTERVAL_MS = 120000; // 2 minutes

const IMAGE_PATHS = {
    DENILSON: path.resolve(__dirname, '..', 'img', 'denilson.jpg'), // Example image
};

module.exports = {
    SESSION_PATH,
    MY_NUMBER,
    GROUPS_TO_SEND,
    PERIODIC_MESSAGE_INTERVAL_MS,
    IMAGE_PATHS,
};
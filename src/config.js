const path = require('path');

const SESSION_PATH = path.resolve(__dirname, '..', '.wwebjs_auth'); 

const MY_NUMBER = '5519998566459@c.us'; // substitute for your number
const GROUPS_TO_SEND = [
    "920363375766274850@g.us", // example code
];

const PERIODIC_MESSAGE_INTERVAL_MS = 300000; // milliseconds

const IMAGE_PATHS = {
    DENILSON: path.resolve(__dirname, '..', 'img', 'denilson.jpg'), // examples
    RIJKAARD: path.resolve(__dirname, '..', 'img', 'rijkaard.jpg')
};

module.exports = {
    SESSION_PATH,
    MY_NUMBER,
    GROUPS_TO_SEND,
    PERIODIC_MESSAGE_INTERVAL_MS,
    IMAGE_PATHS,
};
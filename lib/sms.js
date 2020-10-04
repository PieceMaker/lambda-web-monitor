const { accountSid, authToken, fromNumber, toNumber } = require('../config');
const twilio = require('twilio');

const urlToBody = function(url) {
    return `Status check returned true at ${url}.`;
}
const toMessage = function(body) {
    return {
        body,
        from: fromNumber,
        to: toNumber
    };
}

module.exports = function(url) {
    const client = new twilio(accountSid, authToken);
    const body = urlToBody(url);
    const message = toMessage(body);

    return client.messages.create(message)
        .catch(error => console.error(error));
}
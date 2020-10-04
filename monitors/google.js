const Monitor = require('../lib/Monitor');

const url = 'https://www.google.com';
const queryFunction = function($) {
    return $('#hplogo')
        .attr('alt');
}
const checkStatus = function(actualStatus) {
    return actualStatus !== 'Google'; // Don't send text message
    // return actualStatus === 'Google'; // Send text message
}
const monitorConfig = {
    url,
    queryFunction,
    checkStatus
};
const googleMonitor = new Monitor(monitorConfig);

exports.lambdaHandler = (event, context) => {
    return googleMonitor.check();
}
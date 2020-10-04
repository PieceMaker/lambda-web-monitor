const axios = require('axios');
const cheerio = require('cheerio');
const sms = require('./sms');

class Monitor {
    constructor({url, queryFunction, checkStatus}) {
        this._url = url;
        this._queryFunction = queryFunction;
        this._checkStatus = checkStatus;
    }

    check() {
        return axios.get(this._url)
            .then(async (response) => {
                if(response.status === 200) {
                    const html = response.data;
                    const $ = cheerio.load(html);

                    const actualStatus = this._queryFunction($);
                    if(this._checkStatus(actualStatus)) {
                        await sms(this._url);
                    }
                    return actualStatus;
                }
            })
            .catch(error => console.error(error));
    }
}

module.exports = Monitor;
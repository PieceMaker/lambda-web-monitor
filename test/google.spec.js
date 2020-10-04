const google = require('../monitors/google');
const { expect } = require('chai');

describe('Sample Google monitor', function() {
    it('returns the alt attribute of the Google logo', async function() {
        const result = await google.lambdaHandler();
        expect(result).to.equal('Google');
    });
});
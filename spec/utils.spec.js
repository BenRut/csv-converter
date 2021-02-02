const { expect } = require("chai");
const { it } = require('mocha');
const {
  formatLine
} = require("../utils");

describe('formatLine', () => {
    it('should return a string when passed a string', () => {
        const output = formatLine("");
        expect(output).to.be.a('string');
    });
    it('should reverse name', () => {
        const input = 'Adams, Stuart <Stuart.Adams@eu.jll.com>'
        const output = formatLine(input);
        expect(output.split(" ")[0]).to.equal('Stuart');
        expect(output.split(" ")[1]).to.equal('Adams,');
    });
    it('should format 1 line into two comma separated values', () => {
        const input = 'Adams, Stuart <Stuart.Adams@eu.jll.com>'
        const output = formatLine(input);
        expect(output).to.equal('Stuart Adams, Stuart.Adams@eu.jll.com');
    });
});


const { expect } = require("chai");
const { it } = require('mocha');
const {
  formatLine,
  convertSemicolonToNewLine,
  formatData,
  exportDataToCsv
} = require("../utils");

describe.only('formatLine', () => {
    it('should return a string when passed a string', () => {
        const output = formatLine("");
        expect(output).to.be.a('string');
    });
    it('should reverse name', () => {
        const input = 'Adams, Stuart <Stuart.Adams@eu.jll.com>'
        const output = formatLine(input);
        expect(output.split(",")[0].split(" ")[0]).to.equal('Stuart');
        expect(output.split(",")[0].split(" ")[1]).to.equal('Adams');
    });
    it('should format 1 line into two comma separated values', () => {
        const input = 'Adams, Stuart <Stuart.Adams@eu.jll.com>'
        const output = formatLine(input);
        expect(output).to.equal('Stuart Adams,Stuart.Adams@eu.jll.com');
    });
    it('should format lines containing maiden names', () => {
        const input = 'Harker (née Murray), Mina <Mina.Harker@eu.jll.com>'
        const output = formatLine(input);
        expect(output).to.equal('Mina Harker (née Murray),Mina.Harker@eu.jll.com');
    });
    it('should format lines containing any number of first or second names', () => {
        const input1 = 'Borges, Jorge Luis <Jorge.Borges@eu.jll.com>';
        const output1 = formatLine(input1);
        expect(output1).to.equal('Jorge Luis Borges,Jorge.Borges@eu.jll.com');
        const input2 = 'García Lopez, Jose <Jose.GarcíaLopez@bewonder.co.uk>';
        const output2 = formatLine(input2);
        expect(output2).to.equal('Jose García Lopez,Jose.GarcíaLopez@bewonder.co.uk');
    });
});

describe('convertSemicolonToNewLine', () => {
    it('should return a string', () => {
        const output = convertSemicolonToNewLine("");
        expect(output).to.be.a('string');
    });
    it('should return string on 1 line when passed string with no semicolon', () => {
        const output = convertSemicolonToNewLine("hello");
        expect(output).to.equal("hello");
    });
    it('should return string on 2 lines when passed string with a semicolon', () => {
        const input = "hello;goodbye"
        const output = convertSemicolonToNewLine(input);
        expect(output).to.equal("hello\ngoodbye");
    });
});

describe('formatData', () => {
    it('should return one formatted contact on one line', () => {
        const input = 'Adams, Stuart <Stuart.Adams@eu.jll.com>'
        const output = formatData(input);
        expect(output.split("\n")[1]).to.equal('Stuart Adams,Stuart.Adams@eu.jll.com');
    });
    it('should return two formatted contacts on two lines', () => {
        const input = 'Adams, Stuart <Stuart.Adams@eu.jll.com>; Afsar, Zeeshan <Zeeshan.Afsar@eu.jll.com>'
        const output = formatData(input);
        const outputArr = output.split("\n");
        outputArr.shift();
        expect(outputArr.join("\n")).to.equal('Stuart Adams,Stuart.Adams@eu.jll.com\nZeeshan Afsar,Zeeshan.Afsar@eu.jll.com');
    });
    it('should return any mutiple of contacts on an equal number of lines', () => {
        const input = 'Adams, Stuart <Stuart.Adams@eu.jll.com>; Afsar, Zeeshan <Zeeshan.Afsar@eu.jll.com>; Agnew, Jane <Jane.Agnew@eu.jll.com>; Ambrose, Laura <Laura.Ambrose@eu.jll.com>; Anderson, Tamryn <Tamryn.Anderson@eu.jll.com>; Andrew, Rachel <Rachel.Andrew@eu.jll.com>; Arnold, Christine <Christine.Arnold@eu.jll.com>; Asher, Yafeth <Yafeth.Asher@eu.jll.com>'
        const output = formatData(input);
        const outputArr = output.split("\n");
        outputArr.shift();
        expect(outputArr.join("\n")).to.equal('Stuart Adams,Stuart.Adams@eu.jll.com\nZeeshan Afsar,Zeeshan.Afsar@eu.jll.com\nJane Agnew,Jane.Agnew@eu.jll.com\nLaura Ambrose,Laura.Ambrose@eu.jll.com\nTamryn Anderson,Tamryn.Anderson@eu.jll.com\nRachel Andrew,Rachel.Andrew@eu.jll.com\nChristine Arnold,Christine.Arnold@eu.jll.com\nYafeth Asher,Yafeth.Asher@eu.jll.com');
    });
});



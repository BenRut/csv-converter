const fs = require("fs");

const formatLine = str => {
    if (str === "") return str;
    const emailAddressWithBrackets = str.match(/<.*>/)[0];
    const unformattedName = str.replace(emailAddressWithBrackets, "");
    const dataArray = unformattedName.split(",");
    const unformattedFirstNames = dataArray[1]; 
    const surnames = dataArray[0];
    const firstNamesArr = unformattedFirstNames.split("");
    firstNamesArr.pop();
    firstNamesArr.shift();
    const firstNames = firstNamesArr.join("");
    const fullName = `${firstNames} ${surnames}`;
    const emailAddressArr = emailAddressWithBrackets.split("");
    emailAddressArr.pop();
    emailAddressArr.shift();
    const emailAddress = emailAddressArr.join("");
    return `${fullName},${emailAddress}`;
};

const convertSemicolonToNewLine = str => {
    const arr = str.split("");
    const filteredArr = arr.map((char)=>{
        if (char === ";") {
            return "\n"
        } else return char
    })
    return filteredArr.join("");
};

const formatData = str => {
    const contacts = str.split(";")
    const formattedLines = contacts.map((contact)=> {
        if (contact[0] === " "){
             const charArr = contact.split("");
             charArr.shift();
             return formatLine(charArr.join(""));
        } else {
            return formatLine(contact);
        }
    })
    const result = "Name, Email Address\n" + formattedLines.join("\n");
    return result;
};

const exportDataToCsv = (fileName, data) => {
    fs.writeFile(`${fileName}.csv`, formatData(data), (err) => {
        if (err) throw err;
        console.log('CSV saved!');
    });
}

module.exports = {
    formatLine,
    convertSemicolonToNewLine,
    formatData,
    exportDataToCsv
}
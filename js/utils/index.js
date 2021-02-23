const fs = require('fs');

const formatLine = str => {
    const dataArray = str.split(" ");
    const firstName = dataArray[dataArray.length-2]; 
    const surname = dataArray[0];
    const regex = /\(n[eé]e ([^\s]+)\)/g;
    let maidenName;
    let fullName;

    if (regex.test(str)) {
        maidenName = str.match(regex)[0];
        str = str.replace(regex, '');
        fullName = `${firstName} ${surname} ${maidenName},`;
    } else {
        fullName = `${firstName} ${surname}`
    }
  
    const emailAddressWithBrackets = dataArray[dataArray.length-1];
    const emailAddressArr = emailAddressWithBrackets.split("");
    emailAddressArr.pop();
    emailAddressArr.shift();
    const emailAddress = emailAddressArr.join("");
    
    return `${fullName}${emailAddress}`;

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
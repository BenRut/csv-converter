const formatLine = str => {
    const dataArray = str.split(" ");
    const firstName = dataArray[1];
    const surname = dataArray[0];
    const fullName = `${firstName} ${surname}`;
    const emailAddressWithBrackets = dataArray[dataArray.length-1];
    const emailAddressArr = emailAddressWithBrackets.split("");
    emailAddressArr.pop();
    emailAddressArr.shift();
    const emailAddress = emailAddressArr.join("");
    return `${fullName} ${emailAddress}`;

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

const formatsData = str => {
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
    const result = formattedLines.join("\n");
    console.log(result);
    return result;
};

module.exports = {
    formatLine,
    convertSemicolonToNewLine,
    formatsData
}
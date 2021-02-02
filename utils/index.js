exports.formatLine = string => {
    const dataArray = string.split(" ");
    const firstName = dataArray[1];
    const surname = dataArray[0];
    const fullName = `${firstName} ${surname}`;
    const emailAddressWithBrackets = dataArray[dataArray.length-1];
    const emailAddressArr = emailAddressWithBrackets.split("");
    emailAddressArr.pop();
    emailAddressArr.shift();
    const emailAddress = emailAddressArr.join("");
    return `${fullName} ${emailAddress}`;

}
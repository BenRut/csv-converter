const names = [['Donald Duck', 'Homer Simpson', 'Jerry Mouse', 'Bugs Bunny', 'Fred Flintstone', 'Spongebob Squarepants', 'Charlie Brown', 'Scoobie Doo', 'Stewie Griffin', 'Rick Sanchez'], ['Duke Ellington', 'Miles Davis', 'John Coltrane', 'Charles Mingus', 'Ornette Coleman', 'Nina Simone', 'Louis Armstrong', 'Herbie Hancock', 'George Benson', 'Ella Fitzgerald'], ['George Orwell', 'Aldous Huxley', 'Mary Shelley', 'J.G. Ballard', 'William Gibson', 'Jules Verne', 'H.G. Wells', ], ['Marie Curie', 'Rosalind Franklin', 'Lise Meitner', 'Ada Lovelace', 'Rachel Carson', 'Dorothy Hodgkin', 'Mar Anning', 'Chien-Shiung Wu']];

const getRandomInt = (max) => {
    return Math.floor(Math.random() * Math.floor(max));
  }

const returnPlacehoder = () => {
    const randomIndex = getRandomInt(names.length);
    let str = 'UPLOAD DISTRIBUTION LIST IN THE FOLLOWING FORMAT:\n\n'
    let delimiter = ';'
    for (let i = 0; i< names[randomIndex].length; i++) {
        if (i === names[randomIndex].length-1) delimiter = '';
        str += `${names[randomIndex][i].split(' ')[1]}, ${names[randomIndex][i].split(' ')[0]} <${names[randomIndex][i].split(' ')[0]}.${names[randomIndex][i].split(' ')[1]}@outlook.co.uk>${delimiter} `
    }
    return str;
}
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

const validateString = (str) => {
    const regex = /((?:([^\s]+), ([^\s]+)(?:( [^\s]+)*)?(?:( [^\s]+)*)? <([^\s]+)>; )?)+([^\s]+)(?:( [^\s]+)*)?, ([^\s]+)(?:( [^\s]+)*)? <([^\s]+)>/;
    return regex.test(str);
}

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

document.getElementById("convert").addEventListener("click", (event) => {
    event.preventDefault();

    const string = document.getElementById("distribution-list").value;
    const title = document.getElementById("title").value;

    if (validateString(string)) {
        const formattedData = formatData(string);
        const blob = new Blob([formattedData], { type: 'csv' });
	    const url = URL.createObjectURL(blob);
	    const link = document.createElement('a');
	    link.download = `${title}.csv`;
	    link.href = url;
	    link.click();
    } else {
        console.log("invalid format");
    }
  });

  document.getElementById("distribution-list").placeholder = returnPlacehoder();
'use strict';

const fs = require('fs');

let fileLocation, // File location
    targetProp, // JSON property to replace
    targetValue; // new Value

// Use process.argv instead of default
const args = process.argv;
if (args[2]) {
    fileLocation = args[2];
} else {find
    console.log("Usage: 'node " + scriptName + " file.json property \"new value\"'. The file location is missing.");
    process.exit(-1);
}
/*if (args[3]) {
    targetProp = args[3];
} else {
    console.log("Usage: 'node " + scriptName + " file.json property \"new value\"'. The target JSON property is missing.");
    process.exit(-1);
}
if (args[4]) {
    targetValue = args[4];
} else {
    console.log("Usage: 'node " + scriptName + " file.json property \"new value\"'. The new value is missing.");
    process.exit(-1);
}*/

/* Define function for escaping user input to be treated as
   a literal string within a regular expression */
function escapeRegExp(string){
    return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

/* Define function to find and replace specified term with replacement string */
function replaceAll(str, term, replacement) {
    return str.replace(new RegExp(escapeRegExp(term), 'g'), replacement);
}

fs.readFile(fileLocation, (err, rawData) => {
    if (err) throw err;
    let jsonData = JSON.parse(rawData);
    let dataString = JSON.stringify(jsonData, null, 2);

    const newStr = replaceAll(dataString, '::', ':-:')

    fs.writeFile(fileLocation, newStr, (err) => {
        if (err) {
            console.log('Could not write to file', err);
        }
        console.log('\x1b[32m%s\x1b[0m', 'Character replaced, collection written to ' + fileLocation);
    });
});
